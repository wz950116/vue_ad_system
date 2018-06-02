var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function (params, fn) {
    $$combiner.clear();
    var url = '/upload/image/res/' + params.orderId;
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
                    url: '${url}',
                    md5: '${md5}',
                    width: '${width}',
                    height: '${height}',
                    file_type: '${file_type}',
                    size: '${size}'
                }]
            }
        });
        fn(data);
    });
};
