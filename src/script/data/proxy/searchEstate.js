var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/estate/search/' + cid;
    } else {
        url = $$domain + '/estate/search';
    }
    $$combiner.clear();
    $$combiner.push('province', {
        url: url,
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '200',
            msg: '',
            data: {
                list: '${province.data.list}'
            },
            totalPages: '${province.data.totalPages}'
        });
        fn(data);
    });
};
