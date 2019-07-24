// Example next.config.js for adding a loader that depends on babel-loader
// This source was taken from the @zeit/next-mdx plugin source:
// https://github.com/zeit/next-plugins/blob/master/packages/next-mdx
const FucssPlugin = require('./fucss.plugin.js');
const { cls }  = require('./utils.js');
const PwaFucssPlugin = require('./pwa/pwa.fucss.plugin.js');
const path = require('path');

// module.exports = (mainConfig) => 
//   withCSS({
//     webpack: (config, { dir, dev, isServer, defaultLoaders }) => {
      
//       config.module.rules.push();
      
//       config.plugins.push(new FucssPlugin({ options: true }));
    
//       return config;
//     }
//   })

module.exports.withFucss = config => {
  config.module.rules.push(loader);
  config.plugins.push(new FucssPlugin({ options: true }));
  return config;
}

module.exports.plugin = FucssPlugin;
module.exports.PwaFucssPlugin = PwaFucssPlugin;
  
const loader = module.exports.loader = {
  test: /\.(js|jsx)$/,
  exclude: [/node_modules/],
  include: [/[src|pages|comps|elems|components|elements|screens]/gm],
  use: require.resolve('./fucss.loader.js') //'fucss-loader'
}

module.exports.fucss = module.exports.cls = module.exports.classer = cls;

// if(typeof window !== 'object'){
  
  
// }