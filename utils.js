module.exports.fucss = module.exports.cls = module.exports.classer = (obj) => 
  Object.entries(obj).reduce((str, [ key, show ]) => show ? str + ' ' + key : str , '');