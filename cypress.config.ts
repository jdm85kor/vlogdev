import {defineConfig } from 'cypress';
import path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, './components'),
            '@containers': path.resolve(__dirname, './containers'),
          },
        },
      }
    },
  },
} as any)
