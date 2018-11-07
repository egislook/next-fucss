module.exports.generator = (obj) => 
  Object.entries(obj).reduce((str, [ key, show ]) => show ? str + ' ' + key : str , '');