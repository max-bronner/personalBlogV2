import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs, helpers } from './vite.plugin.js';
import dataHome from './src/data.js';
import dataBlog from './src/blog/posts/data.js';

const pageData = {
  '/index.html': dataHome,
  '/blog/index.html': { articles: dataBlog },
  '/about/index.html': {
    title: 'About',
  },
};

const rollupInput = {
  main: resolve(__dirname, 'src/index.html'),
  blog: resolve(__dirname, 'src/blog/index.html'),
  about: resolve(__dirname, 'src/about/index.html'),
};

const postDir = './src/blog/posts';
const posts = fs.readdirSync(postDir).filter((file) => file !== 'data.js');

posts.forEach((post) => {
  console.log(post);
  const postName = post.replace('.json', '');
  const postPath = `/blog/${postName}.html`;
  const postData = JSON.parse(fs.readFileSync(`${postDir}/${post}`, 'utf-8'));

  pageData[postPath] = postData;

  rollupInput[postName] = resolve(__dirname, `./src/blog/post.html`);
});

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: rollupInput,
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
