var $$model = require('../../../lib/model.js'),
    $$app = require('../../app.js'),
    _ = require('../../../lib/underscore.v1.8.3.js'),
    $$assert = require('../../../lib/assert.js');
var city = {
    getProvince: function (fn) {
        $$app.getApi('/api/province.json', { status: 1 }, function (data) {
            fn(data);
        });
    },
    getCity: function (province, fn) {
        $$app.getApi('/api/city.json', { provinceId: province }, function (data) {
            fn(data);
        });
    },
    getXian: function (city, fn) {
        $$app.getApi('/api/xian.json', { cityId: city }, function (data) {
            fn(data);
        });
    },
    getBusiness: function (xian, fn) {
        $$app.getApi('/api/business.json', { districtId: xian }, function (data) {
            fn(data);
        });
    }
};

module.exports = city;
