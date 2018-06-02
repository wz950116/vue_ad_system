var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var _ = require('../../../lib/underscore.v1.8.3.js');

var model = new $$model({});

var cache = {
    loading: false
};

_.extend(model, {
    setValue: function (key, val) {
        if (!cache.hasOwnProperty(key)) {
            throw 'error key!';
        }

        cache[key] = val;
        model.trigger('setValue', { key: key, value: val });
    },
    routerChange: function () {
        model.trigger('routerChange');
    }
});

module.exports = model;
