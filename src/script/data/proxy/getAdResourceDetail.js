var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$util = require('../../../lib/util.js');


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('getAdResourceDetail', {
        url: $$domain + '/spreading/getAdResourceDetail' + $$util.getCid(),
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '${getAdResourceDetail.code}',
            msg: '${getAdResourceDetail.msg}',
            data: {
                list: '${getAdResourceDetail.data}'
            }
        });
        fn(bdata.getAdResourceDetail);
    });
};
