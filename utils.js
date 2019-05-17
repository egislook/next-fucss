const fucss = require('fucss');

module.exports.fucss = module.exports.cls = module.exports.classer = 
  function(obj){
    // console.log({ obj });
    return Object.entries(obj).reduce((str, [ key, show ]) => !!(show) ? str + ' ' + key : str , '');
  }
  
module.exports.fustyle = 
  function(obj){
    // console.log({ obj });
    const classes = Object.entries(obj).reduce((arr, [ key, show ]) => (
      show && key.length ? arr.concat(key.split(' ')) : arr
    ), []);
    
    let style = fucss.generateStyling({ classes, returnStyle: true, onlyRules: true, escape: true, glob: false });
    
    return style;
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