/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RedisService } from '../../redis/service';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MailService } from '../email/service';
import { systemPrompt } from 'src/utils/prompt';
import { tools } from 'src/utils/tools';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private toolMap: Record<string, (args: any) => Promise<any>>;

  constructor(
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.API_KEY,
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });
    this.toolMap = {
      send_mail: this.mailService.sendMail.bind(this.mailService),
    };
  }

  async sendMsg(content: string): Promise<string> {
    // 以redis来做中转，最大长度限定为20个来回问答
    const list = (await this.redisService.lrange('chat')) || [];

    // 为空时先初始化定义
    if (!list.length) {
      await this.redisService.lpush(
        'chat',
        JSON.stringify({ role: 'system', content: systemPrompt }),
      );
    }

    const messages: OpenAI.ChatCompletionMessageParam[] = list.map(
      (item: string) => {
        return JSON.parse(item) as OpenAI.ChatCompletionMessageParam;
      },
    );

    messages.push({ role: 'user', content });

    const res: any = await this.openai.chat.completions.create({
      model: 'qwen-plus',
      messages,
      tools: tools,
    });

    if (
      res.choices[0].message.tool_calls &&
      res.choices[0].message.tool_calls.length
    ) {
      return this.toolCallBack(res.choices[0].message.tool_calls, messages);
    }

    // 先做判断，需不需要方法调用
    const answer: string = res.choices[0].message.content;

    // 在这里做一个存储
    await this.redisService.rpush(
      'chat',
      JSON.stringify({ role: 'user', content }),
      JSON.stringify({ role: 'assistant', content: answer }),
    );

    return answer;
  }

  // 工具函数调用
  async toolCallBack(
    toolCalls: OpenAI.ChatCompletionMessageToolCall[],
    messages: OpenAI.ChatCompletionMessageParam[],
  ) {
    const functionCalls = toolCalls.filter(
      (c): c is OpenAI.ChatCompletionMessageFunctionToolCall =>
        c.type === 'function',
    );

    const tasks: Promise<OpenAI.ChatCompletionToolMessageParam>[] =
      functionCalls.map(async (call) => {
        const functionName = call.function.name;
        const args = JSON.parse(call.function.arguments || '{}');

        const func = this.toolMap[functionName];

        if (!func) {
          const msg: OpenAI.ChatCompletionToolMessageParam = {
            role: 'tool',
            content: `Function ${functionName} not found`,
            tool_call_id: call.id,
          };
          return msg;
        }

        try {
          const result = await func(args);

          const msg: OpenAI.ChatCompletionToolMessageParam = {
            role: 'tool',
            content: JSON.stringify(result),
            tool_call_id: call.id,
          };
          return msg;
        } catch (err) {
          const msg: OpenAI.ChatCompletionToolMessageParam = {
            role: 'tool',
            content: `Error: ${err instanceof Error ? err.message : String(err)}`,
            tool_call_id: call.id,
          };
          return msg;
        }
      });

    // 👇 并发执行
    const results = await Promise.all(tasks);

    const assistantToolCallMsg: OpenAI.ChatCompletionAssistantMessageParam = {
      role: 'assistant',
      content: null,
      tool_calls: functionCalls,
    };

    const nextMessages: OpenAI.ChatCompletionMessageParam[] = [
      ...messages,
      assistantToolCallMsg,
      ...results,
    ];

    const finalRes = await this.openai.chat.completions.create({
      model: 'qwen-plus',
      messages: nextMessages,
      tools,
    });

    const answer: string = finalRes.choices[0].message.content ?? '';

    await this.redisService.rpush(
      'chat',
      JSON.stringify({ role: 'assistant', content: answer }),
    );

    return answer;
  }
}
