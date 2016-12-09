/**
 * Promise 实现类
 * @constructor
 */

function Promise() {
    this.callbacks = [];
}

Promise.prototype = {
    construct: Promise,
    complete: function () {
        var args = Array.prototype.slice.call(arguments);
        var type = args[0];
        while (this.callbacks[0]) {
            var callback = this.callbacks.shift();
            if (callback[type]) {
                callback[type].apply(callback, args.slice(1));
            }
        }
    },
    resolve: function () {
        //支持动态参数
        var args = Array.prototype.slice.call(arguments);
        args.unshift('resolve');
        this.complete.apply(this, args);
    },
    reject: function (result) {
        //支持动态参数
        var args = Array.prototype.slice.call(arguments);
        args.unshift('reject');
        this.complete.apply(this, args);
    },
    then: function (successHandler, failedHandler) {
        this.callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });

        return this;
    },
    done: function (handler) {
        return this.then(handler);
    },
    fail: function (handler) {
        return this.then(null, handler);
    }
};

module.exports = Promise;