/**
 * 获取相对于body元素的offset对象
 * 注意：offset相关属性只有在元素［可见状态］下才能准确获取
 * @param element
 * @returns {{left: (Number|number), top: (*|number|Number), width: number, height: number}}
 */
function offset(element){
    var obj={
        left:element.offsetLeft,
        top:element.offsetTop,
        width:element.offsetWidth,
        height:element.offsetHeight
    };

    /**
     * 逐层寻找offsetParent，直到根节点为止
     * @param parent
     */
    function findRootParent(parent){
        var callee=arguments.callee;
        if(parent&&parent!==document.body){
            obj.left+=parent.offsetLeft;
            obj.top+=parent.offsetTop;
            callee(parent.offsetParent);
        }
    }

    findRootParent(element.offsetParent);

    return obj;
}

module.exports=offset;