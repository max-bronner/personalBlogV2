import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    articles: [
      {
        title: 'An interesting title for a blog post or something',
        description:
          'A short description of the blog post which is rather long and should give a good idea of what the post is about. It can even have several sentences.',
        date: '2025-01-01',
      },
      {
        title: 'Another title for a blog post',
        description:
          'A short description of the blog post which is rather long and should give a good idea of what the post is about. It can even have several sentences.',
        date: '2025-01-01',
      },
      {
        title: 'Ohh, is this also a title for a blog post?',
        description:
          'A short description of the blog post which is rather long and should give a good idea of what the post is about. It can even have several sentences.',
        date: '2025-01-01',
      },
      {
        title: 'Ok, now it becomes boring with these titles',
        description:
          'A short description of the blog post which is rather long and should give a good idea of what the post is about. It can even have several sentences.',
        date: '2025-01-01',
      },
      {
        title: 'Seriously, another title for a blog post?',
        description:
          'A short description of the blog post which is rather long and should give a good idea of what the post is about. It can even have several sentences.',
        date: '2025-01-01',
      },
    ],
    title: 'Main Page',
  },
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
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
