import {defineConfig } from 'cypress';

export default defineConfig({
  projectId: '8w2941',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
} as any)
