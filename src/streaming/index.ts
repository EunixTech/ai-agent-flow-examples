// Entry point for streaming example

import dotenv from 'dotenv';
dotenv.config();
import { Flow, Runner, Context } from 'ai-agent-flow';
import { LLMNode } from 'ai-agent-flow/nodes/llm';
import { OpenAI } from 'openai';

// Initialize OpenAI client (1.4.0 and above automatically picks env vars)
new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  // Create a new flow with a name
  const flow = new Flow('streaming-flow');

  // Replace ActionNode with LLMNode for streaming
  const streamingNode = new LLMNode('poem-generator', () => {
    return 'Write a short poem about artificial intelligence, one word at a time.';
  });

  // Update flow to use LLMNode
  flow.addNode(streamingNode).setStartNode('poem-generator');

  // Create context for the flow
  const context: Context = {
    conversationHistory: [],
    data: {},
    metadata: {},
  };

  // Execute the flow using a Runner
  console.log('Starting streaming response...\n');
  const runner = new Runner();

  // Add onUpdate handler to process streamed chunks
  runner.onUpdate((update) => {
    if (update.type === 'chunk') {
      process.stdout.write(update.content);
      console.log('Generated Content:', update.content);
    }
  });

  const result = await runner.runFlow(flow, context);
  console.log({ result, ...context });
  if (result.type === 'success') {
    console.log('Generated Poem:', result.output);
  } else {
    console.error('Flow failed with error:', result.error);
  }
  console.log('\n\nStreaming complete!');
}

// Run the example
main().catch(console.error);
