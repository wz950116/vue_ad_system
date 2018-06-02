var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$util = require('../../../lib/util.js');


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('getScreenIndice', {
        url: $$domain + '/spreading/getScreenIndice' + $$util.getCid(),
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });

    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '${getScreenIndice.code}',
            msg: '${getScreenIndice.msg}',
            data: {
                current: [],
                list: '${getScreenIndice.data.list}'
            }
        });
        fn(data);
    });
};
