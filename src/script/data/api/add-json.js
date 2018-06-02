var fs = require('fs');
var path = require('path');


var jsonArr = [
    'searchAdResource',
    'getInitAdResourceSelect',
    'getSecondLevelProgamas',
    'getAdResourceDetail',
    'addAdResource',
    'delAdResource',
    'getAdResourceList',
    'createAdUnit',
    'getOrderDetail',
    'getPayAuthCode',
    'pay',
    'getPayResult'
];

var tpl = fs.readFileSync(path.join(__dirname, './demo.tpl'), 'utf8');


var addJSON = function (name) {
    if (fs.existsSync(path.join(__dirname, name + '_params.json'))) {
        console.log(name + '.json have already exists!' );
        return;
    }
    fs.writeFileSync(path.join(__dirname, name + '_params.json'), tpl);
    console.log(name + '.json has added')
};

jsonArr.forEach(function (item) {
    addJSON(item);
});
