var hasClass=require('./hasClass');

function removeClass(element, className){
    if(!className){
        throw new Error('参数"className"不能为空！');
    }
    var classNames=[];

    //原来的class
    if(element.className){
        classNames=classNames.concat(element.className.split(/\s+/));
    }

    //判断指定class是否存在于元素中
    if(hasClass(element, className)) {
        //移除指定class
        classNames.splice(classNames.indexOf(className), 1);

        //更新
        element.className = classNames.join(' ');
    }
}

module.exports=removeClass;