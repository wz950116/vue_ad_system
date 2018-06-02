var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/upload/image/qualification/' + cid;
    } else {
        url = $$domain + '/upload/image/qualification';
    }
    $$combiner.clear();
    $$combiner.push('qualificationUpload', {
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
                QualificationList: ['${qualification.data.items}', {
                    qId: '${id}',
                    qImgUrl: '${url}',
                    qDes: '${name}'
                }]
            }
        });
        fn(data);
    });
};
