import {defineConfig } from 'cypress';

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_CYPRESS_PROJECT_ID,
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
