var $$financeModel = require('../../script/data/model/finance.js');
var alert = require('../alert/alert');
module.exports = {
    data: function() {
        return {
            width: 250,
            width1: 220,
            showText: false,
            completed: '',
            totaldays: '',
            remainDay: '',
            target: '',
            completeDegree: 0,
            spendDay: 0,
            fuck: 12,
            alert: {
                show: false,
                message: '提交成功！',
                status: 0
            }
        }
    },
    components: {
        'alert': alert
    },

    filters: {
        moneyFormat: function(money) {
            if (/[^0-9\.]/.test(money)) return '0.00';
            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + money.replace(/^\./, "0.");
        }
    },
    beforeMount: function() {
        var _this = this;
        $$financeModel.getTaskInfo({}, function(res) {

            if (res.code == 200) {
                _this.totaldays = res.data.totaldays;
                _this.completed = res.data.completed;
                _this.remainDay = res.data.remainDay;
                _this.target = res.data.target;
                _this.completeDegree = Number(((_this.completed / _this.target) * 100).toFixed(2));
                _this.spendDay = Number(((_this.totaldays - _this.remainDay) / _this.totaldays * 100).toFixed(2));



            } else　 {
                _this.alertShow(1, res.msg);
            }
        });


    },
    methods: {
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },


    }


}
