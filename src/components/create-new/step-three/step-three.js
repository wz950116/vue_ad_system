var _ = require('../../../lib/underscore.v1.8.3.js');
var $$model_create = require('../model-create.js');
var $$util = require('../../../lib/util.js');

module.exports = {
    name: 'step-three',
    components: {
        'alert': require('../../alert/alert')
    },
    data: function() {
        return {
            treeLoading: false,
            dateRange: '',
            alert: {
                show: false,
                message: '',
                status: 0
            },
            payForm: {
                orderName: '',
                costType: 1,
                limit: -1,
                bid: '',
                longTime: true,
                startDate: '',
                endDate: '',
                cityIds: [],
                areaLimit: '0'
            },
            payFormRules: {},
            limitType: 1,
            floorPrice: 0.3,
            defaultProps: {
                children: 'cityList',
                label: 'name'
            },
            treeData: [],
            chooseCity: []
        }
    },
    computed: {
        restCity: function() {
            return 200 - this.chooseCity.length;
        },
        getPayFormLimit: {
            get: function() {
                return this.payForm.limit === -1 ? 0 : this.payForm.limit;
            },
            set: function(val) {
                if(val == 0) return;
                this.payForm.limit = val;
            }
        }
    },
    watch: {
        payForm: {
            deep: true,
            handler: function(val) {
                var _this = this;
                if (_this.$parent.cpm) {
                    // 新建广告单元调用
                    _.extend(_this.$parent.cpm, _this.payForm);
                } else {
                    // 编辑广告单元调用
                    _.extend(_this.$parent.$parent.cpm, _this.payForm);
                }
            }
        },
        'payForm.areaLimit': {
            deep: true,
            handler: function(val) {
                if (val === '0') {
                    this.chooseCity = [];
                }
            }
        },
        'payForm.longTime': {
            deep: true,
            handler: function(val) {
                this.payForm.startDate = '';
                this.payForm.endDate = '';
            }
        },
        dateRange: function(val) {
            var _this = this;
            if (typeof(val) == 'undefined'  || !val[0]) {
              _this.payForm.startDate = '';
              _this.payForm.endDate = '';
            } else {
              if (val.length) {
                  _this.payForm.startDate = $$util.dateFormat(val[0], 'yyyy-MM-dd hh:mm:ss');
                  _this.payForm.endDate = $$util.dateFormat(val[1], 'yyyy-MM-dd hh:mm:ss');
              } else if (val) {
                  _this.payForm.startDate = $$util.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                  _this.payForm.endDate = '';
              }
            }
        },
        limitType: function(val) {
            if (val === 1) {
                this.payForm.limit = -1;
            }
        },
        chooseCity: function(val) {
            this.payForm.cityIds = _.pluck(val, 'id');
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

        addCity: function() {
            var _this = this,
                nodes = _this.$refs.tree.getCheckedNodes(true);
            if (nodes.length > _this.restCity) {

                _this.toastShow(1, '最多只能选200个城市');

                return;
            }
            nodes.forEach(function(item) {
                if (!_.some(_this.chooseCity, function(it) {
                        return item.id === it.id
                    })) {
                    _this.chooseCity.push(item);
                }
            });
        },
        delCity: function(index) {
            this.chooseCity.splice(index, 1);
        }
    },
    beforeMount: function() {
        var _this = this;
        _this.treeLoading = true;
        $$model_create.getProvinceList(function(res) {
            _this.treeLoading = false;
            if (res.code === '200') {
                _this.treeData = res.data;
            } else {

                _this.toastShow(1, res.msg);

            }
        });

        // 如果是非编辑模式
        if (_this.$parent.cpm) {
            $$model_create.getFloorPrice({ resourceId: _this.$parent.cpm.resourceId }, function(res) {
                if (res.code === '200') {
                    _this.floorPrice = parseFloat(res.data);
                } else {

                    _this.toastShow(1, res.msg);

                }
            });
        }
    }
};
