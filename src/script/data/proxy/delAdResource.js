var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function (params, fn) {
    var routerPath = window.vueRouter.app._route;
    var cid = !!(routerPath.params.cid) ? '/' + routerPath.params.cid : '';
    $$request.ajax({
        url: $$domain + '/spreading/delAdResource' + cid,
        type: 'POST',
        data: params,
        contentType: 'application/json',
        withCredentials: true,
        complete: function (data) {
            fn(data);
        }
    });
};
