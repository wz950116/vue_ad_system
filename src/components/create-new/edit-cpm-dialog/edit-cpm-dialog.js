var $$model_create = require('../model-create.js');
var $$util = require('../../../lib/util.js');
var _ = require('../../../lib/underscore.v1.8.3.js');

module.exports = {
    name: 'edit-cpm-dialog',
    components: {
        'cpm-step-three': require('../step-three/step-three.vue'),
        'alert': require('../../alert/alert')
    },
    data: function() {
        return {
            dialogVisible: false,
            id: 0,
            loading: false,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            cpm: {
                orderName: '',
                costType: 1,
                limit: -1,
                areaLimit: '0', // 0代表不限，1代表自定义
                bid: '',
                longTime: true,
                startDate: '',
                endDate: '',
                cityIds: [],
                resourceId: ''
            }
        }
    },
    watch: {
        dialogVisible: function(val) {
            var _this = this;
            if (val === true) {
                _this.loading = true;
                $$model_create.getCpmOrder({ id: _this.id }, function(res) {
                    _this.loading = false;
                    if (res.code === '200') {
                        if (res.data.longTime === 'true') {
                            res.data.longTime = true;
                            _this.$refs.cpmStepThree.dateRange = new Date(parseInt(res.data.startDate));
                            delete res.data.startDate;
                        } else {
                            res.data.longTime = false;
                            _this.$refs.cpmStepThree.dateRange = [new Date(parseInt(res.data.startDate)), new Date(parseInt(res.data.endDate))];
                            delete res.data.startDate;
                            delete res.data.endDate;
                        }
                        res.data.costType = 1;
                        if (parseFloat(res.data.limit) > 0) {
                            _this.$refs.cpmStepThree.limitType = 2;
                        }
                        _.extend(_this.$refs.cpmStepThree.payForm, res.data);
                        _this.$refs.cpmStepThree.chooseCity = res.data.cityList;
                        _this.loading = true;
                        $$model_create.getFloorPrice({ resourceId: res.data.resourceId }, function(res) {
                            _this.loading = false;
                            if (res.code === '200') {
                                _this.$refs.cpmStepThree.floorPrice = parseFloat(res.data);
                            } else {

                                _this.toast(1, res.msg);
                            }
                        });
                    } else {
                        _this.toastShow(1, res.msg);
                    }
                });
            }
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

        save: function() {
            var _this = this,
                cpm = _this.cpm,
                message = '',
                params = { orderId: _this.id };
            if (!cpm.startDate) {
                message = '请设定投放日期';
            }

            if (!cpm.orderName) {
                message = '请输入广告单元名称';
            }

            if (_this.$refs.cpmStepThree.limitType === 2) {
                if (parseFloat(cpm.limit) < 100 || !/^[-+]?\d*$/.test(parseFloat(cpm.limit))) {
                    message = '广告日限额只能是大于100的整数';
                }
            }

            if (parseFloat(cpm.bid) < _this.$refs.cpmStepThree.floorPrice) {
                message = '出价不能小于' + _this.$refs.cpmStepThree.floorPrice + '元';
            }

            if (!cpm.bid) {
                message = '请输入广告出价';
            }

            if (message !== '') {


                _this.toastShow(1, message);

                return;
            }
            _this.loading = true;
            $$model_create.editCpmOrder(_.extend(params, _this.cpm), function(res) {
                _this.loading = false;
                if (res.code === '200') {
                    window.location.reload();
                } else {

                    _this.toastShow(1, res.msg);

                }
            });
        }
    }
};
