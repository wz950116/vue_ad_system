var $$model_ad = require('../../../script/data/model/ad.js');
var $$model_create = require('../model-create.js');
var $$util = require('../../../lib/util.js');
var _ = require('../../../lib/underscore.v1.8.3.js');

module.exports = {
    name: 'cpd-buy-list',
    data: function() {
        return {
            visible: false,
            loading: false,
            tableData: [],
            quota: 0,
            totalCount: 0,
            alert: {
                show: false,
                message: '',
                status: 0
            },
        }
    },
    components: {
        'alert': require('../../alert/alert'),
    },
    filters: {
        moneyFormat: $$util.moneyFormat
    },
    computed: {
        selectedAll: function() {
            var tableData = this.tableData,
                len = tableData.length,
                num = 0,
                value = false;
            tableData.forEach(function(item) {
                if (item.selected === true) {
                    num++;
                }
            });
            if (len === num && len !== 0) {
                value = true
            }
            return value;
        },
        totalCount: function() {
            var price = 0;
            this.tableData.forEach(function(item) {
                if (item.selected === true) {
                    price += parseInt(item.totalPrice);
                }
            });
            return price;
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

        search: function() {
            var _this = this;
            _this.loading = true;
            $$model_create.getAdResourceList(function(res) {
                _this.loading = false;
                if (res.code === '200') {
                    res.data.list.forEach(function(item) {
                        item.selected = true;
                    });
                    _this.tableData = res.data.list;
                    _this.quota = res.data.quota;
                    _this.$parent.cpd.resourceNum = _this.tableData.length;
                } else {

                    _this.toastShow(1, res.msg);
                }
            });
        },
        delRow: function(index, row) {
            var _this = this;
            _this.$confirm('是否删除此订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function() {
                _this.loading = true;
                $$model_create.delAdResource({ orderIds: [parseInt(row.orderId)] }, function(res) {
                    _this.loading = false;
                    if (res.code === '200') {
                        _this.toastShow(0, '删除成功');
                        _this.tableData.splice(index, 1);
                    } else {
                        _this.toastShow(1, res.msg);
                    }
                });
            }).catch(function() {});
        },
        doSelectAll: function() {
            if (this.selectedAll === true) {
                this.tableData.forEach(function(item) {
                    item.selected = false;
                });
            } else {
                this.tableData.forEach(function(item) {
                    item.selected = true;
                });
            }
            this.toggleSelect();
        },
        dateTitle: function (dateList) {
            var title = '';
            dateList.forEach(function (item) {
                title += item + '\n';
            });
            return title;
        },
        toggleSelect: function (item) {
            if (item) {
                item.selected = !item.selected;
            }
            var num = 0, arr = [];
            this.tableData.forEach(function (i) {
                if (i.selected) {
                    num++;
                    arr.push(i.orderId);
                }
            });
            this.$emit('showListNum', num);
            this.$parent.cpd.orderIds = arr;
        }
    },
    watch: {
        visible: function(val) {
            var _this = this;
            if (val === true) {
                _this.search();
            }
        },
        tableData: function(val) {
            var filterArr = _.filter(val, function(item) {
                item.orderId = parseInt(item.orderId);
                return item.selected = true;
            });
            this.$parent.cpd.orderIds = _.pluck(filterArr, 'orderId');
        }
    },
    beforeMount: function() {
        var _this = this;
        $$model_ad.on('addAdResource', function(res) {
            if (res.code === '200') {
                _this.search();
            } else {
                _this.toastShow(1, res.msg);
            }
        });
        _this.search();
    }
};
