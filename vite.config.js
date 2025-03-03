import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs, helpers } from './vite.plugin.js';
import dataHome from './src/data.js';
import data20200606 from './src/blog/posts/plants_2020-06-06.json';
import data20200607 from './src/blog/posts/plants_2020-06-07.json';
import data20200608 from './src/blog/posts/plants_2020-06-08.json';
import data20200609 from './src/blog/posts/plants_2020-06-09.json';
import data20200610 from './src/blog/posts/plants_2020-06-10.json';
import dataBlog from './src/blog/posts/data.js';
import fs from 'fs';

const parseContent = () => {
  const contentFiles = fs.globSync('./content/**/*.json');
};

const pageData = {
  '/index.html': dataHome,
  '/blog/index.html': { articles: dataBlog },
  '/blog/plants_2020-06-06.html': data20200606,
  '/blog/plants_2020-06-07.html': data20200607,
  '/blog/plants_2020-06-08.html': data20200608,
  '/blog/plants_2020-06-09.html': data20200609,
  '/blog/plants_2020-06-10.html': data20200610,
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
        post2: resolve(__dirname, 'src/blog/plants_2020-06-07.html'),
        post3: resolve(__dirname, 'src/blog/plants_2020-06-08.html'),
        post4: resolve(__dirname, 'src/blog/plants_2020-06-09.html'),
        post5: resolve(__dirname, 'src/blog/plants_2020-06-10.html'),
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
