module.exports.fucss = module.exports.cls = module.exports.classer = 
  function(obj){
    // console.log({ obj });
    return Object.entries(obj).reduce((str, [ key, show ]) => !!(show) ? str + ' ' + key : str , '');
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