var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('msgCnut', {
        url: $$domain + '/message/getMessageNum',
        type: 'POST',
        contentType: 'application/json',
        data: {
            status: params.status
        }
    });
    $$combiner.push('msg', {
        url: $$domain + '/message/getMessage',
        type: 'POST',
        contentType: 'application/json',
        data: params
    });
    $$combiner.request(function (bdata) {
        var data = $$match(bdata, {
            code: '200',
            msg: 'success',
            noticeNum: '${msgCnut.data.num}',
            data: {
                list: '${msg.data.list}'
            }
        });

        fn(data);
    });
};
