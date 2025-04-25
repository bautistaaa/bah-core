import type { StorybookConfig } from '@storybook/angular';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              // config: path.resolve(__dirname, '.postcssrc.json'),
              // plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
            },
          },
        }],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '.')
        ],
      });
    }
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
