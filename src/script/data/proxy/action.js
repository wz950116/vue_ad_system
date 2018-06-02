var combine = require('../../../lib/combine.js');

var init = function (url, params, fn) {
    var request = [{
        url: '/city/list',
        method: 'Post',
        params: params
    }];

    combine(request, function (data) {
        fn(data);
    });
};

module.export = init;
