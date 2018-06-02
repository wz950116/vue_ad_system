var match = function (bdata, maps) {
    var fnGetVal = function (data, key) {
        var v = data;
        var k;
        var keys = key.match(/^\$\{(.*)\}$/)[1];
        keys = keys.split('.');
        do {
            k = keys.shift();
            v = v[k];
        } while (keys.length > 0 && (v instanceof Array !== true && v instanceof Object === true));
        if (v instanceof Array === true) {
            return v;
        }
        if (v instanceof Object === true) {
            return JSON.stringify(v);
        }
        if (v === undefined || v === null) {
            return '';
        }
        return v.toString();
    };

    var fnWalkArray = function (arr) {
        if (arr.length !== 2) {
            return;
        }

        var dataList = arr[0];
        var mapsTmpl = arr[1];

        var i, val, data, maps;
        for (i = 0; i < dataList.length; i++) {
            val = dataList[i];
            maps = JSON.parse(JSON.stringify(mapsTmpl));
            data = fnWalkObject(val, maps);
            arr[i] = maps;
            arr.length = i + 1;
        }
    };

    var fnWalkObject = function (data, maps) {
        var key, val;
        for (key in maps) {
            if (maps.hasOwnProperty(key)) {
                val = maps[key];
                if (val instanceof Array === true) {
                    (function () {
                        if (typeof val[0] !== 'string' || !val[0].match(/^\$\{(.*)\}$/)) {
                            return;
                        }
                        var arr = fnGetVal(data, val[0]);
                        if (arr instanceof Array === true) {
                            val[0] = arr;
                            fnWalkArray(val);
                        }
                    }());
                    continue;
                }
                if (val instanceof Object === true) {
                    fnWalkObject(data, val);
                    continue;
                }
                if (typeof val !== 'string') {
                    maps[key] = val.toString();
                    continue;
                }
                if (val.match(/^\$\{(.*)\}$/)) {
                    maps[key] = fnGetVal(data, val);
                    continue;
                }
            }
        }
    };

    var data = JSON.parse(JSON.stringify(maps));

    if (data instanceof Object === true) {
        fnWalkObject(bdata, data);
    }

    return data;
};

module.exports = match;
