import { RedisService } from '../../redis/service';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(private readonly redisService: RedisService) {
    this.openai = new OpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY,
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });
  }

  async sendMsg(content: string): Promise<string> {
    // 以redis来做中转，最大长度限定为20个来回问答
    const list = (await this.redisService.lrange('chat')) || [];

    const messages: OpenAI.ChatCompletionMessageParam[] = list.map(
      (item: string) => {
        return JSON.parse(item) as OpenAI.ChatCompletionMessageParam;
      },
    );

    messages.push({ role: 'user', content });

    const res: any = await this.openai.chat.completions.create({
      model: 'qwen-plus',
      messages,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const answer: string = res.choices[0].message.content;

    // 在这里做一个存储
    await this.redisService.rpush(
      'chat',
      JSON.stringify({ role: 'user', content }),
      JSON.stringify({ role: 'assistant', content: answer }),
    );
    await this.redisService.ltrim('chat', -20, -1);

    return answer;
  }
}
