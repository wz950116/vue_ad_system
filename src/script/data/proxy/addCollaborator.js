var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/collaborator/add/' + cid;
    } else {
        url = $$domain + '/collaborator/add';
    }
    $$request.ajax({
        url: url,
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};
