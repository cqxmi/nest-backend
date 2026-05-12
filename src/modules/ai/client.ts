import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AiResponse } from './ai.dto';

@Injectable()
export class AiClient {
  async sendMessage(data: any) {
    const res: AxiosResponse<AiResponse> = await axios.post(
      `${process.env.AI_BASE_URL}/chat/send`,
      data,
    );

    return res.data;
  }
  async getHistory(params: any) {
    const res: AxiosResponse<AiResponse> = await axios.get(
      `${process.env.AI_BASE_URL}/chat/getHistory`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      { params },
    );
    return res.data;
  }
}
