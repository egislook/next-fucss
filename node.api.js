const Plugin = require('./react-static/plugin');
const Loader = require('./react-static/loader');

exports.default = (options = {}) => {
  
  let { styleFile = '/public/style.css' } = options;
  const { include = [] } = options;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  isDevelopment && console.log('[FUCSS] development');
  
  return ({
    webpack: config => {
      
      if(!isDevelopment) 
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