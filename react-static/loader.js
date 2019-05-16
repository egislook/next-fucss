const fucss = require('fucss');
const fs = require('fs');

module.exports = function(content, map, meta) {
  
  const loader = this.loaders.find(({ query }) => query.includes('styleFile'));
  fucss.store.styleFile = process.cwd() + (loader && loader.query.split('=').pop());
  
  if(!~content.indexOf('className=')) 
    return content;
  
  const classes = fucss.generateStyling({ riot: content, returnClasses: true, escape: true }) || [];
  fucss.store.classes = (fucss.store.classes || []).concat(classes);
  fucss.store.classes = fucss.store.classes.filter(( v, i ) => fucss.store.classes.indexOf(v) === i);
  
  if(fucss.store.styleFile && fucss.store.classes.length){
    const style = fucss.generateStyling({ classes: fucss.store.classes, returnStyle: true, glob: true, anim: true, escape: true });
    fs.writeFileSync(fucss.store.styleFile, style, { flag: 'w+' } );
  }
  
  return content;
};