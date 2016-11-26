var hasClass=require('./hasClass');

function findChildren(element, className){
    if(!element.childNodes.length){
        return [];
    }

    var nodeArray=Array.prototype.slice.call(element.childNodes);
    if(!className){
        return nodeArray;
    }

    return nodeArray.filter(function(node){
        return hasClass(node, className);
    });
}

module.exports = findChildren;