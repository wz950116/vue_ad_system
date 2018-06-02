var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (oparams, fn) {
    var params = $$match(oparams, {
        "company": "${name}",
        "type": 2,
        "businessLicenceCode": "${license_number}",
        "businessLicenceUrl": "${license_image}"
    });

    params.type = parseInt(params.type, 10);
    params.areaCode = parseInt(params.areaCode, 10);
    $$combiner.clear();
    $$combiner.push('a', {
        url: $$domain + '/client/new',
        type: 'POST',
        contentType: 'application/json',
        data: params
    });
    $$combiner.request(function (bdata) {
        fn(bdata.a);
    });
};
