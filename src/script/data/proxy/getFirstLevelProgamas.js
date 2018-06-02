var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$util = require('../../../lib/util.js');

module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('getFirstLevelProgamas', {
        url: $$domain + '/spreading/getFirstLevelProgamas' + $$util.getCid(),
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });

    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '200',
            msg: '${getFirstLevelProgamas.data.msg}',
            data: {
                current: '${getFirstLevelProgamas.data.current}',
                currentName: '一级栏目',
                list: '${getFirstLevelProgamas.data.list}'
            }
        });
        fn(data);
    });
};
