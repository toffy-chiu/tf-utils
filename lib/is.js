module.exports = {
    string: function (o) {
        return typeof o === 'string';
    },
    array: function (o) {
        return Object.prototype.toString.apply(o) === "[object Array]";
    },
    object: function (o) {
        return Object.prototype.toString.call(o) === "[object Object]";
    }
};