import $$financeModel from '../../script/data/model/finance.js'

module.exports = {
    data: function () {
        return {
            dialogVisible: false,
            paying: false
        }
    },
    methods: {
        checkCharge: function () {
            var _this = this;
            $$financeModel.getChargeResult({
                flowNum: _this.dialog.flowNum
            }, function(res) {
                _this.dialog.dialogVisible = false;
                if (res.getChargeResult.code === '200') {
                    _this.rechargeAlertShow(0, '支付完成');
                } else {
                    _this.rechargeAlertShow(1, '支付失败');
                }
            });
        },
        toIe: function () {
            this.dialog.paying = true;
            this.dialog.text = '正在支付中，请耐心等待...';
        },
        toOther: function () {
            this.dialog.paying = true;
            this.dialog.text = '正在支付中，请耐心等待...';
            window.open(this.dialog.openLink);
        }
    },
    beforeMount: function () {
    }
};