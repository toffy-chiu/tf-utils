var hasClass=require('./hasClass');

function addClass(element, className){
    if(!className){
        throw new Error('参数"className"不能为空！');
    }
    var classNames=[];

    //原来的class
    if(element.className){
        classNames=classNames.concat(element.className.split(' '));
    }

    //没有才添加
    if(!hasClass(element, className)) {
        //新增的class
        classNames.push(className);

        //更新
        element.className = classNames.join(' ');
    }
}

module.exports=addClass;