import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs, helpers } from './vite.plugin.js';
import dataHome from './src/data.js';
import data20200606 from './src/blog/posts/plants_2020-06-06.json';
import data20200615 from './src/blog/posts/plants_2020-06-15.json';
import data20201109 from './src/blog/posts/plants_2020-09-09.json';
import data20221104 from './src/blog/posts/dev_2022-11-04.json';
import data20230615 from './src/blog/posts/dev_2023-06-15.json';
import dataBlog from './src/blog/posts/data.js';

const pageData = {
  '/index.html': dataHome,
  '/blog/index.html': { articles: dataBlog },
  '/blog/plants_2020-06-06.html': data20200606,
  '/blog/plants_2020-06-15.html': data20200615,
  '/blog/plants_2020-09-09.html': data20201109,
  '/blog/dev_2022-11-04.html': data20221104,
  '/blog/dev_2023-06-15.html': data20230615,
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
        blog: resolve(__dirname, 'src/blog/index.html'),
        post1: resolve(__dirname, 'src/blog/plants_2020-06-06.html'),
        post2: resolve(__dirname, 'src/blog/plants_2020-06-15.html'),
        post3: resolve(__dirname, 'src/blog/plants_2020-09-09.html'),
        post4: resolve(__dirname, 'src/blog/dev_2022-11-04.html'),
        post5: resolve(__dirname, 'src/blog/dev_2023-06-15.html'),
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
      helpers,
    }),
    HotReloadHbs(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
