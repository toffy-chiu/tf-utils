var ajax = require('../src/lib/ajax');
var Mock = require('mockjs');
Mock.mock('http://localhost:3006?type=1', {
    "data|3-6": [{
        "id": "@increment",
        "name": "@cname"
    }]
});

ajax({
    url: 'http://localhost:3006',
    data: {
        type: 1
    },
    success: function (json) {
        console.log(json);
    }
}).done(function(){
    console.log('done', arguments);
});