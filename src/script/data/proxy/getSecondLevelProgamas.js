var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$util = require('../../../lib/util.js');



module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('getSecondLevelProgamas', {
        url: $$domain + '/spreading/getSecondLevelProgamas' + $$util.getCid(),
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });

    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '${getSecondLevelProgamas.code}',
            msg: '${getSecondLevelProgamas.msg}',
            data: {
                current: [],
                list: '${getSecondLevelProgamas.data.list}'
            }
        });
        fn(data);
    });
};
