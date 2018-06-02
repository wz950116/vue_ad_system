/**
 * 公共方法
 */

exports.queryString = function (obj) {
    var str = '';
    if (typeof obj === 'object' && !obj.length) {
        for (var k in obj) {
            str += '&' + k + '=' + obj[k];
        }
        str = str.substr(1);
        return str;
    } else {
        return str;
    }
};
exports.arrToObject = function (arr, keyName, valName) {
    var obj = {};
    arr.forEach(function (item, i) {
        if (item instanceof Object && item.hasOwnProperty(keyName) && item.hasOwnProperty(keyName)) {
            obj[item[keyName]] = item[valName];
        }
    });
    return obj;
};


exports.dateToString = function (dateString, isDetail) {
    var rt = '';

    if (!dateString) {
        return rt;
    }

    try {
        var date = new Date(dateString);
        if (!date.valueOf()) {
            date = new Date(parseInt(dateString, 10));
            if (!date.valueOf()) {
                return rt;
            }
        }

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();

        rt = y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d);
        if (isDetail) {
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            rt += ' ' + (h >= 10 ? h : '0' + h) + ':' + (min >= 10 ? min : '0' + min) + ':' + (s >= 10 ? s : '0' + s);
        }
    } catch (e) {
    }

    return rt;
};


exports.arrToString = function (arr) {
    if (!arr) return '';
    return arr.join(',');
};


exports.objArrToString = function (arr, key) {
    if (!arr || !arr.length) return '';
    var array = [];
    arr.forEach(function (item) {
        array.push(item[key]);
    });
    return array.join(',');
};


exports.toString = function (val) {
    if (val === undefined || val === null || val === NaN || !val.toString) return '';
    return val.toString();
};


exports.toStringPlus = function (data, keys) {
    if (data instanceof Object !== true || typeof keys !== 'string') {
        return;
    }

    keys = keys.split(':');

    keys.forEach(function (item) {
        if (data.hasOwnProperty(item) && data[item] !== undefined && data[item].toString) {
            data[item] = data[item].toString();
        }
    });
};


exports.stringToArray = function (str, sp) {
    if (typeof str !== 'string' || typeof sp !== 'string') {
        return;
    }
};

exports.booleanToNum = function (obj) {
    if (obj) {
        return 1;
    } else {
        return 0;
    }
};

exports.formateParams = function (data) {
    var params = 'params=';
    return params + encodeURIComponent(JSON.stringify(data));
};

exports.strToArray = function (data) {
    if (data) return data.split(',');
    else return [];
};

exports.strToKeyArr = function (data, key) {
    if (data) return data.split(key);
    return [];
};

exports.dateToNum = function (from, to) {
    var dateFrom = new Date(from);
    var dateTo = new Date(to);

    return parseInt((dateTo - dateFrom) / 86400000, 10);
};

exports.arrObjToarr = function (obj, key, fn) {
    var arr = [];
    if (obj && obj.length) {
        obj.forEach(function (item) {
            if (typeof fn === 'function') {
                arr.push(fn(item[key]));
            } else {
                arr.push(item[key]);
            }
        });
    }

    return arr;
};

exports.getFullLength = function (str) {
    if (typeof str != 'string') {
        return 'wrong type'
    }
    var len = str.length;
    var fullLen = 0;
    for (var i = 0; i < len; i++) {
        var code = str.charCodeAt(i);
        if (code > 255) {
            fullLen += 1;
        } else {
            fullLen += 0.5;
        }
    }
    return Math.ceil(fullLen);
};
