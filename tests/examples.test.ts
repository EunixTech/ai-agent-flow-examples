import { describe, it } from 'mocha';
import { spawnSync } from 'child_process';
import { expect } from 'chai';
import path from 'node:path';

const examples = [
  'advanced',
  'chatbot',
  'data-pipeline',
  'debug-ui',
  'memory-store',
  'streaming',
  'tool-calls',
];

describe('example scripts', function () {
  this.timeout(60000);

  for (const dir of examples) {
    it(`runs ${dir} index.ts`, () => {
      const script = path.join('src', dir, 'index.ts');
      const result = spawnSync('npx', ['ts-node', script], {
        encoding: 'utf8',
        env: {
          ...process.env,
          OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? 'test',
        },
      });

      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);

      expect(result.status).to.equal(0);
    });
  }
});
