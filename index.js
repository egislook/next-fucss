// Example next.config.js for adding a loader that depends on babel-loader
// This source was taken from the @zeit/next-mdx plugin source:
// https://github.com/zeit/next-plugins/blob/master/packages/next-mdx

const FucssPlugin = require('./fucss.plugin.js');

// module.exports = (mainConfig) => 
//   withCSS({
//     webpack: (config, { dir, dev, isServer, defaultLoaders }) => {
      
//       config.module.rules.push();
      
//       config.plugins.push(new FucssPlugin({ options: true }));
    
//       return config;
//     }
//   })

module.exports = config => {
  config.module.rules.push(loader);
  config.plugins.push(new FucssPlugin({ options: true }));
  return config;
}
  
const loader = module.exports.loader = {
  test: /\.(js|jsx)$/,
  exclude: [/node_modules/],
  include: [/components/, /elements/, /pages/],
  use: require.resolve('./fucss.loader.js') //'fucss-loader'
}

module.exports.plugin = FucssPlugin;