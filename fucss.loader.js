const fucss = require('fucss');

module.exports = function(content, map, meta) {
  
  try{
    if(!~content.indexOf('className=')) 
      return content;
      
    const classes = fucss.generateStyling({ riot: content, returnClasses: true, escape: true }) || [];
    fucss.store.classes = [ ...new Set( [ ...(fucss.store.classes || []), ...classes ]) ];
    
    // let i = 10; while(i > 0){ console.log(fucss.store.classes); i--; }
    // fs.writeFileSync('./dump/loader_' + new Date().getTime() + '.css', String(' CLASSES: ' + fucss.store.classes.join(', ') + content));
    return content;
  } catch(err) { console.log(err) }
};