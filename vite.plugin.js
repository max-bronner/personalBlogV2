export const HotReloadHbs = () => {
  return {
    name: 'hbs-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.hbs')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
};

export const helpers = {
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
  replaceSpaces: function (string) {
    if (typeof string !== 'string') return '';
    // workaround for Handlebars not rendering spaces
    return {
      __html: string
        .replace(/&/g, '&amp;')
        .replace(/ /g, '&nbsp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;'),
      toHTML: function () {
        return this.__html;
      },
    };
  },
};
