var $$model_ad = require('../../../script/data/model/ad.js');
var $$model_create = require('../model-create.js');
var $$util = require('../../../lib/util.js');

module.exports = {
    name: 'cpd-create-unit',
    data: function () {
        return {
            visible: false,
            loading: false,
            tableData: [],
            availableMoney: 0,//总账户金额
            cashAvailableMoney: 0,//现金账户金额
            creditAvailableMoney: 0,//信用账户余额
            totalNotHotCost: 0,//非热门资源总金额
            totalHotCost: 0,//热门资源总金额
            totalCost: 0,//订单总计金额
            grantCost: 0,//赠款账户抵扣金额
            isChild: '1',
            useBalance: 0//使用余额
        }
    },
    filters: {
        moneyFormat: $$util.moneyFormat
    },
    methods: {
        toastShow: function (status, msg) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = msg;
            _this.alert.show = true;
            window.setTimeout(function () {
                _this.alert.show = false;
            }, 1000);
        },
        floatSub: function (v1, v2) {
            // 精确浮点运算
            var add = function(v1, v2) {
                var r1, r2, m;
                try {
                    r1 = v1.toString().split(".")[1].length;
                }
                catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = v2.toString().split(".")[1].length;
                }
                catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));
                return (v1 * m + v2 * m) / m;
            };
            return add(v1, -v2);
        },
        dateTitle: function (dateList) {
            var title = '';
            dateList.forEach(function (item) {
                title += item + '\n';
            });
            return title;
        },
        validate: function () {
            var that = this;
            var reg = /^(([1-9]+[0-9]*.{1}[0-9]{0,2})|([0].{1}[1-9]{0,2})|([1-9][0-9]*)|([0])|([0][.][0-9]{0,2}))$/; // 判断金额的正则
            //扣除抵扣需要支付金额
            var needPay = that.floatSub(that.totalCost,that.grantCost);
            var maxBalance = that.availableMoney*1 >= needPay ? needPay : that.availableMoney;
            if (!reg.test(that.useBalance)) {
                setTimeout(function () {
                    that.useBalance = that.useBalance.slice(0,that.useBalance.length-1);
                },0);
                return;
            }
            if (parseFloat(that.useBalance) > parseFloat(maxBalance)) {
                setTimeout(function () {
                    that.useBalance = parseFloat(maxBalance);
                },0);
            }
        }
    },
    computed: {
        restMoney: function () {
            var needPay = this.floatSub(this.totalCost,this.grantCost);
            return this.floatSub(needPay,this.useBalance);
        }
    }
};