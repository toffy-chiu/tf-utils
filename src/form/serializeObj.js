var serializeArray=require('./serializeArray');

/**
 * 以对象形式获取表单数据
 * @param {Selector | Element} form
 * @returns {Object}
 */
function serializeObj(form) {
    var arr = serializeArray(form);
    var obj = {};
    arr.forEach(function (o) {
        obj[o.name] = o.value;
    });
    return obj;
}

module.exports = serializeObj;