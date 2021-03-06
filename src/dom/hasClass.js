/**
 * 判断是否包含指定class
 * @param element
 * @param className
 * @returns {boolean}
 */
function hasClass(element, className){
    if(!className){
        throw new Error('参数"className"不能为空！');
    }
    var result=false;
    if(element.getAttribute('class')){
        var classList=element.getAttribute('class').split(/\s+/);
        result=~classList.indexOf(className);
    }
    return result;
}

module.exports = hasClass;