const fs    = require('fs');

module.exports = class FucssPlugin {
  
  constructor(options) {
    // this.options = options;
    this.prevClasses = [];
    this.styleFile = process.cwd() + (options.styleFile || '/static/style.css');
  }
  
  apply(compiler) {
    
    const styleFile = this.styleFile;
    
    compiler.hooks.beforeConfig.tap('FucssPlugin', (env, type, configuration) => {
      
      !fs.existsSync(styleFile) && fs.writeFileSync(styleFile, '', { flag: 'w+' } );
      
      const loader = {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        include: [/components/, /elements/, /pages/],
        use: require.resolve('./pwa.fucss.loader.js') + '?' + 'styleFile=' + styleFile
      }
      
      let cfg = Array.isArray(configuration) ? configuration : [configuration];
      cfg.forEach(c => c.module.rules.push(loader));
      return;
    });
    
  }
}