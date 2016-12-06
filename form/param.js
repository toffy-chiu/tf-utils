/**
 * 把URL参数转化成字符串
 * @param {Array | Object} params
 * @returns {string}
 */
function param(params) {
    var type = Object.prototype.toString.call(params);
    var a = [];
    if (type === '[object Array]') {
        params.forEach(function (o) {
            a[a.length] = encodeURIComponent(o.name) + '=' + encodeURIComponent(o.value);
        });
    } else if (type === '[object Object]') {
        for (var name in params) {
            a[a.length] = encodeURIComponent(name) + '=' + encodeURIComponent(params[name]);
        }
    }
    return a.join('&');
}

module.exports = param;