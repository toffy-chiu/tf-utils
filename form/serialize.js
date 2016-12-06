var param = require('./param');
var serializeArray = require('./serializeArray');

/**
 * 以字符串形式获取表单数据
 * @param {Selector | Element} form
 * @returns {String}
 */
function serialize(form) {
  return param(serializeArray(form));
}

module.exports = serialize;