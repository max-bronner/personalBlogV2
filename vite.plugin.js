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
