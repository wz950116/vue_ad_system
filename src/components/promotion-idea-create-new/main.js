var $$model_idea = require('./model-idea-create.js');
var $$util = require('../../lib/util.js');
var _ = require('../../lib/underscore.v1.8.3.js');

module.exports = {
    props: {
        orderId: {
            type: Number,
            default: 0
        },
        unitName: {
            type: String,
            default: '广告单元名称'
        },
        ideaId: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            title: '新建创意',
            isEdit: false,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            type: 0, // 0为cpd，1为cpm
            linkMap: { // 控制推广内容显示隐藏
                estate: false, // 楼盘
                forum: false, // 论坛
                live: false,
                news: false,
                web: false
            },
            relateEstateInfo: { //关联楼盘相关
                estateList: [], // 所属楼盘列表
                pageType: '' // 落地页
            },
            formData: {
                link: '',
                liveId: '',
                estateId: '',
                matchSystem: false, // 匹配系统内容
                exposure: '',
                click: ''
            },
            resourceInfo: {}, // 广告创意数据
            helpInfo: require('./data/help-data.js'),
            rules: require('./data/rules.js'),
            ideaStyle: '0',
            supportType: '',
            exposure: '',
            click: '',
            loading: true,
            dialogVisible: false,
            monitorExposure: [{
                input: true,
                btn: true,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }],
            monitorClick: [{
                input: true,
                btn: true,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }],
            thirdMonitorStatus: ''
        };
    },
    components: {
        'alert': require('../alert/alert')
    },
    computed: {
        choosePrVisible: function() {
            var _this = this,
                key;
            for (key in _this.linkMap) {
                if (_this.linkMap[key] === 'true') {
                    return true;
                }
            }
            return false;
        }
    },
    watch: {
        dialogVisible (val) {
            this.title = this.isEdit === false ? '新建创意' : '编辑创意';
            var _this = this, i, key;
            // 初始化三方链接输入
            _this.monitorExposure = [{
                input: true,
                btn: true,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }];
            _this.monitorClick = [{
                input: true,
                btn: true,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }, {
                input: false,
                btn: false,
                content: ''
            }];
            // 新建
            if (val === true && _this.orderId && _this.isEdit === false) {
                _this.loading = true;
                $$model_idea.getEstateListAndPosLimit({
                    order_id: _this.orderId
                }, res => {
                    _this.loading = false;
                    if (res.code === '200') {
                        _this.type = parseInt(res.data.type);
                        if (res.data.type === '1') {
                            // cpm
                        } else {
                            _this.reset();
                            // cpd
                            _this.linkMap = res.data.linkMap;
                            _this.thirdMonitorStatus = res.data.thirdMonitorStatus;
                            // 将选择推广内容选项置为最上面那一个
                            if (_this.linkMap && _this.linkMap.estate === 'true') {
                                _this.supportType = 'estate';
                            } else if (_this.linkMap && _this.linkMap.forum === 'true') {
                                _this.supportType = 'forum';
                            } else if (_this.linkMap && _this.linkMap.live === 'true') {
                                _this.supportType = 'live';
                            } else if (_this.linkMap && _this.linkMap.news === 'true') {
                                _this.supportType = 'news';
                            } else if (_this.linkMap && _this.linkMap.web === 'true') {
                                _this.supportType = 'web';
                            } else {
                                _this.supportType = '';
                            }

                            _this.relateEstateInfo.estateList = res.data.linkInfo.estate.estateList;
                            _this.relateEstateInfo.estateList.unshift();
                        }

                        res.data.resourceInfo.forEach(function(item) {
                            item.showList.forEach(function(ite) {
                                ite.posResourceList.forEach(function(it) {
                                    it.description = '';
                                    if (it.type === '9') {
                                        it.list = [];
                                        for (i = 0; i < 5; i++) {
                                            it.list.push({
                                                name: '',
                                                dealPrice: '',
                                                dealNum: '',
                                                link: ''
                                            });
                                        }
                                    }
                                    if (it.type === '11') {
                                        it.num1 = '';
                                        it.num2 = '';
                                    }
                                });
                            });
                        });
                        _this.resourceInfo = res.data.resourceInfo;
                        _this.ideaStyle = '0';
                    } else {

                    }
                    // 上传逻辑处理
                    require('./upload.js')(_this);
                });
            }
            // 编辑
            else {
                // 新建创意点击关闭不再发送请求
                if (val === false && _this.isEdit === false) return;
                _this.loading = true;
                $$model_idea.getEstateListAndPosLimitWithIdeaDetail({
                    idea_id: _this.ideaId,
                    order_id: _this.orderId
                }, res => {
                    _this.loading = false;
                    if (res.code === '200') {
                        _this.type = parseInt(res.data.resultData.type);
                        if (res.data.resultData.type === '1') {
                            // cpm
                        } else {
                            // cpd
                            _this.linkMap = res.data.resultData.linkMap;
                            _this.thirdMonitorStatus = res.data.resultData.thirdMonitorStatus;
                            if (res.data.resultData.linkInfo) {
                                // 三方监测
                                let thirdMonitorLink = res.data.resultData.linkInfo.thirdMonitorLink;
                                if (thirdMonitorLink && thirdMonitorLink.pv) {
                                    let pvLink = thirdMonitorLink.pv;
                                    pvLink.forEach((item, index) => {
                                        _this.monitorExposure[index].input = true;
                                        _this.monitorExposure[index].btn = true;
                                        _this.monitorExposure[index].content = item;
                                        if (index === 2 || index < pvLink.length - 1) {
                                            _this.monitorExposure[index].btn = false;
                                        }
                                    });
                                };
                                if (thirdMonitorLink && thirdMonitorLink.click) {
                                    let clickLink = thirdMonitorLink.click;
                                    clickLink.forEach((item, index) => {
                                        _this.monitorClick[index].input = true;
                                        _this.monitorClick[index].btn = true;
                                        _this.monitorClick[index].content = item;
                                        if (index === 2 || index < clickLink.length - 1) {
                                            _this.monitorClick[index].btn = false;
                                        }
                                    });
                                };
                                _this.relateEstateInfo.estateList = res.data.resultData.linkInfo.estate.estateList;
                                _this.relateEstateInfo.estateList.unshift();
                                var linkInfo = res.data.resultData.linkInfo.resultData;
                                var type = linkInfo.type_id;
                                _this.supportType = type;
                                switch (type) {
                                    case 'estate':
                                        _this.formData.estateId = linkInfo.estate_id;
                                        _this.relateEstateInfo.pageType = linkInfo.linkType;
                                        _this.formData.link = linkInfo.link;
                                        break;
                                    case 'live':
                                        _this.formData.liveId = linkInfo.name;
                                        break;
                                    default:
                                        _this.formData.link = linkInfo.link;
                                }
                            }
                        }
                        res.data.resultData.resourceInfo.forEach(function(item) {
                            item.showList.forEach(function(ite) {
                                ite.posResourceList.forEach(function(it) {
                                    it.description = it.description || '';
                                });
                            });
                        });
                        _this.ideaStyle = parseInt(res.data.resultData.pos_resource_group_id) - 1 + '';
                        _this.resourceInfo = res.data.resultData.resourceInfo;
                    }
                    // 上传逻辑处理
                    require('./upload.js')(_this);
                });
                // 修改初始化
            }
        },
        promotionType: function(val) {
            this.formData.link = '';
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
        reset: function() {
            this.relateEstateInfo.estateList = [];
            this.relateEstateInfo.pageType = '';
            this.formData.link = '';
            this.formData.liveId = '';
            this.formData.estateId = '';
        },
        uploadQualification: function() {
            var cid = $$util.getCid();
            if (cid) {
                $$util.newWin('/index.html#/agent' + cid + '/settings/qualification');
            } else {
                $$util.newWin('/index.html#/customer/settings/qualification');
            }
        },
        getTextLen: function(str) {
            var len = 0,
                i;
            for (i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                    len += 1;
                } else {
                    len += 0.5;
                }
            }
            return len;
        },
        addEstate: function() {
            var cid = $$util.getCid();
            if (cid) {
                $$util.newWin('/index.html#/agent' + cid + '/settings/estate');
            } else {
                $$util.newWin('/index.html#/customer/settings/estate');
            }
        },
        save () {
            var _this = this,
                currentData, type,
                params = {
                    orderId: _this.orderId,
                    ideaName: _this.unitName,
                    posResourceGroupId: parseInt(_this.ideaStyle) + 1,
                    supportType: _this.supportType
                };

            if (params.supportType === 'live') {
                params.liveId = _this.formData.liveId;
            } else if (params.supportType === 'estate') {
                params.estateId = _this.formData.estateId;
                params.linkType = _this.relateEstateInfo.pageType;
                params.link = _this.formData.link;
            } else {
                params.link = _this.formData.link;
            }

            params.data = {};

            // 三方监控参数
            params.pvLinkList = [];
            params.clickLinkList = [];
            _this.monitorExposure.forEach(item => {
                if (item.content !== '') {
                    params.pvLinkList.push(item.content);
                }
            });
            _this.monitorClick.forEach(item => {
                if (item.content !== '') {
                    params.clickLinkList.push(item.content);
                }
            });

            currentData = _this.resourceInfo[parseInt(_this.ideaStyle)];

            require('./deal-submit-data')(params, currentData); // 对提交数据格式进行处理
            // cpm
            if (_this.type === 1) {
                $$model_idea.createCpmAdIdea(params, res => {
                    if (res.code === '200') {
                        location.reload();
                    } else {
                        _this.toastShow(1, res.msg);
                    }
                });
            } else {
                if (_this.isEdit === false) {
                    $$model_idea.createAdIdea(params, res => {
                        if (res.code === '200') {
                            location.reload();
                        } else {
                            _this.toastShow(1, res.msg);
                        }
                    });
                } else {
                    params.ideaId = _this.ideaId;
                    $$model_idea.editAdIdea(params, res => {
                        if (res.code === '200') {
                            location.reload();
                        } else {
                            _this.toastShow(1, res.msg);
                        }
                    });
                }
            }
        },
        // 点击预览
        preview () {
            var _this = this,
                supportType = _this.supportType,
                params = {
                    supportType: supportType
                };
            if (supportType === 'live') {
                params.liveId = _this.formData.liveId;
            } else if (supportType === 'estate') {
                params.estateId = _this.formData.estateId;
                params.link = _this.formData.link;
                if (_this.relateEstateInfo.pageType === '1') {
                    $$util.newWin(_this.formData.link);
                    return;
                }
            } else if (supportType === 'web') {
                let params = {
                    'url': this.formData.link
                };
                $$model_idea.checkoutUrl(params, res => {
                    if (res.msg !== "success") {
                        return;
                    } else {
                        $$util.newWin(_this.formData.link);
                        return;
                    }
                })
                return;
            } else {
                $$util.newWin(_this.formData.link);
                return;
            }

            $$model_idea.getAutoContent(params, function(res) {
                if (res.code === '200') {
                    var url = supportType === 'estate' ? res.data.link : res.data.urls.pc;
                    $$util.newWin(url);
                } else {
                    _this.toastShow(1, res.msg);
                }
            });
        },
        checkoutUrl () {
            let params = {
                'url': this.formData.link
            };
            $$model_idea.checkoutUrl(params, res => {
                if (res.msg !== "success") {
                    this.$message(res.msg);
                    return;
                }
            })
        },
        // 添加曝光统计链接
        addExposureMonitor (index) {
            if (this.monitorExposure[index].content == '') {
                this.$message('链接不能为空');
                return;
            } else if (index === 1) {
                this.monitorExposure[index + 1].btn = false;
                this.monitorExposure[index + 1].input = true;
            } else {
                this.monitorExposure[index + 1].input = true;
                this.monitorExposure[index + 1].btn = true;
            }
            this.monitorExposure[index].btn = false;
        },
        // 添加点击统计链接
        addClickMonitor (index) {
            if (this.monitorClick[index].content == '') {
                this.$message('链接不能为空');
                return;
            } else if (index === 1) {
                this.monitorClick[index + 1].btn = false;
                this.monitorClick[index + 1].input = true;
            } else {
                this.monitorClick[index + 1].input = true;
                this.monitorClick[index + 1].btn = true;
            }
            this.monitorClick[index].btn = false;
        }
    }
};
