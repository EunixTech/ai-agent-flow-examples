import { Flow, Runner, Context } from 'ai-agent-flow';
import { HttpNode } from 'ai-agent-flow/nodes/http';

async function main() {
  const fetchNode = new HttpNode('get-todo', {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET',
  });

  const flow = new Flow('http-flow')
    .addNode(fetchNode)
    .setStartNode('get-todo');

  const context: Context = {
    conversationHistory: [],
    data: {},
    metadata: {},
  };

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
}

main().catch(console.error);
