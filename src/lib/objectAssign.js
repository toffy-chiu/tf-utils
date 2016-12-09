/**
 * 对象合并（深复制）
 * @param obj
 * @returns {*}
 */
function objectAssign(obj){
    var type=Object.prototype.toString.call(obj);
    if(type !== "[object Object]"){
        throw new Error('函数objectAssign(obj,...)，参数必须为对象类型，当前类型：'+type);
    }
    /**
     * 深复制对象
     * @param srcObj
     * @param distObj
     */
    function copyObj(srcObj, distObj){
        //遍历源对象属性
        for(var k in srcObj){
            //undefined的不去替换
            if(srcObj[k] !== undefined) {
                var objectType = Object.prototype.toString.call(srcObj[k]);
                if (objectType === "[object Object]") {
                    //如果是对象替换字符串，则把字符串转为对象先
                    if (typeof distObj[k] === 'string') {
                        distObj[k] = {};
                    }

                    //如果对象属性还是对象，则继续遍历复制
                    if(!distObj[k]){
                        distObj[k]={};
                    }
                    copyObj(srcObj[k], distObj[k]);
                } else if (objectType === "[object Array]") {
                    //数组
                    distObj[k] = srcObj[k].concat();
                } else if (typeof srcObj[k] != 'object') {
                    //如果是对象属性是基本类型，则浅复制
                    distObj[k] = srcObj[k];
                }
            }
        }
    }

    if(arguments.length>1) {
        for (var i = 1; i <= arguments.length - 1; i++) {
            if(!obj){
                obj={};
            }
            copyObj(arguments[i], obj);
        }
    }

    return obj;
}

module.exports = objectAssign;