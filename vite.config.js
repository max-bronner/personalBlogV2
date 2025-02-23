import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs } from './vite.plugin.js';
import { data as dataHome } from './src/data.js';

const pageData = {
  '/index.html': dataHome,
  '/about/index.html': {
    title: 'About',
  },
};

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
      },
    },
  },
  css: {
    codeSplit: false,
  },
  plugins: [
    ViteMinifyPlugin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
    }),
    Handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return pageData[pagePath];
      },
      helpers: {
        ifEquals: (arg1, arg2, options) => {
          if (arg1 === arg2) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        formatDate: (date, format) => {
          const dateObject = new Date(date);

          if (format === 'short') {
            return dateObject.toLocaleString('default', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            });
          } else if (format === 'long') {
            return dateObject.toLocaleString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          } else {
            return dateObject.toLocaleDateString();
          }
        },
      },
    }),
    HotReloadHbs(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
