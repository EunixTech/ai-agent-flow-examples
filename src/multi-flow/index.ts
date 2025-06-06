import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

async function main() {
  const nodeA = new ActionNode('a', async () => {
    console.log('Running flow A');
    return { type: 'success', output: 'done A' };
  });

  const flowA = new Flow('flowA').addNode(nodeA).setStartNode('a');

  const nodeB = new ActionNode('b', async () => {
    console.log('Running flow B');
    return { type: 'success', output: 'done B' };
  });

  const flowB = new Flow('flowB').addNode(nodeB).setStartNode('b');

  const ctxA: Context = { conversationHistory: [], data: {}, metadata: {} };
  const ctxB: Context = { conversationHistory: [], data: {}, metadata: {} };

  const runner = new Runner();
  const results = await runner.runAgentFlows(
    [flowA, flowB],
    { [flowA.getId()]: ctxA, [flowB.getId()]: ctxB },
    true,
  );

  console.log(results);
}

main().catch(console.error);
