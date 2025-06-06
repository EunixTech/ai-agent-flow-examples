import { Flow, Runner, Context } from 'ai-agent-flow';
import { BatchNode } from 'ai-agent-flow/nodes/batch';

async function main() {
  const batchNode = new BatchNode<number, number>(
    'double',
    'numbers',
    async (n) => n * 2
  );

  const flow = new Flow('batch-flow').addNode(batchNode).setStartNode('double');

  const context: Context = {
    conversationHistory: [],
    data: { numbers: [1, 2, 3, 4] },
    metadata: {},
  };

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
}

main().catch(console.error);
