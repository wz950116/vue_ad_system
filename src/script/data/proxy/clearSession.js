var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;

module.exports = function (fn) {
    $$combiner.clear();
    $$combiner.push('clearSession', {
        url: $$domain + '/user/logout',
        type: 'POST',
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '200',
            msg: '',
            data: data
        });
        fn(data);
    });
};
