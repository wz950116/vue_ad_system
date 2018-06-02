var $$ad = require('../../script/data/model/ad');
var _ = require('../../lib/underscore.v1.8.3.js');
var $$util = require('../../lib/util.js');

module.exports = {
    data: function() {
        return {
            name: 'purchase',
            alert: {
                show: false,
                message: 'xxx',
                status: 1
            },
            order: {
                delaySecond: 60,
                submitDelay: false,
                totalPrice: 0, //订单总计金额
                availableMoney: 0, //总账户金额
                cashAvailableMoney: 0, //现金账户金额
                creditAvailableMoney: 0, //信用账户余额
                totalNotHotCost: 0, //非热门资源总金额
                totalHotCost: 0, //热门资源总金额
                grantCost: 0, //赠款账户抵扣金额
                phoneNum: 'xxxxxxxx',
                authCode: '',
                useMoney: '',
                flowNum: ''
            },
            status: 1,
            resourceList: {
                display: false,
                selected: [],
                quota: '13345',
                list: []
            }
        }
    },
    watch: {
        status: function(val) {
            var status = 1;
            if (val === 2) {
                // 初始化余额和验证码
                this.order.authCode = '';
            }

            if (val === 3) {
                status = 3;
            } else if (val === 4) {
                status = 2;
            } else {
                status = 1;
            }
            // 1：支付成功 2：支付失败 3：:待验证支付结果
            this.$refs.createResult.status = status;
        }
    },
    filters: {
        dateFormat: function(value) {
            var i, str = '';
            value = value.toString();
            for (i = 0; i < value.length; i++) {
                if (i === 3) {
                    str += value[i] + '/';
                } else if (i === 5) {
                    str += value[i] + '/';
                } else {
                    str += value[i];
                }
            }
            return str;
        },
        moneyFormat: $$util.moneyFormat
    },
    computed: {
        restMoney: function() {
            var needPay = this.floatSub(this.order.totalPrice,this.order.grantCost);
            return this.floatSub(needPay,this.order.useMoney);
        },
        resourceListLength: function() {
            return this.resourceList.selected.length;
        },
        isSelectedAll: function() {
            return (this.resourceList.list.length === this.resourceList.selected.length && this.resourceList.selected.length !== 0);
        },
        resourceTotalPrice: function() {
            var total = 0,
                _this = this;;
            this.resourceList.selected.forEach(function(item) {
                _this.resourceList.list.forEach(function(it) {
                    it.orderId === item ? total += parseFloat(it.totalPrice) : undefined;
                });
            });
            return total.toString();
        }
    },
    components: {
        'create-resource': require('../create-resource/create-resource'),
        'create-unit': require('../create-unit/create-unit'),
        'alert': require('../alert/alert'),
        'create-result': require('../create-result/create-result')
    },
    methods: {
        delChooseResource: function(index) {
            var _this = this;
            var orderId = _this.resourceList.list[index].orderId;
            $$ad.delAdResource({ orderId: [parseInt(orderId)] }, function(data) {
                if (data.code === '200') {
                    _this.toast(0, '删除成功');
                    _this.resourceList.selected.splice(_this.resourceList.selected.indexOf(orderId), 1);
                    _this.resourceList.list.splice(index, 1);
                } else {
                    _this.toast(0, '删除失败');
                }
            });
        },
        payDone: function() {
            this.status = 1;
            window.location.reload();
        },
        back: function() {
            this.status = 2;
        },
        pay: function() {
            var reg = /^(([1-9]+[0-9]*.{1}[0-9]{1,2})|([0].{1}[1-9]{1,2})|([1-9][0-9]*)|([0])|([0][.][0-9]{1,2}))$/, // 判断金额的正则
                totalPrice = parseFloat(this.order.totalPrice),
                inputPrice = parseFloat(this.order.useMoney),
                _this = this;

            if (!reg.test(this.order.useMoney)) {
                this.toast(1, '请输入正确的金额(小数点后最多两位)');
                return;
            }

            if (inputPrice > totalPrice) {
                this.toast(1, '输入金额超出余额');
                return;
            }
            // if (this.order.authCode === '') {
            //     this.toast(1, '请输入验证码');
            //     return;
            // }
            var orderIds = _.map(_this.resourceList.selected, function(item) {
                return parseInt(item);
            });
            $$ad.pay({
                orderIds: orderIds,
                // token: _this.order.authCode.toString(),
                useBalance: parseFloat(_this.order.useMoney)
            });
        },
        verifyPayResult: function() {
            var _this = this;
            $$ad.getPayResult({
                flowNum: _this.order.flowNum
            }, function(data) {
                if (data.code === '200') {
                    _this.status = 5;
                } else {
                    _this.status = 4;
                }
            });
        },
        sendAuthCode: function() {
            $$ad.getPayAuthCode();
        },
        prev: function() {
            this.status--;
        },
        selectSingle: function(orderId, ind) {
            var index = this.resourceList.selected.indexOf(orderId);
            if (index >= 0) {
                this.resourceList.selected.splice(index, 1);
                this.resourceList.list[ind].selected = 'false';
            } else {
                this.resourceList.selected.push(orderId);
                this.resourceList.list[ind].selected = 'true';
            }
        },
        selectAll: function() {
            var _this = this;
            var flag = this.isSelectedAll;
            this.resourceList.selected.splice(0, this.resourceList.selected.length);
            this.resourceList.list.forEach(function(item) {
                if (flag) {
                    item.selected = 'false';
                } else {
                    item.selected = 'true';
                    _this.resourceList.selected.push(item.orderId);
                }
            });
        },
        toggleList: function() {
            var display = this.resourceList.display;
            display ? this.resourceList.display = false : this.resourceList.display = true;
        },
        sureOrder: function() {
            var orderIds = _.map(this.resourceList.selected, function(item) {
                return parseInt(item);
            });
            var _this = this;
            if (orderIds === 0) {
                this.toast(1, '请选择广告资源')
            } else {
                $$ad.createAdUnit({ orderId: orderIds }, function(data) {
                    if (data.code === '200') {
                        _this.order.totalPrice = parseFloat(data.data.totalPrice);
                        _this.order.availableMoney = parseFloat(data.data.availableMoney);
                        _this.order.cashAvailableMoney = parseFloat(data.data.cashAvailableMoney);
                        _this.order.creditAvailableMoney = parseFloat(data.data.creditAvailableMoney);
                        _this.order.totalNotHotCost = parseFloat(data.data.totalNotHotCost);
                        _this.order.totalHotCost = parseFloat(data.data.totalHotCost);
                        _this.order.grantCost = parseFloat(data.data.grantCost);
                        _this.order.phoneNum = data.data.phoneNum;
                        _this.status = 2;
                        _this.order.useMoney = _this.order.availableMoney >= _this.order.totalPrice ? _this.order.totalPrice : _this.order.availableMoney;
                        _this.restMoney = _this.order.availableMoney >= _this.order.totalPrice ? 0 : _this.order.totalPrice - _this.order.availableMoney;
                    } else {
                        _this.toast(1, data.msg || '创建订单失败')
                    }
                });
            }
        },
        toast: function(status, msg) {
            var _this = this;
            this.alert.status = status;
            this.alert.message = msg;
            this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 1000);
        },
        dateTitle(dateList) {
            var title = "";
            dateList.forEach(function(item) {
                title += item + "\n";
            })
            return title;
        },
        //精确浮点数运算
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
        validate: function () {
            var that = this;
            var reg = /^(([1-9]+[0-9]*.{1}[0-9]{0,2})|([0].{1}[1-9]{0,2})|([1-9][0-9]*)|([0])|([0][.][0-9]{0,2}))$/; // 判断金额的正则
            //扣除抵扣需要支付金额
            var needPay = that.floatSub(that.order.totalPrice,that.order.grantCost);
            var maxBalance = that.order.availableMoney*1 >= needPay ? needPay : that.order.availableMoney;
            if (!reg.test(that.order.useMoney)) {
                setTimeout(function () {
                    that.order.useMoney = that.order.useMoney.slice(0,that.order.useMoney.length-1);
                },0);
                return;
            }
            if (parseFloat(that.order.useMoney) > parseFloat(maxBalance)) {
                setTimeout(function () {
                    that.order.useMoney = parseFloat(maxBalance);
                },0);
            }
        }
    },
    beforeMount: function() {
        var _this = this;
        $$ad.on('getAdResourceList', function(data) {
            if (data.code === '200') {
                _this.resourceList.selected.splice(0, _this.resourceList.selected.length);
                data.data.list.forEach(function(item) {
                    item.selected = 'true';
                    _this.resourceList.selected.push(item.orderId);
                });
                _this.resourceList.list = data.data.list;
                _this.resourceList.quota = data.data.quota;
            } else {

            }
        });
        $$ad.getAdResourceList();

        $$ad.on('createAdUnit', function(data) {
            if (data.code === '200') {
                _this.order.totalPrice = data.data.totalPrice;
                _this.order.availableMoney = data.data.availableMoney;
                _this.order.phoneNum = data.data.phoneNum;
                _this.status = 2;
            } else {
                _this.toast(1, data.msg || '创建订单失败')
            }
        });

        $$ad.on('getPayAuthCode', function(data) {
            var timmer;
            if (data.code === '200') {
                _this.toast(0, data.msg || '验证码已成功发送到您的手机');
                _this.order.submitDelay = true;
                _this.order.delaySecond = 60;
                timmer = window.setInterval(function() {
                    _this.order.delaySecond--;
                    if (_this.order.delaySecond === 0) {
                        window.clearInterval(timmer);
                        _this.order.submitDelay = false;
                    }
                }, 1000);
            } else {
                _this.toast(1, data.msg || '验证码发送失败');
            }
        });

        $$ad.on('pay', function(data) {
            if (data.code === '200') {
                if (data.data && data.data.url) {
                    // 跳转第三方支付逻辑
                    _this.status = 3;
                    _this.order.flowNum = data.data.flowNum;
                    window.open(data.data.url);
                } else {
                    // 支付完成
                    _this.status = 5;
                }
            } else {
                _this.toast(1, data.msg || '网络错误');
                // _this.status = 4;
            }
        });
    }
};