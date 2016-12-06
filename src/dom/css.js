function css(element, name, value){
    if(typeof name === 'string'){
        if(value===undefined){
            //get css
            return element.style[name];
        }else{
            //set css
            element.style[name]=value;
        }
    }else if(Object.prototype.toString.call(name) === "[object Object]"){
        var obj=name;
        //set css
        for(var key in obj){
            element.style[key]=obj[key];
        }
    }
}

module.exports = css;