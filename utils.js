module.exports.fucss = module.exports.cls = module.exports.classer = 
  function(obj){
    return Object.entries(obj).reduce((str, [ key, show ]) => !!(show) ? str + ' ' + key : str , '');
  }