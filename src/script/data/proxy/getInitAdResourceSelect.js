var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');
var $$util = require('../../../lib/util.js');


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('getInitAdResourceSelect', {
        url: $$domain + '/spreading/getInitAdResourceSelect' + $$util.getCid(),
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });

    $$combiner.request(function (bdata) {
        fn(bdata.getInitAdResourceSelect);
    });
};
