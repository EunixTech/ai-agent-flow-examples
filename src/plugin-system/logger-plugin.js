module.exports = {
  default: {
    name: 'logger',
    setup(runner) {
      runner.onUpdate((u) => console.log('[PLUGIN]', u));
    },
  },
};
