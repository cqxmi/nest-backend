/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { chatDto } from './ai.dto';
import { createAgent, ReactAgent } from 'langchain';
import { RedisSaver } from '@langchain/langgraph-checkpoint-redis';

@Injectable()
export class AiService implements OnModuleInit {
  private agent!: ReactAgent;

  async onModuleInit() {
    const model = new ChatOpenAI({
      configuration: {
        baseURL: process.env.CHAT_BASE_URL,
      },
      apiKey: process.env.API_KEY,
      model: process.env.MODE_NAME,
      temperature: 0.7,
      maxTokens: 2048,
      timeout: 60000,
      maxRetries: 3,
    });

    // `RedisSaver.fromUrl(...)` 是异步的，必须等待后才能传给 `createAgent({ checkpointer })`
    const checkpointer = await RedisSaver.fromUrl(
      process.env.REDIS_URL as string,
    );

    this.agent = createAgent({
      model,
      tools: [],
      checkpointer,
    });
  }

  async send(msg: chatDto): Promise<string> {
    const res = await this.agent.invoke(
      { messages: [{ role: 'user', content: msg.msg }] },
      { configurable: { thread_id: msg.company } },
    );

    const messages = res.messages ?? [];
    const lastMessage = messages[messages.length - 1] as {
      content?: string;
    };

    return lastMessage?.content ?? '';
  }
}
