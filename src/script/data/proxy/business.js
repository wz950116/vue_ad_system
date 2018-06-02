var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').getDomain;

module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('business', {
        url: $$domain('house-sv-base', true) + '/city/district/circles',
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
                businessOptions: '${business.data}'
            }
        });
        fn(data);
    });
};
