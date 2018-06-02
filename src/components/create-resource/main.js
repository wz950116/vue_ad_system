var Vue = require('vue');
var adModel = require('../../script/data/model/ad.js');
var _ = require('../../lib/underscore.v1.8.3.js');
var $$moment = require('../../lib/moment.js');
var alert = require('../alert/alert');
var calendar = require('../price-calendar/price-calendar.vue');

module.exports = {
    props: {
        planId: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        var now = new Date().getTime() + 8.64e7 * 60;
        var _this = this;
        var words = [];
        var i = 1;
        for (i; i < 27; i++){
            if ([15, 21, 22].indexOf(i) < 0) {
                words.push(String.fromCharCode(64+i));
            }
        }
        return {
            words: words,
            pickerOptions0: {
                disabledDate: function (time) {
                    return (time.getTime() < Date.now() - 8.64e7 || time.getTime() > _this.limitDate);
                }
            },
            alert: {
                show: false,
                message: 'xxx',
                status: 1
            },
            limitDate: now,
            dateRangeForView: '',
            dateRange: [],
            priceTotal: 0,
            dateRangeCount: 0,
            dateFormat: 'YYYYMMDD',
            //广告位可用进度条宽度
            statusLineWidth: 450,
            //当前所有筛选项的所选状态
            filterState: {
                cityId: '',
                platformId: '',
                oneLevelId: '',
                twoLevelId: [],
                screenIndexId: ['init'],
                startTime: '',
                endTime: '',
                onlyAvailable: false
            },
            display: true,
            city: {},
            pingt: {},
            lm: {},
            lmSec: {},
            pc: {},
            date: {},
            adPeriod: {
                startTime: '',
                endTime: ''
            },
            //排序 - 曝光量和价格
            sort: {
                bgl: {
                    up: false,
                    down: false
                },
                price: {
                    up: false,
                    down: false
                }
            },
            //广告位列表
            resourceList: []
        }
    },
    filters: {
        dateFormat: function (value) {
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
        moneyFormat: function (money) {
            if (typeof money === 'number') {
                money = money.toString();
            }
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
    watch: {
        dateRangeForView: function (val) {
            if (Object.prototype.toString.call(val) === '[object Array]') {
                this.filterState.startTime = $$moment(val[0]).format('YYYYMMDD');
                this.filterState.endTime = $$moment(val[1]).format('YYYYMMDD');
                this.queryAdListFn();
            }
        },
        'filterState.platformId': {
            handler: function (newVal) {
                var _this = this;
                if (newVal === '' || newVal === undefined || newVal === null) {
                    return;
                }
                adModel.getFirstLevelProgamas({
                    platformType: parseInt(newVal)
                }, function (data) {
                    if (data.code === '200') {
                        data.data.current = parseInt(data.data.current);
                        _this.lm = _.extend(data.data, {
                            isShow: false
                        });
                        _this.filterState.oneLevelId = 'init';
                        _this.emptyMuiltSelect('erji');
                        _this.emptyMuiltSelect('pingc');
                    } else {
                        _this.toast(1, '获取一级栏目失败');
                    }
                });

            },
            deep: true
        },
        'filterState.oneLevelId': {
            handler: function (newVal, oldVal) {
                var _this = this;
                if (newVal === '' || newVal === undefined) {
                    return;
                }
                if (newVal === 'init') {
                    newVal = '0';
                    _this.filterState.oneLevelId = '0';
                }
                adModel.getSecondLevelProgamas({
                    platformType: parseInt(_this.filterState.platformId),
                    oneLevelId: parseInt(newVal)
                }, function (data) {
                    if (data.code === '200') {
                        _this.lmSec = _.extend(data.data, {
                            isShow: false
                        });
                        _this.filterState.twoLevelId = 'init';
                        _this.emptyMuiltSelect('erji');
                        _this.emptyMuiltSelect('pingc');
                    } else {
                        _this.toast(1, '获取二级栏目失败');
                    }
                });
            },
            deep: true
        },
        'filterState.twoLevelId': {
            handler: function (newVal, oldVal) {
                var _this = this;
                if (newVal.length === oldVal.length) {
                    return;
                }
                if (newVal === 'init') {
                    newVal = [];
                    _this.filterState.twoLevelId = [];
                }
                var twoLevelIds = _.map(newVal, function (item) {
                    return parseInt(item);
                });
                adModel.getScreenIndice({
                    platformType: parseInt(_this.filterState.platformId),
                    oneLevelId: parseInt(_this.filterState.oneLevelId),
                    twoLevelIds: twoLevelIds
                }, function (data) {
                    if (data.code === '200') {
                        _this.pc = _.extend(data.data, {
                            isShow: false
                        });
                        _this.filterState.screenIndexId = data.data.current;
                        _this.emptyMuiltSelect('pingc');
                    } else {
                        _this.toast(1, '获取屏次失败');
                    }
                });
            },
            deep: true
        },
        'filterState.screenIndexId': {
            handler: function (newVal, oldVal) {
                if (oldVal.length && oldVal[0] === 'init') {
                    return;
                }
                var _this = this;
                var screenIndexId = _.map(newVal, function (item) {
                    return parseInt(item);
                });
                _this.queryAdListFn();
            },
            deep: true
        }
    },
    components: {
        'alert': alert,
        'calendar': calendar
    },
    computed: {
        dateRangeCount: function () {
            return this.dateRange.length;
        }
    },
    methods: {
        getRange: function (data) {
            var currentItem = this.resourceList[_.findIndex(this.resourceList, {isShow: true})];
            var currentAllocList = currentItem.details.allocList;
            var totalPrice = 0;
            for (var i = 0, len = data.dateList.length; i < len; i++) {
                totalPrice += parseFloat(data.dateList[i].price);
            }
            this.priceTotal = totalPrice;
            this.dateRange = data.dateList;
        },
        toast: function (status, msg) {
            var _this = this;
            this.alert.status = status;
            this.alert.message = msg;
            this.alert.show = true;
            window.setTimeout(function () {
                _this.alert.show = false;
            }, 1000);
        },
        //城市列表 - 滚动至对应区域
        queryCityAreaFn: function (event) {
            var chooseWord = event.target.innerText;
            var cityWordsDom = document.querySelectorAll('.create-resource .cityArea-head');
            var scrollContainer = document.querySelector('.cityList-content');
            cityWordsDom.forEach(function (item) {
                if (item.innerText.indexOf(chooseWord) >= 0) {
                    scrollContainer.scrollTop = item.offsetTop - 68;
                }
            });
        },
        //初始化 - 获取筛选项数据
        initFilterInfoFn: function () {
            var _self = this;
            adModel.getInitAdResourceSelect({}, function (res) {
                if (res.code === '200') {
                    var d = res.data;
                    _self.city = _.extend(d.city, {
                        isShow: false
                    });
                    _self.pingt = _.extend(d.platForm, {
                        isShow: false
                    });
                    _self.date = _.extend(d.date, {
                        isShow: false
                    });
                    _self.filterState = {
                        cityId: _self.city.current,
                        platformId: _self.pingt.current,
                        oneLevelId: '',
                        twoLevelId: [],
                        screenIndexId: [],
                        startTime: _self.date.current.startTime,
                        endTime: _self.date.current.endTime,
                        onlyAvailable: false
                    };
                    _self.limitDate = $$moment(res.data.date.unallocation_start)._d;
                    // _self.queryAdListFn()
                    //请求广告列表
                }
                ;
                //异步更新
                _self.$nextTick(function () {
                    //初始化被选上的复选栏选项
                    var lmSecAry = _self.filterState.twoLevelId;
                    var lmSecItems = _self.$refs.lmSecList.querySelectorAll('.item');
                    lmSecAry.forEach(function (item) {
                        lmSecItems.forEach(function (s) {
                            if (s.getAttribute('data-id') === item) {
                                s.className = s.className + ' active';
                            }
                        })
                    });

                    var pcAry = _self.filterState.screenIndexId;
                    var pcItems = _self.$refs.pcList.querySelectorAll('.item');
                    pcAry.forEach(function (item) {
                        pcItems.forEach(function (s) {
                            if (s.getAttribute('data-id') === item) {
                                s.className = s.className + ' active';
                            }
                        })
                    })
                })
            });
        },
        emptyMuiltSelect: function (type) {
            document.querySelectorAll('.multiple.' + type + ' .item').forEach(function (item) {
                item.className = item.className.replace(/active/ig, '');
            });
        },
        //筛选项 单选
        selectSFilterFn: function (type, e, value) {
            var target = e.target;
            switch (type) {
                case 'city':
                    this.$refs.filterCity.innerHTML = target.innerHTML;
                    this.filterState.cityId = parseInt(value);
                    this.queryAdListFn();
                    break;
                case 'pingt':
                    this.$refs.filterPingt.innerHTML = target.innerHTML;
                    this.filterState.platformId = parseInt(value);
                    break;
                case 'lm':
                    this.$refs.filterLm.innerHTML = target.innerHTML;
                    this.filterState.oneLevelId = parseInt(value);
                    break;
                case 'filter-calendar':
                    // this.$refs.city.innerHTML = target.innerHTML;
                    break;
                default:
                //
            };
        },
        //筛选项 多选
        selectMFilterFn: function (type, e, value) {
            var target = e.target;
            if (target.className == 'checkbox') {
                target = target.parentNode;
            }
            var stateType = null;
            switch (type) {
                case 'pc':
                    var arr = [];
                    this.filterState.screenIndexId.forEach(function (item) {
                        arr.push(item);
                    });
                    value = parseInt(value);
                    var index = arr.indexOf(value);
                    if (index >= 0) {
                        arr.splice(index, 1);
                    } else {
                        arr.push(value);
                    }
                    this.filterState.screenIndexId = arr;
                    stateType = 'screenIndexId';
                    break;
                case 'lmSec':
                    var arr = [];
                    this.filterState.twoLevelId.forEach(function (item) {
                        arr.push(item);
                    });
                    var index = arr.indexOf(value);
                    if (index >= 0) {
                        arr.splice(index, 1);
                    } else {
                        arr.push(parseInt(value));
                    }
                    this.filterState.twoLevelId = arr;
                    stateType = 'twoLevelId';
                    break;
                default:
                //
            }
            ;

            if (/active/i.test(target.className)) {
                target.className = target.className.replace(/active/ig, '');
                //目标的id
                var targetId = target.getAttribute('data-id');
                //目标的序列
                var targetIndex = '';
                this.filterState[stateType].forEach(function (item, index) {
                    if (targetId == item) {
                        targetIndex = index;
                    }
                })
                // if (targetIndex !== '') {
                //     this.filterState[stateType].splice(targetIndex, 1);
                // }
            } else {
                target.className = target.className + ' active';
                // this.filterState[stateType].push(target.getAttribute('data-id'));
            };
        },
        //获取一条广告信息的详情
        showItemDetailFn: function (index) {
            var _self = this;
            var target = this.resourceList[index];

            var data = {
                positionId: parseInt(target.id),
                cityCode: parseInt(_self.filterState.cityId),
                startDate: _self.filterState.startTime,
                endDate: _self.filterState.endTime
            };

            if (target.isShow === true) {
                Vue.set(target, 'isShow', false);
                return;
            }

            //ajax请求数据
            adModel.getAdResourceDetail(data, function (res) {
                if (res.code === '200') {
                    var d = res.data;
                    var range;
                    // d.periodStart = +d.availableTime.startTime;
                    // d.periodEnd = +d.availableTime.endTime;
                    // d.duringStart = new Date(d.periodStart);
                    // d.duringEnd = new Date(d.periodEnd);
                    // //时间区间
                    // d.duringTime = [d.duringStart, d.duringEnd];
                    _self.priceTotal = 0;
                    _self.dateRange = [];
                    _self.dateRangeCount = 1;
                    //存到resourceList[index]中的details属性上
                    //Vue.set(target, 'details', d);

                    target.details = d;

                    //每次只打开一个列表的详情，关闭其他的。
                    _self.resourceList.forEach(function (item, index) {
                        if (item.isShow) {
                            item.isShow = false;
                        }
                    })
                    Vue.set(target, 'isShow', true);
                    //自动获取焦点
                    _self.$nextTick(function () {
                        // document.querySelectorAll('.resource-item')[index].getElementsByClassName('adNameInput')[0].focus();
                    })
                }
            });
        },
        //获取广告列表项
        queryAdListFn: function () {
            var _self = this;
            var f = this.filterState;
            var data = {
                areaCode: parseInt(f.cityId),
                platform: parseInt(f.platformId),
                firstLevel: parseInt(f.oneLevelId),
                progamaCode: f.twoLevelId,
                screenIndex: f.screenIndexId,
                startDate: f.startTime,
                endDate: f.endTime,
                onlyAvailable: f.onlyAvailable
            };
            adModel.searchAdResource(data, _self.searchAdResource);
        },
        searchAdResource: function (res) {
            var _self = this;
            if (res.code === '200') {
                //获取广告位周期
                var periodStart = +res.data.startTime;
                var periodEnd = +res.data.endTime;
                _self.adPeriod.startTime = ((new Date(periodStart)).getFullYear()) + '.' + ((new Date(periodStart)).getMonth() + 1) + '.' + ((new Date(periodStart)).getDate());
                _self.adPeriod.endTime = ((new Date(periodEnd)).getFullYear()) + '.' + ((new Date(periodEnd)).getMonth() + 1) + '.' + ((new Date(periodEnd)).getDate());

                var ajaxData = res.data.list;
                ajaxData.forEach(function (item) {
                    item.isShow = false;
                    var d = item.status;
                    //总时长
                    var totalDays = new Date($$moment(_self.filterState.endTime, 'YYYYMMDD').format()) - new Date($$moment(_self.filterState.startTime, 'YYYYMMDD').format());
                    totalDays = totalDays / 86400000;
                    //1天所占宽度
                    var unitDayWidth = _self.statusLineWidth / (totalDays + 1);
                    var startDay = parseInt(d[0].startTime);
                    d.forEach(function (i) {
                        if (i.available) {
                            i.isShow = false;
                            var wArea = ((parseInt(i.endTime) - parseInt(i.startTime)) / (1000 * 60 * 60 * 24)) + 1;
                            i.width = wArea * unitDayWidth;
                            var lArea = ((parseInt(i.startTime) - parseInt(startDay)) / (1000 * 60 * 60 * 24));
                            i.left = lArea * unitDayWidth;
                            //起止时间文案
                            i.dStart = ((new Date(+i.startTime)).getMonth() + 1) + '.' + ((new Date(+i.startTime)).getDate());
                            i.dEnd = ((new Date(+i.endTime)).getMonth() + 1) + '.' + ((new Date(+i.endTime)).getDate());
                        }
                    })
                });
                _self.resourceList = ajaxData;
                
                _self.$nextTick(function () {
                    //默认显示第一个详细信息 0221
                    if (_self.resourceList.length > 0) {
                        _self.showItemDetailFn(0);
                    }
                })
            }
        },
        //曝光量排序
        bglSortFn: function () {
            if (this.sort.bgl.up === false) {
                this.resourceList.sort(function (a, b) {
                    return b.exposure - a.exposure;
                });
                this.sort.bgl.up = true;
                this.sort.bgl.down = false;
            } else {
                this.resourceList.sort(function (a, b) {
                    return a.exposure - b.exposure;
                });
                this.sort.bgl.up = false;
                this.sort.bgl.down = true;
            }
        },
        //价格排序
        priceSortFn: function (type) {
            if (this.sort.price.up === false) {
                this.resourceList.sort(function (a, b) {
                    return b.price - a.price;
                });
                this.sort.price.up = true;
                this.sort.price.down = false;
            } else {
                this.resourceList.sort(function (a, b) {
                    return a.price - b.price;
                });
                this.sort.price.up = false;
                this.sort.price.down = true;
            }
        },
        adNameLengthLimit: function (value) {
            if (this.getByteLen(value).len > 64) {
                this.toast(1, "广告单元名称不能超过64个字！");
                return false;
            } else {
                return true;
            }
        },
        getByteLen: function(val) {
            var len = 0;
            var count = 0;
            for (var i = 0; i < val.length; i++) {
                var item = val.charAt(i);
                if (item.match(/[^\x00-\xff]/ig) != null) {
                    len += 1;
                } else {
                    len += 0.5;
                }
                if (len <= 15) {
                   count += 1;
                }
            }
            return {len: len, count: count};
        },
        //修改广告单元名字
        modifyAdNameFn: function (e) {
            var target = e.target;
            if (target.tagName === 'INPUT') {
                // target = target.querySelector('.adNameInput');
                target.removeAttribute('disabled');
            }

        },
        modifyAdNameFocusFn: function (e) {
            var target = e.target;
            target.className = target.className + ' active';
        },
        modifyAdNameBlurFn: function (index, e) {
            var target = e.target;
            var targetValue = this.resourceList[index].details.name;
            target.className = target.className.replace(/active/ig, '');
            target.setAttribute('disabled', 'disabled');
            this.adNameLengthLimit(targetValue);
        },
        //提交到已选广告购物车中
        chooseAdFn: function (index, e) {
            /*
             *
             @ ObjectendDate: s
             @ positionId: s
             @ startDate: s
             **/
            var that = this;
            var targetItem = this.resourceList[index];
            var details = targetItem.details;
            var dateList = this.dateRange.map(function(item){
                    return item.dateId;
                });
            var target = e.target;
            var data = {
                orderName: targetItem.details.name,
                cityCode: parseInt(that.filterState.cityId),
                dateList: dateList,
                positionId: parseInt(details.id),
                planId: that.planId
            };
            if (!this.adNameLengthLimit(data.orderName)) {
                return;
            }
            adModel.addAdResource(data, function (res) {
                if (res.code === '200') {
                    targetItem.isShow = false;
                    adModel.getAdResourceList();
                    that.toast(0, '成功添加订单');
                } else {
                    that.toast(1, res.msg || '添加到购物车失败');
                }
            });
        },
        querySelectDateFn: function () {
            this.filterState.onlyAvailable = !this.filterState.onlyAvailable;
            var f = this.filterState;
            var data = {
                areaCode: parseInt(f.cityId),
                platform: parseInt(f.platformId),
                firstLevel: parseInt(f.oneLevelId),
                progamaCode: f.twoLevelId,
                screenIndex: f.screenIndexId,
                startDate: f.startTime,
                endDate: f.endTime,
                onlyAvailable: f.onlyAvailable
            };
            adModel.searchAdResource(data, this.searchAdResource);
        },
        /**
         * @
         * @ {int}秒数转日期
         * @
         **/
        secondToDate: function (s) {
            var date = new Date(s);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            return (Y + M + D);
        },

        // 创意规格换行显示title
        showTitle: function (item) {
            return item.join('\n');
        }
    },
    beforeMount: function () {
        var _this = this;
        this.initFilterInfoFn();
    },
    mounted: function () {
        var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (this.$parent.name === 'create') {
            this.$el.querySelector('.main-list').style.maxHeight = (winHeight - 300) + 'px';
        } else if (!(this.$parent.name === 'create-new')) {
            this.$el.querySelector('.main-list').style.maxHeight = (winHeight - 446) + 'px';
        }
        if (this.$parent.name === 'create-new') {
            $(this.$refs['create-resource']).css('height', $(window).height() - 60 - 100 + 'px');
            $(this.$refs.mainList).css({'max-height': 'auto', height: 'auto', 'overflow-y': 'hidden'});
        }
    }
}