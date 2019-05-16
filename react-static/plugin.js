const fs = require('fs');

module.exports = function FucssPlugin(options) {
  
  this.prevClasses = [];
  this.styleFile = process.cwd() + (options.styleFile || '/static/style.css');
  
  this.apply = function(compiler) {
    
    const styleFile = this.styleFile;
    
    compiler.hooks.beforeCompile.tapPromise('FucssPlugin', (config) => {
      
      !fs.existsSync(styleFile) && fs.writeFileSync(styleFile, '', { flag: 'w+' } );
        
      return Promise.resolve();
    });
  }
}