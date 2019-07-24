const fucss = require('fucss');
const fs    = require('fs');

const styleFile = process.cwd() + '/static/style.css';

module.exports = class FucssPlugin {
  
  constructor(options) {
    // this.options = options;
    this.prevClasses = [];
  }
  
  apply(compiler) {
    
    compiler.hooks.beforeCompile.tapPromise('FucssPlugin', async (compilation) => {
      !fs.existsSync(styleFile) && fs.writeFileSync(styleFile, '', { flag: 'w+' } );
      return;
    })
    
    compiler.hooks.emit.tapPromise('FucssPlugin', async (compilation, cb) => {
      
      try{
        
        const files = [];
        
        if(!fucss.store.classes) return;
        
        for(let i in compilation.chunks){
          const chunk = compilation.chunks[i];
          chunk.files.length && files.push(chunk.files[0]);
        }
        
        const processingFile = files[files.length - 1];
        
        if(~processingFile.indexOf('.css') || !fucss.store.classes.length)
          return;
        
        const style = fucss.generateStyling({ classes: fucss.store.classes, returnStyle: true, glob: true, anim: true, escape: true });
        
        // const str = `
        //   prevLength: ${this.prevClasses.length} 
        //   currentLength: ${fucss.store.classes.length}
        //   processingFile: ${processingFile}
        //   classes: ${(fucss.store.classes || []).join(', ')}
        //   style: ${style}
        // `;
          
        // fs.writeFileSync('./dump/plugin_' + new Date().getTime() + '.css', process.cwd() + '/static/style.css');
        
        if(this.prevClasses.length === fucss.store.classes.length) return;
        
        // let i = 100; while(i < 0){ console.log(process.cwd()); i--; };
        
        fs.writeFileSync(styleFile, style + ' /** Incorrect classes ' + fucss.incorrect.join(' ') + ' */', { flag: 'w+' } );
        this.prevClasses = fucss.store.classes;
        return;
        
      } catch(err){ console.log(err) }
    });
  }
}

function add(compilation, style, { filename, source }){
  const pageSource = [fucssInject.toString(), 'fucssInject("' + fucssToBase64(style) + '")', source].join('; ');
    
  // fs.writeFileSync('temp.css', classes.join(', ') + pageSource, function(err, data){
  //   if (err) console.log(err);
  //   console.log("Successfully Written to File.");
  // });
  
  compilation.assets[filename] = {
		source: () => pageSource,
		size: () => pageSource.length
	}
}

function fucssInject(style){
  console.log(style);
  if(typeof document !== 'object')
    return;
    
  var elem = document.querySelector('style#fucss');
  
  style = window.atob(style.split('base64,').pop());
  
  // console.log(style);
  
  if(elem){ 
    elem.innerHTML = style;
    return;
  }
  
  // <link rel="stylesheet" href="css.css" media="none">
  // var css = document.createElement('link');
  // css.setAttribute('href', style);
  // css.setAttribute('rel', 'stylesheet');
  // css.setAttribute('id', 'fucss');
  
  var css = document.createElement('style');
  css.setAttribute('id', 'fucss');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(style));
  document.getElementsByTagName('head')[0].appendChild(css);
}

function fucssToBase64(str){
  return 'data:text/plain;base64,' + Buffer(str).toString('base64');
}