// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    resolve: {
        extensions: ['.js', '.json']
    }
  });
};