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
        var callee=arguments.callee;
        if(!distObj){
            //初始化
            distObj={};
        }
        //遍历源对象属性
        for(var k in srcObj){
            var objectType=Object.prototype.toString.call(srcObj[k]);
            if(objectType === "[object Object]"){
                //如果对象属性还是对象，则继续遍历复制
                callee(srcObj[k], distObj[k]);
            }else if(objectType === "[object Array]"){
                //数组
                distObj[k] = srcObj[k].concat();
            }else if(typeof srcObj[k] != 'object'){
                //如果是对象属性是基本类型，则浅复制
                distObj[k] = srcObj[k];
            }
        }
    }

    if(arguments.length>1) {
        for (var i = 1; i <= arguments.length - 1; i++) {
            copyObj(arguments[i], obj);
        }
    }

    return obj;
}

module.exports = objectAssign;