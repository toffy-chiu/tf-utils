/**
 * Promise 实现类
 * @constructor
 */

function Promise(){
    this.callbacks=[];
}

Promise.prototype={
    construct:Promise,
    complete:function(type, result){
        while (this.callbacks[0]) {
            var callback=this.callbacks.shift();
            callback[type]&&callback[type](result);
        }
    },
    resolve:function(result){
        this.complete('resolve', result);
    },
    reject:function(result){
        this.complete('reject', result);
    },
    then: function(successHandler, failedHandler) {
        this.callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });

        return this;
    },
    done:function(handler){
        return this.then(handler);
    },
    fail:function(handler){
        return this.then(null, handler);
    }
};

module.exports = Promise;