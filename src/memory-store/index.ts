import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

const store = new Map<string, Context>();

const saveNode = new ActionNode('save', async (ctx) => {
  const count = (ctx.data.visits as number | undefined) ?? 0;
  ctx.data.visits = count + 1;
  store.set('counter', ctx);
  return { type: 'success', output: `Visit #${ctx.data.visits}` };
});

const flow = new Flow('memory-flow').addNode(saveNode).setStartNode('save');

async function run() {
  const context =
    store.get('counter') ||
    ({ conversationHistory: [], data: {}, metadata: {} } as Context);
  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
}

run().catch(console.error);
