var $$model_create = require('./model-create.js');
var $$util = require('../../lib/util.js');
var $$customer = require('../../script/data/model/customer.js');
module.exports = {
    name: 'create-new',
    props: {
        choosedPlanName: String,
        choosedPlanId: String
    },
    components: {
        // cpm相关
        'alert': require('../alert/alert'),
        'step-one': require('./step-one/step-one.vue'),
        'step-two': require('./step-two/step-two.vue'),
        'step-three': require('./step-three/step-three.vue'),
        // cpd相关
        'create-resource': require('../create-resource/create-resource.vue'), // (老模块，没有需求不建议动)
        'cpd-create-unit': require('./cpd-create-unit/cpd-create-unit.vue'),
        'cpd-buy-list': require('./cpd-buy-list/cpd-buy-list.vue')
    },
    data: function() {
        return {
            loading: false,
            name: 'create-new',
            display: false,
            step: 1,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            cpm: {
                planId: '',
                costType: 1, //0:CPD 1:CPM
                resourceId: '',
                startDate: '',
                longTime: false,
                orderName: '',
                limit: '',
                areaLimit: '0', // 0代表不限，1代表自定义
                bid: '',
                supportType: 'estate',
                estateId: '',
                linkType: 0,
                link: '',
                liveId: '',
                cityIds: [],
                orderId: ''
            },
            cpd: {
                resourceNum: 0,
                orderIds: [],
                flowNum: 0
            },
            result: '',
            toCheckout: '',
            payStatus:0
        }
    },
    methods: {
        toastShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },

        addStep: function() {
            var _this = this,
                cpm = _this.cpm,
                $stepOne = _this.$refs.stepOne;
            switch (_this.step) {
                case 1:
                    if (parseFloat($stepOne.adPlan.availableMoney) <= 0) {
                        _this.toastShow(1, '计划预算余额不足，请调整');
                        return;
                    }
                    if (cpm.costType === 1) {
                        _this.validateCpmBaseInfo();
                    } else {
                        _this.validateCpdBaseInfo();
                    }
                    break;
                case 2:
                    if (cpm.costType === 1) {
                        _this.validateCpmChooseResource();
                    } else {
                        _this.validateCpdChooseResource();
                    }
                    break;
                case 3:
                    if (cpm.costType === 1) {
                        _this.validateCpmCreateUnit();
                    } else {
                        _this.validateCpdPay();
                    }
                    break;
            };
        },
        validateCpdBaseInfo: function() {
            var _this = this,
                $stepOne = _this.$refs.stepOne;
            _this.loading = true;
            $$model_create.checkPlan({ id: parseInt(_this.cpm.planId) }, function(res) {
                _this.loading = false;
                if (res.code === '200') {
                    if (res.data && res.data.status === '1') {
                        _this.step++;
                    } else {
                        _this.$confirm(res.msg, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function() {
                            _this.loading = true;
                            $$model_create.delUnPayedOrders(function(res) {
                                _this.loading = false;
                                _this.step++;
                            });
                        }).catch(function() {

                        });
                    }
                } else {
                    _this.toastShow(1, res.msg);
                }
            });
        },
        validateCpmBaseInfo: function() {
            var _this = this,
                cpm = _this.cpm,
                message = '';
            // 校验cpm基本信息
            if (!cpm.planId) {
                message = '请选择推广计划';
            }

            if (cpm.supportType === 'estate') {
                if (cpm.linkType === 1 && !cpm.link) {
                    message = '请输入楼盘自定义页面';
                }

                if (!cpm.estateId) {
                    message = '请选择楼盘';
                }
            }

            if (cpm.supportType === 'live') {
                if (!cpm.liveId) {
                    message = '请输入直播ID';
                }
            }

            if (cpm.supportType === 'news') {
                if (!cpm.link) {
                    message = '请输入文章资讯链接';
                }
            }

            if (cpm.supportType === 'forum') {
                if (!cpm.link) {
                    message = '请输入论坛链接';
                }
            }

            if (message !== '') {

                _this.toastShow(1, message);

                return;
            }
            var params = {
                supportType: cpm.supportType
            };

            if (params.supportType === 'estate') {
                params.estateId = cpm.estateId
            } else if (params.supportType === 'live') {
                params.liveId = cpm.liveId;
            } else {
                params.link = cpm.link;
            }

            _this.loading = true;
            $$model_create.checkSupportType(params, function(res) {
                _this.loading = false;
                if (res.code === '200') {
                    _this.step++;
                } else {
                    _this.toastShow(1, res.msg);
                }
            });
        },
        validateCpmChooseResource: function() {
            var _this = this,
                cpm = _this.cpm,
                message = '';

            if (!cpm.resourceId) {
                message = '请选择广告资源';
            }

            if (message !== '') {
                _this.toastShow(1, message);
                return;
            }
            _this.step++;
        },
        validateCpmCreateUnit: function() {
            var _this = this,
                cpm = _this.cpm,
                message = '';
            if (!cpm.startDate) {
                message = '请设定投放日期';
            }

            if (!cpm.orderName) {
                message = '请输入广告单元名称';
            }

            if (_this.$refs.stepThree.limitType === 2) {
                if (parseFloat(cpm.limit) < 100 || !/^[-+]?\d*$/.test(parseFloat(cpm.limit))) {
                    message = '广告日限额只能是大于100的整数';
                }
            }

            if (parseFloat(cpm.bid) < _this.$refs.stepThree.floorPrice) {
                message = '出价不能小于' + _this.$refs.stepThree.floorPrice + '元';
            }

            if (!cpm.bid) {
                message = '请输入广告出价';
            }

            if (message !== '') {
                _this.toastShow(1, message);
                return;
            }

            _this.loading = true;
            $$model_create.createCpmOrder(_this.cpm, function(res) {
                _this.loading = false;
                _this.step++;
                if (res.code === '200') {
                    _this.cpm.orderId = res.data.orderId;
                    // 这里需要得到id方便跳转
                    _this.result = '创建成功';
                    // $$customer.getAdPlanInfo({
                    //     id: parseInt(_this.cpm.planId)
                    // }, function(data){
                    // });
                } else {
                    _this.toastShow(1, res.msg);
                    _this.result = '添加失败';
                }
            });
        },
        validateCpdChooseResource: function() {
            var _this = this,
                $cpdCreateUnit = _this.$refs.cpdCreateUnit;
            if (_this.cpd.orderIds.length === 0) {
                _this.toastShow(1, "请选择广告位");
            } else {
                // console.log(_this.cpd.orderIds);
                _this.loading = true;
                $$model_create.startPay({ orderIds: _this.cpd.orderIds }, function(res) {
                    _this.loading = false;
                    if (res.code === '200') {
                        if (res.data.isChild === '1' && res.data.isInWhiteList !== '1') {
                            //如果是 子客 且 不是白名单用户 进入金额大小判断
                            if (parseFloat(res.data.totalHotCost) > parseFloat(res.data.availableMoney)) {
                                //如果 热门资源花费 > 现金余额 ，则提示，不进入 确认支付环节
                                _this.toastShow(1, '子客热门资源价格超出账户现金可用余额！');
                                return;
                            } else if (parseFloat(res.data.totalCost) > _this.floatSub(res.data.availableMoney,res.data.grantAvailableMoney)) {
                                //如果 总计花费 > 现金余额 + 赠款账户余额，不进入 确认支付环节
                                _this.toastShow(1, '子客总计价格超出账户可用余额！');
                                return;
                            }
                        }
                        // if (res.data.isChild === '1' && (parseFloat(res.data.totalCost) > parseFloat(res.data.availableMoney))) {
                        //     //如果是 子客 且 不是白名单用户 且 热门资源花费 > 现金余额 ，则提示，不进入 确认支付环节
                        //     _this.toastShow(1, '子客总计价格超出账户可用余额！');
                        //     return;
                        // }
                        $cpdCreateUnit.tableData = res.data.list;
                        $cpdCreateUnit.totalCost = res.data.totalCost;
                        $cpdCreateUnit.availableMoney = res.data.availableMoney;
                        $cpdCreateUnit.cashAvailableMoney = res.data.cashAvailableMoney;
                        $cpdCreateUnit.creditAvailableMoney = res.data.creditAvailableMoney;
                        $cpdCreateUnit.totalNotHotCost = res.data.totalNotHotCost;
                        $cpdCreateUnit.totalHotCost = res.data.totalHotCost;
                        $cpdCreateUnit.grantCost = res.data.grantCost;
                        $cpdCreateUnit.isChild = res.data.isChild;
                        $cpdCreateUnit.useBalance = res.data.availableMoney >= res.data.totalCost ? res.data.totalCost : res.data.availableMoney;;
                        _this.step++;
                    } else {
                        _this.toastShow(1, res.msg);
                    }
                });
            }
        },
        // cpd支付逻辑
        validateCpdPay: function() {
            var _this = this,
                $cpdCreateUnit = _this.$refs.cpdCreateUnit,
                useBalance = $cpdCreateUnit.useBalance,
                reg = /^(([1-9]+[0-9]*.{1}[0-9]{1,2})|([0].{1}[1-9]{1,2})|([1-9][0-9]*)|([0])|([0][.][0-9]{1,2}))$/, // 判断金额的正则
                totalCost = parseFloat($cpdCreateUnit.totalCost),
                inputPrice = parseFloat(useBalance),
                availableMoney = parseFloat($cpdCreateUnit.availableMoney),
                message = '';
            if (availableMoney === 0) {
                useBalance = 0.00;
            } else if (!reg.test(useBalance)) {
                message = '请输入正确的金额(小数点后最多两位)';
            }

            if (inputPrice > totalCost) {
                message = '输入金额超出余额';
                return;
            }

            if (message !== '') {
                _this.toastShow(1, message);
                return;
            }
            _this.loading = true;
            $$model_create.pay({ orderIds: _this.cpd.orderIds, useBalance: parseFloat(useBalance) }, function(res) {
                _this.loading = false;
                _this.step++;
                if (res.code === '200') {
                    if (res.data && res.data.url) {
                        // 跳转第三方支付逻辑
                        _this.result = '支付中...';
                        _this.cpd.flowNum = res.data.flowNum;
                        $$util.newWin(res.data.url);
                    } else {
                        // 支付完成
                        _this.result = '创建成功';
                        _this.payStatus = 1; //支付完成
                    }
                } else {
                    _this.toastShow(1, res.msg);
                    _this.result = '支付失败';
                }
            });
        },
        checkPay: function() {
            var _this = this;
            $$model_create.getPayResult({ flowNum: _this.cpd.flowNum }, function(res) {
                if (res.code === '200') {
                    _this.result = '支付完成';
                } else {
                    _this.toastShow(1, res.msg);
                    _this.result = '支付失败';
                }
            });
        },

        // 点击查看已采购资源
        goAdunit: function() {
            var _this = this;
            if (_this.$route.path.indexOf("agent") != -1) {
                if (_this.$parent.name === 'create') {
                    // 通过新建推广计划跳转到所有推广计划
                    _this.$router.push({
                        name: 'agent_prom_all'
                    });
                    _this.$parent.cancel();
                } else {
                    _this.$parent.display = false;
                    if (_this.cpm.costType === 0){
                        _this.$router.push({
                            name: "agent_prom_unit",
                            params: {
                                uid: _this.cpd.orderIds[0],
                                pid: _this.cpm.planId
                            }
                        })
                    } else if (_this.cpm.costType === 1){
                        _this.$router.push({
                            name: "agent_prom_unit",
                            params: {
                                uid: _this.cpm.orderId,
                                pid: _this.cpm.planId
                            }
                        })
                    }
                    window.location.reload();
                }
            } else if (_this.$route.path.indexOf("customer") != -1) {
                if (_this.$parent.name === 'create') {
                    // 通过新建推广计划跳转到所有推广计划
                    _this.$router.push({
                        name: 'cust_prom_all'
                    });
                    _this.$parent.cancel();
                } else {
                    _this.$parent.display = false;
                    if (_this.cpm.costType === 0){
                        _this.$router.push({
                            name: "cust_prom_unit",
                            params: {
                                uid: _this.cpd.orderIds[0],
                                pid: _this.cpm.planId
                            }
                        })
                    } else if (_this.cpm.costType === 1){
                        _this.$router.push({
                            name: "cust_prom_unit",
                            params: {
                                uid: _this.cpm.orderId,
                                pid: _this.cpm.planId
                            }
                        })
                    }
                    window.location.reload();
                }
            }
            
        },
        // 点击完成跳转
        complete: function(){

            if (this.payStatus === 1) {
                this.$parent.display = false;
                if (this.$route.path.indexOf('agent') > -1) {
                    this.$router.push({
                        name: "agent_prom_plan",
                        params: {
                            pid: this.cpm.planId
                        }
                    });
                    window.location.reload();
                }
            }else{
                this.checkPay();
            }
        },
        //两小数相加
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
            return add(v1, v2);
        },

        // 订阅已选资源列表数量的改变
        setListNum: function (num) {
            this.cpd.resourceNum = parseInt(num);
        }
    },
    mounted: function() {
        var $refs = this.$refs;
        $($refs.createContent).css('max-height', $(window).height() - $($refs.createNewHeader).height() - 100 + 'px');
    }
};
