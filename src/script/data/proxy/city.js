var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('city', {
        url: '//house-sv-base.focus.cn/city/list',
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
                cityOptions: '${city.data}'
            }
        });
        fn(data);
    });
};
