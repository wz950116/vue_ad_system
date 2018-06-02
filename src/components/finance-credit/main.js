var $$financeModel = require('../../script/data/model/finance.js');
var $$headerModel = require('../../script/data/model/header.js');
var alert = require('../alert/alert');
module.exports = {
    data: function() {
        return {
            alert: {
                show: false,
                message: '提交成功！',
                status: 0
            },
            creditLine: '',
            minimumPayment: '',
            hint: '',
            spendAmount: '',
            canUse: '',
            status: '',
            show: false,
            value: true,
            width: 200,
            placement: 'right',
            chargelayer: false,
            chargeshow: false,
            chargeText: "正在充值",
        }
    },
    components: {
        'alert': alert
    },
    beforeMount: function() {
        this.getCreditInfo();
    },
    methods: {
        getCreditInfo: function() {
            var _this = this;
            $$financeModel.getCreditInfo({}, function(res) {
                if (res.code == 200) {
                    _this.creditLine = res.data.creditLine;
                    _this.minimumPayment = res.data.minimumPayment;
                    _this.hint = res.data.hint;
                    _this.canUse = res.data.canUse;
                    _this.status = res.data.status;
                    _this.spendAmount = res.data.spendAmount;

                } else　 {
                    _this.alertShow(1, res.msg);
                }
            });
        },
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        submit: function() {
            var _this = this;
            $$financeModel.setRepayment({ amount: this.minimumPayment }, function(res) {
                if (res.code == "200" && res.data.flowNum) {
                    openNum = 0;
                    if (openNum === 0) {
                        window.open(res.data.url);
                        openNum = 1;
                    }
                    var timer = setInterval(function() {
                        $$financeModel.getChargeResult({
                            flowNum: "" + res.data.flowNum
                        }, function(res) {
                            if (res.getChargeResult.data.status === "1" || res.getChargeResult.data.status === "2") {
                                clearInterval(timer);
                                debugger;
                                _this.chargelayer = true;
                                _this.chargeshow = true;
                                _this.chargeText = res.getChargeResult.msg;
                                _this.getCreditInfo();
                            }
                        });
                    }, 2000);

                } else {
                    _this.alertShow(1, res.msg);

                }
            })
        },
        chargeCancel: function() {
            this.getCreditInfo();
            this.chargelayer = false;
            this.chargeshow = false;
        }
    }


}
