/**
 * 以数组形式获取表单数据
 * @param {Selector | Element} form
 * @returns {Array}
 */
function serializeArray(form) {
    if (typeof form === 'string') {
        form = document.querySelector(form);
    }
    var fields = form.querySelectorAll('[name]');
    var arr = [];
    for (var i = 0, len = fields.length, field; i < len; i++) {
        field = fields[0];
        if (field.name) {
            arr.push({
                name: field.name,
                value: field.value
            });
        }
    }
    return arr;
}

module.exports = serializeArray;