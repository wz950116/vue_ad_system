var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/demander/info/account/' + cid;
    } else {
        url = $$domain + '/demander/info/account';
    }
    $$combiner.clear();
    $$combiner.push('getAccountInfo', {
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
                companyName: '${getAccountInfo.data.basicInfo.company}',
                accountType: '${getAccountInfo.data.basicInfo.type}',
                societyCreditCode: '${getAccountInfo.data.basicInfo.businessLicenceCode}',
                logMobile: '${getAccountInfo.data.basicInfo.loginMobilePhone}',
                contactManName: '${getAccountInfo.data.contactInfo.contactName}',
                contactMobile: '${getAccountInfo.data.contactInfo.mobile}',
                contactQq: '${getAccountInfo.data.contactInfo.qq}',
                contactMail: '${getAccountInfo.data.contactInfo.email}',
                contactAddress: '${getAccountInfo.data.contactInfo.address}',
                salesInfo: '${getAccountInfo.data.salesInfo}',
                status: '${getAccountInfo.data.basicInfo.status}'
            }
        });
        fn(data);
    });
};
