var $$model_create = require('../model-create.js');
var $$util = require('../../../lib/util.js');
var _ = require('../../../lib/underscore.v1.8.3.js');

module.exports = {
    name: 'step-two',
    data: function() {
        var _this = this;
        return {
            loading: false,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            searchParams: {
                platformType: ''
            },
            platFormList: [],
            adPlanRules: {},
            type: 'day',
            tableData: [],
            resourceId: '',
            previewPos: []
        }
    },
    components: {
        'alert': require('../../alert/alert')
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

        tableClick: function(row, event, column) {
            console.log(row);
        },
        changePos: function(type, index_ad) {
            var length = this.tableData[index_ad].preview.preview.length;
            if (length <= 3) return;
            if (type === 'left') {
                if (this.previewPos[index_ad] < 0) {
                    var newVal = this.previewPos[index_ad] + 1;
                    this.previewPos.splice(index_ad, 1, newVal);
                }
            } else {
                if (this.previewPos[index_ad] > 3 - length) {
                    var newVal = this.previewPos[index_ad] - 1;
                    this.previewPos.splice(index_ad, 1, newVal);
                }
            }
        },
        expandShow: function(index){
            var _this = this;
            if(_this.tableData[index]["expand"]){
                _this.tableData[index]["expand"] = false;
                return;
            }
            _this.tableData.forEach(function(item){
                item["expand"] = false;
            });
            _this.tableData[index]["expand"] = true;
        }
    },
    watch: {
        'searchParams.platformType': {
            deep: true,
            handler: function(val) {
                var _this = this;
                _this.loading = true;
                $$model_create.getCPMResourceListByPlatForm({ platformType: val, supportType: _this.$parent.cpm.supportType }, function(res) {
                    _this.loading = false;
                    if (res.code === '200') {
                        res.data.forEach(function(item) {
                            item.expand = false;
                        });
                        _this.tableData = res.data;
                        for (var i = 0, len = _this.tableData.length; i < len; i++) {
                            _this.previewPos.push(0);
                        }
                    } else {

                        _this.toastShow(1, res.msg);

                    }
                });
            }
        },
        resourceId: function(val) {
            var _this = this;
            _.extend(_this.$parent.cpm, { resourceId: val });
        }
    },
    beforeMount: function() {
        var _this = this;
        $$model_create.getPlatFormList(function(res) {
            if (res.code === '200') {
                _this.platFormList = res.data;
                if (res.data.length) {
                    _this.searchParams.platformType = res.data[0].id;
                }
            } else {

                _this.toastShow(1, res.msg);

            }
        });
    }
};
