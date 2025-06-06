// Entry point for plugin-system example
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { Flow, Runner, Context, Node, NodeResult } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';
import path from 'node:path';
// These imports are commented out to avoid linter errors without the actual packages
// import { MongoClient } from 'mongodb';
// import { Anthropic } from '@anthropic-ai/sdk';

/**
 *   * Add CustomNode that implements a unique behavior
 * Add MongoContextStore to store context in MongoDB
 * Add AnthropicProvider as an alternative to OpenAI
 *
 * */

// Custom Node that implements a unique behavior
export class WeatherNode extends Node {
  constructor(id: string) {
    super(id);
    (this as any).type = 'weather';
  }

  async execute(context: Context): Promise<NodeResult> {
    console.log(
      `WeatherNode: Getting weather for ${
        context.data.location || 'default location'
      }`
    );

    // Simulate weather API call
    const weather = {
      location: context.data.location || 'New York',
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][
        Math.floor(Math.random() * 4)
      ],
      timestamp: new Date().toISOString(),
    };

    // Update context with weather data
    context.data.weather = weather;

    return {
      type: 'success',
      output: `Weather in ${weather.location}: ${weather.temperature}°C, ${weather.condition}`,
    };
  }
}

// MongoContextStore to store context in MongoDB
// This is a simplified placeholder implementation used for the example.
// Replace with a real MongoDB client if you need persistence.
export class MongoContextStore {
  private client: any; // MongoClient type
  private db: any;
  private collection: any;

  constructor(_uri: string, _dbName: string, _collectionName: string) {
    // In a real implementation, this would be: this.client = new MongoClient(uri);
    this.client = { connect: async () => {} };
    this.db = null;
    this.collection = null;
  }

  async connect() {
    await this.client.connect();
    this.db = { collection: (name: string) => ({}) };
    this.collection = this.db.collection('contexts');
    console.log('Connected to MongoDB');
  }

  async saveContext(flowId: string, context: Context) {
    if (!this.collection) await this.connect();

    // In a real implementation, this would use MongoDB operations
    console.log(`Context saved for flow: ${flowId}`);
  }

  async getContext(flowId: string): Promise<Context | null> {
    if (!this.collection) await this.connect();

    // In a real implementation, this would query MongoDB
    return null;
  }

  async disconnect() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }
}

// AnthropicProvider as an alternative to OpenAI
// This class is a minimal stub. It simulates the Anthropic SDK
// so the example can run without the real dependency.
export class AnthropicProvider {
  private client: any; // Anthropic type

  constructor(apiKey: string) {
    // In a real implementation, this would be: this.client = new Anthropic({ apiKey });
    this.client = {
      messages: {
        create: async () => ({
          content: [{ text: 'This is a simulated response' }],
        }),
      },
    };
  }

  async generateCompletion(prompt: string): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Error generating completion with Anthropic:', error);
      return 'Error generating response';
    }
  }
}

// Example usage
async function runExample() {
  // Create a flow with our custom WeatherNode
  const weatherNode = new WeatherNode('get-weather');
  const actionNode = new ActionNode('process-weather', async (context) => {
    const weather = context.data.weather as any;
    return {
      type: 'success',
      output: `Processed weather data for ${weather.location}`,
    };
  });

  const flow = new Flow('weather-flow')
    .addNode(weatherNode)
    .addNode(actionNode)
    .setStartNode('get-weather');

  // Add transition between nodes using the correct method
  flow.addTransition('get-weather', {
    action: 'default',
    to: 'process-weather',
  });

  // Initialize context with location
  const context: Context = {
    conversationHistory: [],
    data: { location: 'San Francisco' },
    metadata: {},
  };

  // Initialize MongoDB context store (commented out as it requires a MongoDB instance)
  // const mongoStore = new MongoContextStore('mongodb://localhost:27017', 'ai-agent-flow', 'contexts');
  // await mongoStore.connect();
  // await mongoStore.saveContext('weather-flow', context);

  // Initialize Anthropic provider (commented out as it requires an API key)
  // const anthropicProvider = new AnthropicProvider('your-anthropic-api-key');
  // const completion = await anthropicProvider.generateCompletion('What is the weather like?');
  // console.log('Anthropic completion:', completion);

  // Run the flow with a custom logger plugin
  const runner = new Runner(3, 1000, undefined, [
    path.join(__dirname, 'logger-plugin.js'),
  ]);
  const result = await runner.runFlow(flow, context);

  console.log('Flow result:', result);

  // Clean up
  // await mongoStore.disconnect();
}

// Run the example
runExample().catch(console.error);
