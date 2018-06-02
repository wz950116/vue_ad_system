var $$combiner = require('../../lib/combiner.js');
var $$match = require('../../lib/match.js');
var $$domain = require('../../script/config.js').domain;

module.exports = function(params, fn) {
	var url = $$domain + '/recharge/add';
	$$combiner.clear();
	$$combiner.push('submitChargeApply', {
		url: url,
		type: 'POST',
		contentType: 'application/json',
		data: params
	});
	$$combiner.request(function(bdata) {
		fn(bdata.submitChargeApply);
	})
}
