var objectAssign=require('./objectAssign');
var param=require('../form/param');
var Promise=require('../class/Promise');

/**
 * ajax
 */
function ajax(option){
    var opt=objectAssign({
        type:'GET',
        async:true,
        data:'',
        dataType:'json',
        jsonp:'cb',
        contentType:'application/x-www-form-urlencoded',
        success:function(){},
        error:function(){}
    }, option);

    if(!opt.url){
        throw new Error('url参数不能为空');
    }

    //promise
    var promise=new Promise();

    var successCallback=function(){
        promise.resolve.apply(promise, arguments);
        opt.success.apply(opt, arguments);
    };
    var errorCallback=function(){
        promise.reject.apply(promise, arguments);
        opt.error.apply(opt, arguments);
    };

    //序列化参数
    if(typeof opt.data!=='string'){
        opt.data=param(opt.data);
    }

    if(opt.dataType=='jsonp'){
        //全局作用域
        window.jsonpCallback=function(json){
            successCallback(json);
            window.jsonpCallback=null;
        };
        var jsonpScript=document.createElement('script');
        jsonpScript.type='text/javascript';
        jsonpScript.src=opt.url+'?'+opt.jsonp+'=jsonpCallback'+(opt.data==''?'':('&'+opt.data));
        var head=document.getElementsByTagName('head')[0];
        head.appendChild(jsonpScript);
        head.removeChild(jsonpScript);
    }else{
        var xhr;
        if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
            xhr=new XMLHttpRequest();
        }else{// code for IE6, IE5
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }

        //当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数
        if(opt.async){
            xhr.onreadystatechange=function(e){
                response(e);
            };
        }

        switch(opt.type.toUpperCase()){
            case 'GET':
                xhr.open('GET', opt.url+(opt.data==''?'':('?'+opt.data)),opt.async);
                setRequestHeader(xhr, opt);
                xhr.send(null);
                break;
            case 'POST':
                xhr.open('POST', opt.url, opt.async);
                //如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头
                setRequestHeader(xhr, opt);

                //设置默认请求头
                if(opt.contentType) {
                    xhr.setRequestHeader("Content-type", opt.contentType);
                }

                xhr.send(opt.data);
                break;
        }

        //当您使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可
        if(!opt.async){
            response();
        }

        function response(e){
            if (xhr.readyState==4){
                if(xhr.status==200) {
                    successCallback(getResponseData(opt.dataType, xhr));
                }else{
                    errorCallback(xhr.status, xhr.statusText, e);
                }
            }
        }
    }

    return promise;
}

/**
 * 返回并格式化数据
 * @param type
 * @param xhr
 * @returns {*}
 */
function getResponseData(type, xhr){
    switch(type){
        case 'json':
            return JSON.parse(xhr.responseText);
        case 'xml':
            return xhr.responseXML;
        default:
            return xhr.responseText;
    }
}

/**
 * 设置HTTP header
 * 它应该包含在通过后续 send() 调用而发布的请求中。这个方法只有当 readyState 为 1 的时候才能调用，例如，在调用了 open() 之后，但在调用 send() 之前
 * @param xhr
 * @param opt
 */
function setRequestHeader(xhr, opt){
    if(opt.headers){
        for(var header in opt.headers){
            xhr.setRequestHeader(header, opt.headers[header]);
        }
    }
}

module.exports = ajax;