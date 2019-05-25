const Plugin = require('./react-static/plugin');
const Loader = require('./react-static/loader');

exports.default = (options = {}) => {
  
  let { styleFile = '/public/style.css' } = options;
  let { include = [], allowBuild } = options;
  allowBuild = allowBuild || process.env.NODE_ENV === 'development';
  
  allowBuild && console.log('[FUCSS] allow Build');
  
  return ({
    webpack: config => {
      
      if(!allowBuild) 
        return config;
      
      const loader = {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        include: [/src/].concat(include),
        use: require.resolve('./react-static/loader.js') + '?' + 'styleFile=' + styleFile
      }
      
      config.module.rules.push(loader);
      config.plugins.push(new Plugin({ styleFile }));
      return config
    }
  })
}