// Test script for plugin-system example
import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

// Import the custom components from index.ts
import { WeatherNode } from './index';

/**
 * This test script demonstrates how to use the custom components
 * from the plugin system example in a more focused way.
 */
async function runTest() {
  console.log('🧪 Running Plugin System Test');
  console.log('=============================');
  
  // Test 1: Basic WeatherNode
  console.log('\n📊 Test 1: Basic WeatherNode');
  const weatherNode = new WeatherNode('test-weather');
  const context: Context = {
    conversationHistory: [],
    data: { location: 'Tokyo' },
    metadata: {}
  };
  
  try {
    const result = await weatherNode.execute(context);
    console.log('✅ WeatherNode executed successfully');
    console.log('Result:', result);
    console.log('Context data:', context.data);
  } catch (error) {
    console.error('❌ WeatherNode test failed:', error);
  }
  
  // Test 2: Flow with WeatherNode
  console.log('\n📊 Test 2: Flow with WeatherNode');
  const actionNode = new ActionNode('process-weather', async (ctx) => {
    const weather = ctx.data.weather as any;
    return {
      type: 'success',
      output: `Processed weather data for ${weather.location}`
    };
  });
  
  const flow = new Flow('test-weather-flow')
    .addNode(weatherNode)
    .addNode(actionNode)
    .setStartNode('test-weather');
  
  // Add transition between nodes using the correct method
  flow.addTransition('test-weather', { action: 'default', to: 'process-weather' });
  
  try {
    const runner = new Runner();
    const flowResult = await runner.runFlow(flow, context);
    console.log('✅ Flow executed successfully');
    console.log('Flow result:', flowResult);
  } catch (error) {
    console.error('❌ Flow test failed:', error);
  }
  
  console.log('\n✅ Plugin System Test Completed');
}

// Run the test
runTest().catch(error => {
  console.error('❌ Test failed with error:', error);
  process.exit(1);
}); 