import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs } from './vite.plugin.js';

const pageData = {
  '/index.html': {
    articles: [
      {
        title: 'The Secret to Thriving Indoor Plants',
        description:
          'Keeping indoor plants alive doesn’t have to be a struggle. By understanding light, water, and soil needs, you can create a thriving indoor jungle that brightens up your home.',
        text: `Houseplants have become a staple in modern homes, adding greenery and improving air quality. However, many people struggle to keep them alive. The secret to success? Understanding the basics of plant care and creating the right environment for each species.

First, lighting is crucial. Some plants, like snake plants and pothos, thrive in low-light conditions, making them perfect for dim corners. Others, like succulents and cacti, need bright, direct sunlight to stay healthy. Knowing what your plant prefers will prevent issues like leggy growth or yellowing leaves.

Watering is another key factor. Overwatering is the most common reason houseplants die. A good rule of thumb is to let the soil dry out between waterings. Stick your finger about an inch into the soil—if it feels dry, it’s time to water. Different plants have different needs, so do a quick check on what works best for yours.

Lastly, the right soil and pot can make a big difference. Well-draining soil prevents root rot, and pots with drainage holes help excess water escape. By paying attention to these small details, your indoor plants will not only survive but thrive.`,
        date: '2025-01-01',
      },
      {
        title: 'Why JavaScript Frameworks Keep Evolving',
        description:
          'New JavaScript frameworks seem to appear every year, but why does this happen? The demand for better performance, easier development, and scalability drives constant innovation in web development.',
        text: `New JavaScript frameworks seem to appear every year, but why does this happen? The demand for better performance, easier development, and scalability drives constant innovation in web development.

JavaScript frameworks have come a long way since the early days of the web. From jQuery in the 2000s to modern powerhouses like React, Vue, and Svelte, each new framework aims to solve different challenges developers face. But why do we keep seeing new ones emerge?

One major reason is performance. As web applications become more complex, developers need faster, more efficient ways to build and update content dynamically. Frameworks like Svelte, which compiles code into highly optimized JavaScript, offer significant performance improvements over older methods.

Another reason is developer experience. New frameworks introduce better tools, easier syntax, and improved state management solutions to make coding more efficient. React popularized the component-based architecture, making UI development more modular and reusable.

Finally, scalability plays a huge role. Large-scale applications need frameworks that can handle growing user bases without slowing down. That’s why tools like Next.js and Nuxt.js build on existing frameworks to optimize performance and SEO.

The evolution of JavaScript frameworks is a sign of progress. While it may seem overwhelming to keep up, staying informed about the latest trends can help developers choose the best tools for their projects.`,
        date: '2025-01-01',
      },
      {
        title: 'The Future of AI in Everyday Tech',
        description:
          'Artificial intelligence is no longer limited to sci-fi movies. It’s already a part of our daily lives, and its impact is only growing. From smart assistants to self-driving cars, AI is shaping the future.',
        text: `AI is already transforming the way we interact with technology. Virtual assistants like Siri and Google Assistant use AI to understand and process natural language, while streaming services like Netflix and Spotify rely on AI-driven algorithms to suggest content based on user preferences.

One of the biggest areas of AI growth is automation. Chatbots are now handling customer service inquiries, freeing up human workers for more complex tasks. AI-powered tools are also helping businesses analyze vast amounts of data, improving decision-making processes in industries like healthcare and finance.

Looking ahead, AI is expected to revolutionize transportation with self-driving cars and advanced traffic management systems. In creative fields, AI is being used to generate music, art, and even assist in writing. While some fear AI may replace jobs, many experts believe it will enhance productivity and open new opportunities.

As AI becomes more advanced, ethical concerns arise, particularly regarding privacy and bias in algorithms. Striking a balance between innovation and responsible AI development will be key in shaping a future where technology benefits everyone.`,
        date: '2025-01-01',
      },
      {
        title: 'Is Gaming Better Now Than in the Past?',
        description:
          'Gaming has evolved dramatically over the years, but is the modern era truly better than the past? While today’s games offer stunning graphics and massive open worlds, older games had their own unique charm.',
        text: `Gaming has undergone massive changes, from pixelated 8-bit classics to hyper-realistic virtual worlds. Today’s games boast stunning graphics, expansive multiplayer experiences, and deep storytelling. However, many gamers still feel nostalgic for the simplicity and creativity of older games.

One major difference is how games are distributed and monetized. In the past, buying a game meant owning the full experience. Today, microtransactions, battle passes, and live-service models have changed the industry, sometimes leading to frustration among players. While modern games offer continuous updates and new content, they also often come with additional costs.

That said, modern gaming provides experiences that were impossible decades ago. Open-world games like The Legend of Zelda: Breath of the Wild and Red Dead Redemption 2 allow for unprecedented freedom and immersion. Online multiplayer has connected players worldwide, making gaming a more social experience than ever before.

Ultimately, the "best" era of gaming depends on personal preference. Whether you love the nostalgia of classic arcade games or the cinematic storytelling of modern blockbusters, gaming continues to evolve in exciting ways.`,
        date: '2025-01-01',
      },
      {
        title: 'Seriously, another title for a blog post?',
        description:
          'The 1980s produced some of the most iconic films of all time. But why do these movies remain beloved even decades later? Strong storytelling, practical effects, and timeless characters play a big role.',
        text: `The 1980s were a golden age for cinema, giving us unforgettable films like Back to the Future, The Terminator, and Ghostbusters. Even today, these movies continue to captivate audiences. What makes them so enduring?

One reason is practical effects. Before the heavy use of CGI, filmmakers relied on animatronics, miniatures, and real-world stunts to create movie magic. The result? Effects that still hold up today, unlike early CGI, which often looks outdated. Movies like Jurassic Park (which blended practical effects with CGI) remain visually impressive even decades later.

Another key factor is storytelling. Many 80s films focused on adventure, heart, and humor. From Indiana Jones' thrilling treasure hunts to the underdog spirit of The Karate Kid, these movies had universal themes that still resonate. They weren’t just about spectacle; they had strong characters and compelling narratives.

Finally, the cultural impact of 80s movies continues to shape modern entertainment. Shows like Stranger Things pay homage to the era, while sequels and reboots of classics keep the nostalgia alive. Whether you grew up in the 80s or discovered these films later, their influence on pop culture is undeniable.`,
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
