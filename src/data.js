import data from './blog/posts/index.js';

export default {
  articles: [...data.splice(0, 4)],
  title: 'Main Page',
};
