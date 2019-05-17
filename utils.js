const fucss = require('fucss');

module.exports.fucss = module.exports.cls = module.exports.classer = 
  function(obj){
    // console.log({ obj });
    return Object.entries(obj).reduce((str, [ key, show ]) => !!(show) ? str + ' ' + key : str , '');
  }
  
module.exports.fustyle = 
  function(obj){
    
    const classes = typeof obj === 'string'
      ? obj.split(' ')
      : Object.entries(obj).reduce((arr, [ key, show ]) => (
          show && key.length ? arr.concat(key.split(' ')) : arr
        ), []);
    
    return fucss.generateStyling({ classes, returnStyle: true, onlyRules: true, escape: true, glob: false });
  }
  
module.exports.cssReload = function(link){
  if(typeof window === 'object'){
    link = link || '/main.css';
    const elem = document.querySelector('[href*="' + link + '"]');
    if(!elem) return;
    console.log('[FUCSS] Reload');
    elem.href = link + '?' + new Date().getTime();
  }
}