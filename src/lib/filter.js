var whiteList = [
    /user\/info\/header$/,
    /demander\/info\/header$/,
    /message\/getMessageNum$/,
    /spreading\/getPayResult$/,
    /spreading\/getAdPlanInfo$/,
    /headPage\/agent\/quotaAlloc$/,
    /client\/username\/verify$/,
    /city\/list$/,
    /city\/v_district$/,
    /city\/district\/circles$/
];
var errorList = [];
var timer;

var filter = function (data, url) {
    var item, i;
    if (data.code !== '200') {
        for (i = 0; i < whiteList.length; i++) {
            item = whiteList[i];
            if (url.match(item)) {
                return;
            }
        }
        errorList.push(url);
        window.clearTimeout(timer);
        timer = setTimeout(function () {
            if (!errorList.length) {
                return;
            }
            alert('服务器错误！\n' + errorList.join('\n'));
        }, 500);
    }
};

module.exports = filter;
