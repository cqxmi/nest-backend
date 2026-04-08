import { createMiddleware, ToolMessage } from 'langchain';

// 错误处理
export const handleToolErrors = createMiddleware({
  name: 'HandleToolErrors',
  wrapToolCall: async (request, handler) => {
    try {
      return await handler(request);
    } catch (error) {
      return new ToolMessage({
        content: `Tool error: Please check your input and try again. (${error})`,
        tool_call_id: request.toolCall.id!,
      });
    }
  },
});
