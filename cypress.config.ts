import {defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
} as any)
