import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

async function main() {
  const chatNode = new ActionNode('chat', async (ctx) => {
    const input = String(ctx.data.userMessage || '').toLowerCase();
    const reply = input.includes('hi')
      ? 'Hello there!'
      : 'I only respond to greetings.';
    ctx.conversationHistory.push({ role: 'user', content: input });
    ctx.conversationHistory.push({ role: 'assistant', content: reply });
    return { type: 'success', output: reply };
  });

  const flow = new Flow('chatbot').addNode(chatNode).setStartNode('chat');

  const context: Context = {
    conversationHistory: [],
    data: { userMessage: 'hi bot' },
    metadata: {},
  };

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
  console.log('History:', context.conversationHistory);
}

main().catch(console.error);
