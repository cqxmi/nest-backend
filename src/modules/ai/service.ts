/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class AiService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
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
  }

  async invoke(text: string) {
    const result = await this.model.invoke(text);
    return result.content;
  }

  async stream(text: string) {
    return this.model.stream(text);
  }

  async batch(texts: string) {
    const inputs = texts.split(',');

    const result = await this.model.batch(inputs);

    return {
      inputs,
      outputs: result.map((message) => message.content),
    };
  }
}
