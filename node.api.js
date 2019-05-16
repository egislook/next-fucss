const Plugin = require('./react-static/plugin');
const Loader = require('./react-static/loader');

exports.default = (options = {}) => {
  console.log('next-fucss', options);
  
  return ({
    webpack: config => {
      
      const styleFile = '/public/style.css';
      
      const loader = {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        include: [/components/, /elements/, /pages/, '/screens/'],
        use: require.resolve('./react-static/loader.js') + '?' + 'styleFile=' + styleFile
      }
      
      config.module.rules.push(loader);
      config.plugins.push(new Plugin({ styleFile }));
      return config
    },
  })
}