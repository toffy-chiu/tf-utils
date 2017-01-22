function hasParent(currentNode, parentNode) {
    var flag = false;

    recurse(currentNode);

    //递归往上找父节点
    function recurse(nextParent) {
        if (nextParent === parentNode) {
            flag = true;
        } else if (nextParent.parentNode && nextParent.parentNode !== document.body) {
            //住上找到body节点为止
            recurse(nextParent.parentNode);
        }
    }

    return flag;
}

module.exports = hasParent;