import type { ChatCompletionTool } from 'openai/resources/chat/completions';

export const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'send_mail',
      description: '需要发邮件时很管用',
      parameters: {
        type: 'object',
        properties: {
          html: {
            type: 'string',
            description: '需要发送的消息',
          },
        },
        required: ['html'],
      },
    },
  },
];
