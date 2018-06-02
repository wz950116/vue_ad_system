var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').getDomain;

module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('xian', {
        url: $$domain('house-sv-base', true) + '/city/v_district',
        type: 'GET',
        data: params,
        withCredentials: false,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '200',
            msg: '',
            data: {
                xianOptions: '${xian.data}'
            }
        });
        fn(data);
    });
};
