var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    params.status = parseInt(params.status);

    $$request.ajax({
        url: $$domain + '/spreadManage/getDistributableOrderList',
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            var res = $$match(data, {
                code: '${code}',
                msg: '${msg}',
                data: {
                    list: '${data}'
                }
            });

            fn(res);
        }
    });
};
