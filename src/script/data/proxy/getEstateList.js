var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/estate/list/' + cid;
    } else {
        url = $$domain + '/estate/list';
    }
    $$combiner.clear();
    $$combiner.push('getEstateList', {
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
                estateList: '${getEstateList.data.items}',
                totalPages: '${getEstateList.data.totalPages}',
                totalCount: '${getEstateList.data.totalCount}'
            }
        });
        fn(data);
    });
};
