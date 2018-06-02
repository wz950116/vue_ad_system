var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');
var $$moment = require('../../../lib/moment.js');

module.exports = function (params, fn) {
    var newParams = {
        start_date: $$moment(parseInt(params.startDate)).format('YYYY-MM-DD'),
        end_date: $$moment(parseInt(params.endDate)).format('YYYY-MM-DD'),
        order_id: parseInt(params.orderId),
        sub_order_name: params.name,
        child_guest_id: parseInt(params.companyId),
        plan_id: parseInt(params.planId),
        date_list: params.dateList.map(function(item){
            return $$moment(parseInt(item)).format('YYYY-MM-DD')
        })
    };
    $$request.ajax({
        url: $$domain + '/spreadManage/createDistribution',
        type: 'POST',
        data: newParams,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};