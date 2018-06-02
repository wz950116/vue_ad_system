var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function(params, fn) {
    $$combiner.clear();
    $$combiner.push('userInfo', {
        url: $$domain + '/user/info/header',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.push('demanderInfo', {
        url: $$domain + '/demander/info/header',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.push('msg', {
        url: $$domain + '/message/getMessageNum',
        type: 'POST',
        contentType: 'application/json',
        data: {
            status: 0
        }
    });
    $$combiner.request(function(bdata) {
        var data = $$match(bdata, {
            code: '${userInfo.code}',
            msg: 'success',
            data: {
                companyId: 'NULL',
                companyName: '${demanderInfo.data.company}',
                vipLevel: '${demanderInfo.data.level}',
                vipStatus: '${demanderInfo.data.status}',
                userRole: '${userInfo.data.info.roleDescription}',
                accountId: '${userInfo.data.info.userName}',
                noticeNum: '${msg.data.num}',
                userStatus: '${demanderInfo.code}',
                userType: '${demanderInfo.data.type}',
                userdemander: '${demanderInfo.data.demander}',
                userRoleName: '${userInfo.data.info.roleName}'
            }
        });

        fn(data);
    });
};
