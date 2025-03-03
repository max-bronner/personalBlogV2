import data from './blog/posts/data.js';

export default {
  articles: [...data.slice(0, 4)],
  title: 'Main Page',
};
