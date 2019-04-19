const fucss = require('fucss');
const fs    = require('fs');

module.exports = function(content, map, meta) {
  
  const loader = this.loaders.find(({ query }) => query.includes('styleFile'));
  
  if(!fucss.store.styleFile) 
    fucss.store.styleFile = loader && loader.query.split('=').pop();
  
  try{
    if(!~content.indexOf('className=')) 
      return content;
      
    // console.log(content);
    const classes = fucss.generateStyling({ riot: content, returnClasses: true, escape: true }) || [];
    fucss.store.classes = [ ...new Set( [ ...(fucss.store.classes || []), ...classes ]) ];
    
    if(fucss.store.styleFile && fucss.store.classes.length){
      const style = fucss.generateStyling({ classes: fucss.store.classes, returnStyle: true, glob: true, anim: true, escape: true });
      fs.writeFileSync(fucss.store.styleFile, style, { flag: 'w+' } );
    }
    
    // let i = 10; while(i > 0){ console.log(fucss.store.classes); i--; }
    // fs.writeFileSync('./dump/loader_' + new Date().getTime() + '.css', String(' CLASSES: ' + fucss.store.classes.join(', ') + content));
    return content;
  } catch(err) { console.log(err) }
};