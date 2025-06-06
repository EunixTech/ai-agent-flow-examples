import dotenv from 'dotenv';
dotenv.config();
import readline from 'node:readline';
import { Flow, Runner, Context } from 'ai-agent-flow';
import { LLMNode } from 'ai-agent-flow/nodes/llm';
import { OpenAI } from 'openai';

// Initialize OpenAI with API key from environment
new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const chatNode = new LLMNode('chat', (ctx) => ctx.data.userInput as string);
  const flow = new Flow('interactive-cli')
    .addNode(chatNode)
    .setStartNode('chat');

  const context: Context = { conversationHistory: [], data: {}, metadata: {} };
  const runner = new Runner();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('Type "exit" to quit.');

  const ask = () => {
    rl.question('You> ', async (line) => {
      if (line.trim().toLowerCase() === 'exit') {
        rl.close();
        return;
      }
      context.data.userInput = line;
      const result = await runner.runFlow(flow, context);
      if (result.type === 'success') {
        console.log('Bot>', result.output);
      } else {
        console.error('Error:', result.error);
      }
      ask();
    });
  };

  ask();
}

main().catch(console.error);
