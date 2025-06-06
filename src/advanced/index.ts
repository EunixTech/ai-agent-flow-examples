import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';
import { DecisionNode } from 'ai-agent-flow/nodes/decision';

async function main() {
  const greetNode = new ActionNode('greet', async () => {
    return {
      type: 'success',
      output: 'Starting advanced flow',
      action: 'decide',
    };
  });

  const decisionNode = new DecisionNode('decide', (context) => {
    return context.data.score > 0 ? 'positive' : 'negative';
  });

  const positiveNode = new ActionNode('positive', async () => {
    return { type: 'success', output: 'Everything looks great!' };
  });

  const negativeNode = new ActionNode('negative', async () => {
    return { type: 'success', output: 'Something went wrong.' };
  });

  const flow = new Flow('advanced-flow')
    .addNode(greetNode)
    .addNode(decisionNode)
    .addNode(positiveNode)
    .addNode(negativeNode)
    .setStartNode('greet')
    .addTransition('greet', { action: 'decide', to: 'decide' })
    .addTransition('decide', { action: 'positive', to: 'positive' })
    .addTransition('decide', { action: 'negative', to: 'negative' });

  const context: Context = {
    conversationHistory: [],
    data: { score: 1 },
    metadata: {},
  };

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
}

main().catch(console.error);
