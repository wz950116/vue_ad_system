var $$ad = require('../../script/data/model/ad');
var _ = require('../../lib/underscore.v1.8.3.js');
var $$util = require('../../lib/util.js');

module.exports = {
    props: {
        choosedPlanName: {
            type: String,
            default: ''
        },
        choosedPlanId: {
            type: Number,
            default: -1
        }
    },
    data: function () {
        return {
            planId: 0,
            name: 'create',
            confirm: {
                show: false,
                msg: ''
            },
            alert: {
                show: false,
                message: 'xxx',
                status: 1
            },
            order: {
                delaySecond: 60,
                submitDelay: false,
                totalPrice: '0',
                availableMoney: "0",
                phoneNum: 'xxxxxxxx',
                authCode: '',
                useMoney: '',
                flowNum: '',
                isChild: 0
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
        status: function (val) {
            var status = 1;
            if (val === 3) {
                // 初始化余额和验证码
                this.order.authCode = '';
            }

            if (val === 4) {
                status = 3;
            } else if (val === 5) {
                status = 2;
            } else {
                status = 1;
            }
            // 1：支付成功 2：支付失败 3：:待验证支付结果
            this.$refs.createResult.status = status;
        }
    },
    filters: {
        dateFormat: function (value) {
            var i, str = '';
            value = value.toString();
            for (i = 0; i < value.length; i++) {
                if (i === 3) {
                    str += value[i] + '/';
                } else if (i === 5){
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
        restMoney: function () {
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
            // 减法
            var sub = function (v1, v2) {
                return add(v1, -v2);
            };
            var totalPrice = parseFloat(this.order.totalPrice),
                inputPrice = parseFloat(this.order.useMoney),
                availableMoney = parseFloat(this.order.availableMoney),
                rest = sub(totalPrice, inputPrice);
            if(availableMoney == 0) {
                this.order.useMoney = 0.00; 
                inputPrice = parseFloat(this.order.useMoney);
            }
            if (totalPrice - inputPrice >= 0 && inputPrice > 0 || inputPrice > availableMoney){
                return rest.toString();
            } else {
                if(availableMoney == 0) {
                   this.order.useMoney = 0.00; 
                } else {
                    if (inputPrice != 0 ) {
                       this.order.useMoney = ''; 
                    } 
                }
                return totalPrice.toString();
            }
        },
        resourceListLength: function () {
            return this.resourceList.selected.length;
        },
        isSelectedAll: function () {
            return (this.resourceList.list.length === this.resourceList.selected.length && this.resourceList.selected.length !== 0);
        },
        resourceTotalPrice: function () {
            var total = 0,  _this = this;;
            this.resourceList.selected.forEach(function (item) {
                _this.resourceList.list.forEach(function (it) {
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
        'confirm': require('../confirm/confirm'),
        'create-result': require('../create-result/create-result'),
        'create-plan': require('../create-plan/create-plan')
    },
    methods: {
        delChooseResource: function (index) {
            var _this = this;
            var orderId = _this.resourceList.list[index].orderId;
            $$ad.delAdResource({orderId: [parseInt(orderId)]}, function (data) {
                if (data.code === '200') {
                    _this.toast(0, '删除成功');
                    _this.resourceList.selected.splice(_this.resourceList.selected.indexOf(orderId), 1);
                    _this.resourceList.list.splice(index, 1);
                } else {
                    _this.toast(0, '删除失败');
                }
            });
        },
        payDone: function () {
            this.$parent.hide();
            this.status = 1;
            window.location.reload();
        },
        back: function () {
            this.status = 3;
        },
        confirmOk: function () {
            var _this = this;
            $$ad.clearCurrentResource(function (data) {
                if (data.code === '200') {
                    _this.status++;
                    _this.confirm.show = false;
                } else {
                    _this.toast(data.msg || '清空失败');
                }
            });
        },
        confirmCancel: function () {
            this.confirm.show = false;
        },
        next: function () {
            var _this = this;
            _this.planId = parseInt(_this.$refs.createPlan.data.current.id);
            $$ad.verifyCurrentPlan({
                planId: parseInt(_this.$refs.createPlan.data.current.id)
            }, function (data) {
                if (data.code === '200') {
                    if (data.data && data.data.status === '1' ) {
                        _this.status++;
                    } else {
                        //confirm
                        _this.confirm.msg = data.msg;
                        _this.confirm.show = true;
                    }
                } else {
                    _this.toast(1, '网络错误')
                }
            });
        },
        cancel: function () {
            this.status = 1;
            this.$parent.hide();
        },
        pay: function () {
            var reg = /^(([1-9]+[0-9]*.{1}[0-9]{1,2})|([0].{1}[1-9]{1,2})|([1-9][0-9]*)|([0])|([0][.][0-9]{1,2}))$/, // 判断金额的正则
                totalPrice = parseFloat(this.order.totalPrice),
                inputPrice = parseFloat(this.order.useMoney),
                _this = this,
                availableMoney = parseFloat(this.order.availableMoney);
            if (availableMoney == 0) {
                this.order.useMoney = 0.00;
            } else if (!reg.test(this.order.useMoney)) {
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
            var orderIds = _.map(_this.resourceList.selected, function (item) {
                return parseInt(item);
            });
            $$ad.pay({
                orderIds: orderIds,
                // token: _this.order.authCode.toString(),
                useBalance: parseFloat(_this.order.useMoney)
            });
        },
        verifyPayResult: function () {
            var _this = this;
            $$ad.getPayResult({
                flowNum: _this.order.flowNum
            }, function (data) {
                if (data.code === '200') {
                    _this.status = 6;
                } else {
                    _this.status = 5;
                }
            });
        },
        sendAuthCode: function () {
            $$ad.getPayAuthCode();
        },
        prev: function () {
            this.status--;
        },
        selectSingle: function (orderId, ind) {
            var index = this.resourceList.selected.indexOf(orderId);
            if (index >= 0) {
                this.resourceList.selected.splice(index, 1);
                this.resourceList.list[ind].selected = 'false';
            } else {
                this.resourceList.selected.push(orderId);
                this.resourceList.list[ind].selected = 'true';
            }
        },
        selectAll: function () {
            var _this = this;
            var flag = this.isSelectedAll;
            this.resourceList.selected.splice(0, this.resourceList.selected.length);
            this.resourceList.list.forEach(function (item) {
                if (flag) {
                    item.selected = 'false';
                } else {
                    item.selected = 'true';
                    _this.resourceList.selected.push(item.orderId);
                }
            });
        },
        toggleList: function () {
            var display = this.resourceList.display;
            display ? this.resourceList.display = false : this.resourceList.display = true;
        },
        sureOrder: function () {
            var orderIds = _.map(this.resourceList.selected, function (item) {
                return parseInt(item);
            });
            var _this = this;
            if (orderIds.length === 0) {
                this.toast(1, '请选择广告资源')
            } else {
                $$ad.createAdUnit({orderId: orderIds}, function (data) {
                    if (data.code === '200') {
                        if (parseFloat(data.data.isChild) === 1 && (parseFloat(data.data.totalPrice) > parseFloat(data.data.availableMoney))) {
                            //如果是 子客 并且 总计价格 > 余额，则提示，不进入 确认支付环节
                            _this.toast(1, '子客总计价格超出账户可用余额！');
                            return
                        }
                        _this.order.totalPrice = parseFloat(data.data.totalPrice);
                        _this.order.availableMoney = parseFloat(data.data.availableMoney);
                        _this.order.phoneNum = data.data.phoneNum;
                        _this.status = 3;
                        _this.order.useMoney = _this.order.availableMoney >= _this.order.totalPrice ? _this.order.totalPrice : _this.order.availableMoney;
                        _this.restMoney = _this.order.availableMoney >= _this.order.totalPrice ? 0 : _this.order.totalPrice - _this.order.availableMoney;
                        _this.order.isChild = parseFloat(data.data.isChild);

                    } else {
                        _this.toast(1, data.msg || '创建订单失败')
                    }
                });
            }
        },
        toast: function (status, msg) {
            var _this = this;
            this.alert.status = status;
            this.alert.message = msg;
            this.alert.show = true;
            window.setTimeout(function () {
                _this.alert.show = false;
            }, 1500);
        }
    },
    beforeMount: function () {
        var _this = this;
        $$ad.on('getAdResourceList', function (data) {
            if (data.code === '200') {
                _this.resourceList.selected.splice(0, _this.resourceList.selected.length);
                data.data.list.forEach(function (item) {
                    item.selected = 'true';
                    _this.resourceList.selected.push(item.orderId);
                });
                _this.resourceList.list = data.data.list;
                _this.resourceList.quota = data.data.quota;
            } else {

            }
        });

        $$ad.getAdResourceList();

        $$ad.on('getPayAuthCode', function (data) {
            var timmer;
            if (data.code === '200') {
                _this.toast(0, data.msg || '验证码已成功发送到您的手机');
                _this.order.submitDelay = true;
                _this.order.delaySecond = 60;
                timmer = window.setInterval(function () {
                    _this.order.delaySecond --;
                    if (_this.order.delaySecond === 0) {
                        window.clearInterval(timmer);
                        _this.order.submitDelay = false;
                    }
                }, 1000);
            } else {
                _this.toast(1, data.msg || '验证码发送失败');
            }
        });

        $$ad.on('pay', function (data) {
            if (data.code === '200') {
                if (data.data && data.data.url) {
                    // 跳转第三方支付逻辑
                    _this.status = 4;
                    _this.order.flowNum = data.data.flowNum;
                    window.open(data.data.url);
                } else {
                    // 支付完成
                    _this.status = 6;
                }
            } else {
                _this.toast(1, data.msg || '网络错误');
                // _this.status = 5;
            }
        });
    }
};