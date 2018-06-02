var $$model_create = require('../model-create.js');
var $$customer = require('../../../script/data/model/customer.js');
var $$util = require('../../../lib/util.js');
var _ = require('../../../lib/underscore.v1.8.3.js');

module.exports = {
    name: 'step-one',
    props: {
        planId: {
            default: '-1',
            type: String
        }
    },
    data: function() {
        return {
            addPlanDialogShow: false,
            adPlan: {
                loading: false,
                budget_total: '',
                availableMoney: '',
                desc: ''
            },
            adPlanRules: {},
            type: 'day',
            alert: {
                show: false,
                message: '',
                status: 0
            },
            planList: [],
            estateList: [],
            form: {
                planId: '',
                costType: 0, //0:CPD 1:CPM
                supportType: 'estate',
                estateId: '',
                linkType: 0,
                link: '',
                liveId: '' // 直播
            }
        }
    },
    components: {
        'alert': require('../../alert/alert'),
        promotionPlanCreate: require('../../promotion-plan-create/promotion-plan-create.vue')
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

        addEstate: function() {
            var cid = $$util.getCid();
            if (cid) {
                $$util.newWin('/index.html#/agent' + cid + '/settings/estate');
            } else {
                $$util.newWin('/index.html#/customer/settings/estate');
            }
        },
        toggle: function() {
            this.addPlanDialogShow = !this.addPlanDialogShow;
        },
        submitCreatePlan: function() {
            var _this = this,
                planForm = this.$refs.createPlanRef.planForm;
            var params = {
                name: planForm.name,
                budget: planForm.budget,
                desc: planForm.desc
            };
            $$customer.createAdPlan(params, function(res) {
                if (res.code === '200') {
                    _this.planList.push({
                        name: params.name,
                        id: res.data.id
                    });
                    _this.form.planId = res.data.id;
                    _this.addPlanDialogShow = false;
                } else {

                    _this.toastShow(1, res.msg);

                }
            });
        },
        preview: function() {
            var _this = this,
                supportType = _this.form.supportType,
                params = {
                    supportType: supportType
                };
            if (supportType === 'live') {
                params.liveId = _this.form.liveId;
            } else if (supportType === 'estate') {
                params.estateId = _this.form.estateId;
                params.link = _this.form.link;
                if (_this.form.linkType === 1) {
                    $$util.newWin(_this.form.link);
                    return;
                };
            } else if (supportType === 'web') {
                 _this.form.link = _this.form.link.indexOf("http://") < 0 ? (_this.form.link.indexOf("https://") < 0 ? "https://" + _this.form.link : _this.form.link) : _this.form.link 
                _this.form.link = _this.form.link.replace(/\s*/g, "");

                $$model_create.checkoutUrl({
                    'url': _this.form.link
                }, res => {
                    if (res.msg !== "success") {
                        return;
                    } else {
                        $$util.newWin(_this.form.link);
                        return;
                    }
                })
                return;
            } else {
                $$util.newWin(_this.form.link);
                return;
            }

            $$model_create.getAutoContent(params, function(res) {
                if (res.code === '200') {
                    var url = supportType === 'estate' ? res.data.link : res.data.urls.pc;
                    $$util.newWin(url);
                } else {
                    _this.toastShow(1, res.msg);
                }
            });
        },

        // 验证URL是否合法
        checkoutUrl () {
            var params = {
                'url': this.form.link
            };
            $$model_create.checkoutUrl(params, res => {
                if (res.msg !== "success") {
                    this.$message(res.msg);
                    return;
                }
            })
        }
    },
    watch: {
        'form.planId': {
            deep: true,
            handler: function(planId) {
                var _this = this;
                planId = parseInt(planId);
                _this.adPlan.loading = true;
                $$model_create.getAdPlanInfo({ id: planId }, function(res) {
                    _this.adPlan.loading = false;
                    if (res.code === '200') {
                        _this.adPlan.budget_total = res.data.budget_total;
                        _this.adPlan.availableMoney = res.data.budget_total - res.data.budget_cost;
                        _this.adPlan.desc = res.data.desc;
                    } else {
                        _this.toastShow(1, res.msg);
                    }
                });
            }
        },
        'form.supportType': {
            deep: true,
            handler: function() {
                this.form.link = '';
            }
        },
        form: {
            deep: true,
            handler: function(form) {
                var _this = this;
                _.extend(_this.$parent.cpm, _this.form);
            }
        }
    },
    filters: {
        moneyFormat: $$util.moneyFormat
    },
    beforeMount: function() {
        var _this = this;
        _this.adPlan.loading = true;
        $$model_create.getPlanList(function(res) {
            _this.adPlan.loading = false;
            if (res.code === '200') {
                _this.planList = res.data;
                if (res.data.length) {
                    if (_this.planId !== '-1') {
                        _this.form.planId = _this.planId;
                    } else {
                        _this.form.planId = res.data[0].id;
                    }
                }
            } else {
                _this.toastShow(1, res.msg);

            }
        });

        $$model_create.getEstateList(function(res) {
            if (res.code === '200') {
                _this.estateList = res.data.linkInfo.estate.estateList;
            } else {
                _this.toastShow(1, res.msg);
            }
        });
    }
};
