/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { chatDto } from './ai.dto';
import { RedisSaver } from '@langchain/langgraph-checkpoint-redis';
import { systemPrompt } from './prompt';
import tools from './tools';
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  START,
  END,
} from '@langchain/langgraph';
import { ToolMessage } from 'langchain';
import pRetry from 'p-retry';

@Injectable()
export class AiService implements OnModuleInit {
  private graph;

  async onModuleInit() {
    const model = new ChatOpenAI({
      configuration: {
        baseURL: process.env.CHAT_BASE_URL,
      },
      apiKey: process.env.API_KEY,
      model: process.env.MODE_NAME,
      temperature: 0.7,
    });

    const checkpointer = await RedisSaver.fromUrl(
      process.env.REDIS_URL as string,
    );

    const State = new StateSchema({ messages: MessagesValue });

    const modelWithTools = model.bindTools(tools);

    const callModel = async (state) => {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...state.messages,
      ];

      const response = await modelWithTools.invoke(messages);
      return { messages: [response] };
    };

    const callTool = async (state) => {
      const lastMessage = state.messages.at(-1);
      const toolCalls = lastMessage.tool_calls;

      if (!toolCalls?.length) return {};

      const results: any = [];

      for (const call of toolCalls) {
        const tool = tools.find((t) => t.name === call.name);

        if (!tool) {
          results.push(
            new ToolMessage({
              content: `Tool ${call.name} not found`,
              tool_call_id: call.id,
            }),
          );
          continue;
        }

        try {
          // 🔥 重试机制（生产必备）
          const result = await pRetry(
            async () => await tool.invoke(call.args),
            {
              retries: 2,
              minTimeout: 500,
            },
          );

          results.push(
            new ToolMessage({
              content: JSON.stringify(result),
              tool_call_id: call.id,
            }),
          );
        } catch (error) {
          results.push(
            new ToolMessage({
              content: `Tool error: ${error.message}`,
              tool_call_id: call.id,
            }),
          );
        }
      }

      return { messages: results };
    };

    const shouldUseTool = (state) => {
      const lastMessage = state.messages.at(-1);
      return lastMessage.tool_calls?.length ? 'tool' : 'end';
    };

    this.graph = new StateGraph(State)
      .addNode('llm', callModel)
      .addNode('tool', callTool)

      .addEdge(START, 'llm')

      .addConditionalEdges('llm', shouldUseTool, {
        tool: 'tool',
        end: END,
      })

      .addEdge('tool', 'llm')

      .compile({
        checkpointer,
      });
  }

  async send(msg: chatDto): Promise<string> {
    const res = await this.graph.invoke(
      { messages: [{ role: 'user', content: msg.msg }] },
      { configurable: { thread_id: msg.company } },
    );

    const messages = res.messages ?? [];
    const lastMessage = messages[messages.length - 1] as {
      content?: string;
    };

    return lastMessage?.content ?? '';
  }

  async getHistory(thread_id: string): Promise<any[]> {
    const config = { configurable: { thread_id } };
    const state = await this.graph.getState(config);

    // 过滤消息：只要 HumanMessage 和 AIMessage（且有实际内容）
    const messages = state.values.messages.filter((msg: any) => {
      const type = msg._getType();
      return (type === 'human' || type === 'ai') && msg.content;
    });

    // 格式化输出
    return messages.map((msg: any) => {
      return {
        id: msg.id,
        role: msg._getType() === 'human' ? 'user' : 'assistant',
        content: msg.content,
      };
    });
  }
}
