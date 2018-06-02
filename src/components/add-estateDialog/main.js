var $$settingsModel = require('../../script/data/model/settings.js');
var select = require('../selecter/selecter');
var selects = require('../multi-selecter/multi-selecter');
var $$agent = require('../../script/data/model/agent.js');
var city = require('../../script/data/model/city.js');
var Schema = require("async-validator");
var alert = require('../alert/alert');
var $$upload = require('../../lib/lib-upload');
var uploadUrl = require('../../lib/uploadurl.js');
var estateType = require('../../script/data/api/estateType.json');
var format = require('../../lib/format.js');
module.exports = {
    data: function () {
        return {
            provinceOptions: [{
                "value": null,
                "text": "省/市"
            }],
            cityOptions: [{
                value: null,
                text: '市/地区'
            }],
            cityOptionsSearch: [{
                value: null,
                text: '市/地区'
            }],
            xianOptions: [{
                value: null,
                text: '县/市'
            }],
            businessOptions: [{
                value: null,
                text: '商圈',
                selected: false
            }],
            hide: {
                firstStep: false,
                secondStepFind: true,
                secondStepNoFind: true,
                thirdStep: true
            },
            stepLine: {
                stepLineOne: false,
                stepLineTwo: false,
                stepLineThree: false
            },
            stepMark: [{
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }, {
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }, {
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }],
            stepNum: "1",
            propertyTags: [],
            searchResult: [],
            addInfo: false,
            waitCheck: false,
            stepText: "下一步",
            showDialog: false,
            findEstate: false,
            nextBg: true,
            estateNameLen: 0,
            estateName: "",
            maxLen: 20,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            selectedProvince: "",
            selectedProvinceSearch: "",
            selectedCity: null,
            selectedCitySearch: null,
            selectedXian: "",
            selectedBusiness: [],
            detailAddress: "",
            propertySelected: [],
            imgUrl: "",
            filterSize: 0,
            page: {
                pagefirst: {
                    pagenum: 1,
                    active: true,
                    hide: false
                },
                pagesecond: {
                    pagenum: 2,
                    active: false,
                    hide: false
                },
                pagethird: {
                    pagenum: 3,
                    active: false,
                    hide: false
                }
            },
            totalPage: 0,
            pageArrow: {
                prev: false,
                next: false
            },
            inputedEstate: "",
            estatePage: 1,
            searchEstateStyle: true,
            estateId: "",
            fixSearchEstateStyle: true,
            businessNumShow: true,
            totalPages: 0,
            isWhite: '0',//当前用户是否为白名单
            imgProgress: 0,//当前图片上传进度
            imgUploading: false
        }
    },
    components: {
        selecter: select,
        selecters: selects,
        alert: alert,
    },
    beforeMount: function () {
        var that = this;
        that.propertyTags = estateType.estateType;
        that.stepNum = 1;
        that.stepLine.stepLineOne = true;
        that.stepMark[0].stepMarkOneBig = true;
        that.stepMark[1].stepMarkTwoGrey = true;
        that.stepMark[2].stepMarkThreeGrey = true;
        $$settingsModel.on("addEstateDialog", function (data) {
            that.showDialog = true;
            that.stepNum = data.stepNum;
            if (data.stepNum === 2) {
                that.hideReset();
                that.stepMarkReset();
                that.stepLineReset();
                that.hide.secondStepNoFind = false;
                that.hide.secondStepFind = true;
                that.hide.firstStep = true;
                that.addInfo = true;
                that.nextBg = false;
                that.stepLine.stepLineTwo = true;
                that.stepMark[0].stepMarkOneSmall = true;
                that.stepMark[1].stepMarkTwoBig = true;
                that.stepMark[2].stepMarkThreeGrey = true;
                if (that.estateId === "") {
                    that.estateId = data.cityId;
                }
                setTimeout(that.upload);
            }
        });
        city.getProvince(function (data) {
            var tmp = {};
            if (parseInt(data.code) === 1) {
                data.data.forEach(function (item) {
                    tmp.value = item.provinceId;
                    tmp.text = item.provinceName;
                    that.provinceOptions.push(tmp);
                    tmp = {};
                });
            } else {
                that.alertShow(1, "获取省份数据失败！");
            }
        });
        var params = {
            "demanderId":that.$route.params.cid || ''
        }
        $$agent.isDemanderWhiteList(params,function (data) {
            that.isWhite = data.data.isWhite;
            // that.isWhite = "0";
            if (that.isWhite === "1") {
                that.stepText = "确认添加";
            }
        });
        that.schema = new Schema({
            name: {
                type: 'string',
                required: true,
                min: 1,
                max: 200,
                message: '请输入楼盘名称'
            },
            province: {
                type: 'number',
                required: true,
                message: '请选择省份'
            },
            city: {
                type: 'number',
                required: true,
                message: '请选择城市'
            },
            xian: {
                type: 'number',
                required: true,
                message: '请选择县市'
            },
            detailAddress: {
                type: 'string',
                required: true,
                message: '请输入详细地址'
            },
            propertySelected: {
                type: 'array',
                required: true,
                message: '请选择物业类型'
            }
        });
    },
    watch: {

        estateName: function (newVal, oldVal) {
            var that = this;
            that.estateNameLen = format.getFullLength(newVal);
            if (that.estateNameLen >= (that.maxLen + 1)) {
                that.estateName = oldVal;
            }
        },
        detailAddress: function (newVal, oldVal) {
            var that = this;
            that.detailAddressLen = format.getFullLength(newVal);
            if (that.detailAddressLen >= 101) {
                that.detailAddress = oldVal;
            }
        }
    },
    methods: {
        estateSearch: function () {
            var that = this;
            var tmp = {};

            if (that.selectedProvinceSearch == 0 || that.selectedProvinceSearch == null || isNaN(that.selectedProvinceSearch)) {
                that.alertShow(1, "请选择省/市");
                return;
            }
            if (that.selectedCitySearch == 0 || that.selectedCitySearch == null || isNaN(that.selectedCitySearch)) {
                that.alertShow(1, "请选择市/地区");
                return;
            }

            var params = {
                name: that.inputedEstate,
                page: that.estatePage - 1,//页码参数从0开始
                pageSize: 3,
                cityId: that.selectedCitySearch
            }
            $$settingsModel.searchEstate(params, function (res) {
                if (parseInt(res.code) === 200) {
                    that.searchResult = [];
                    that.page.pagefirst.pagenum = 1;
                    that.page.pagesecond.pagenum = 2;
                    that.page.pagethird.pagenum = 3;
                    that.totalPages = res.totalPages;
                    if (parseInt(res.totalPages) === 0 || parseInt(res.totalPages) === 1) {
                        that.searchEstateStyle = true;
                    } else {
                        that.searchEstateStyle = false;
                    }
                    if (parseInt(res.totalPages) === 2) {
                        that.page.pagethird.hide = true;
                    }
                    if (parseInt(res.totalPages) > 2) {
                        that.page.pagethird.hide = false;
                    }
                    that.fixSearchEstateStyle = false;

                    that.totalPage = parseInt(res.totalPages);
                    res.data.list.forEach(function (item) {
                        tmp.name = item.projName;
                        if (item.typeList) {
                            tmp.tag = "[" + item.typeList.join("] [") + "]";
                        }
                        tmp.address = item.address;
                        tmp.estateId = parseInt(item.estateId);
                        tmp.redio = false;
                        that.searchResult.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取数据失败！");
                }
            });
        },
        handleProvinceChange: function (option) {
            var that = this;
            that.cityOptions = [{
                value: null,
                text: '市/地区'
            }];
            that.selectedProvince = parseInt(option.value);
            city.getCity(that.selectedProvince, function (data) {
                var tmp = {};
                if (parseInt(data.code) === 200) {
                    data.data.cityOptions.forEach(function (item) {
                        tmp.value = parseInt(item.cityId);
                        tmp.text = item.cityName;
                        that.cityOptions.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取城市数据失败！");
                }
            });
        },
        handleProvinceChangeSearch: function (option) {
            var that = this;
            that.cityOptionsSearch = [{
                value: null,
                text: '市/地区'
            }];
            that.selectedCitySearch = null;

            that.selectedProvinceSearch = parseInt(option.value);
            city.getCity(that.selectedProvinceSearch, function (data) {
                var tmp = {};
                if (parseInt(data.code) === 200) {
                    data.data.cityOptions.forEach(function (item) {
                        tmp.value = parseInt(item.cityId);
                        tmp.text = item.cityName;
                        that.cityOptionsSearch.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取城市数据失败！");
                }
            });
        },
        handleCityChange: function (option) {
            var that = this;
            that.selectedCity = parseInt(option.value);
            that.xianOptions = [{
                value: null,
                text: '县/市'
            }];
            city.getXian(that.selectedCity, function (data) {
                var tmp = {};
                if (parseInt(data.code) === 200) {
                    data.data.xianOptions.forEach(function (item) {
                        tmp.value = parseInt(item.virtualDistrictId);
                        tmp.text = item.virtualDistrictName;
                        that.xianOptions.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取县市数据失败！");
                }
            });
        },
        handleCityChangeSearch: function (option) {
            var that = this;
            that.selectedCitySearch = parseInt(option.value);
        },
        handleXianChange: function (option) {
            var that = this;
            that.businessNumShow = false;
            that.selectedBusiness.length = 0;
            that.selectedXian = parseInt(option.value);
            that.businessOptions.length = 0;
            city.getBusiness(that.selectedXian, function (data) {
                var tmp = {};
                if (parseInt(data.code) === 200) {
                    data.data.businessOptions.forEach(function (item) {
                        tmp.value = parseInt(item.circleId);
                        tmp.text = item.circleName;
                        tmp.selected = false;
                        that.businessOptions.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取商圈数据失败！");
                }
            });
        },
        handleBusinessChange: function (option) {
            var that = this;
            that.businessNumShow = true;
            that.selectedBusiness = option;
        },
        alertShow: function (status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function () {
                _this.alert.show = false;
            }, 2000);
        },
        upload: function () {
            that = this;
            $$upload({
                id: '#selectFiles2',
                uploadUrl: uploadUrl,
                fileName: 'file',
                min: 0,
                max: 1024 * 1024,
                type: '*',
                fn: function (res) {
                    if (parseInt(res) === -110) {
                        that.alertShow(1, '图片超过1M！');
                    } else if (res.code === 0) {
                        that.imgUrl = res.data.url;
                    } else {
                        that.alertShow(1, res.msg);
                    }
                },
                beforeUpload: function (file) {
                    console.log("file",file);
                    that.imgUploading = true;
                },
                progress: function (file,percent,total) {
                    that.imgProgress = 100*percent;
                    if (percent === 1) {
                        setTimeout(function(){
                            that.imgUploading = false;
                            that.imgProgress = 0;
                        },1000)
                        // that.imgUploading = false;
                    }
                }
            });
        },
        cancel: function () {
            var that = this;
            that.stepNum = 1;
            that.showDialog = false;
            that.stepMarkReset();
            that.stepLineReset();
            that.hideReset();
            that.stepText = "下一步";
            if (that.isWhite === "1") {
                that.stepText = "确认添加";
            }
            that.addInfo = false;
            that.waitCheck = false;
            that.nextBg = true;
            that.imgUrl = "";
            that.findEstate = false;
            that.hide.firstStep = false;
            that.searchEstateStyle = true;
            that.fixSearchEstateStyle = true;
            that.searchResult.length = 0;
            that.hide.secondStepNoFind = true;
            that.hide.secondStepFind = true;
            that.stepLine.stepLineOne = true;
            that.stepMark[0].stepMarkOneBig = true;
            that.stepMark[1].stepMarkTwoGrey = true;
            that.stepMark[2].stepMarkThreeGrey = true;
            for (var item in that.searchResult) {
                if (that.searchResult[item].redio) {
                    that.searchResult[item].redio = false;
                }
            }
            $$settingsModel.refreshList();
        },
        next: function () {
            var that = this;
            if (that.isWhite === "1" && that.stepNum !== 3) {
                var params = {
                    estateId: parseInt(that.estateId),
                    qualificationName: that.selectedEstateName,
                    qualificationUrl: that.imgUrl
                };
                $$settingsModel.submitCheck(params, function(res) {
                    if (parseInt(res.code) === 200) {
                        that.stepMarkReset();
                        that.stepLineReset();
                        that.hideReset();
                        that.hide.secondStepNoFind = true;
                        that.hide.secondStepFind = true;
                        that.hide.thirdStep = false;
                        that.waitCheck = true;
                        that.stepLine.stepLineThree = true;
                        that.stepMark[0].stepMarkOneSmall = true;
                        that.stepMark[1].stepMarkTwoSmall = true;
                        that.stepMark[2].stepMarkThree = true;
                        that.stepText = "完成";
                        that.stepNum = 3;
                    }
                });
                return;
            }
            if (that.nextBg) {
                return false;
            }
            that.stepNum++;
            if (that.stepNum === 4) {
                that.cancel();
                return;
            }
            if (that.stepNum === 1) {
                that.stepMarkReset();
                that.stepLineReset();
                that.hideReset();
                that.hide.firstStep = false;
                that.stepLine.stepLineOne = true;
                that.stepMark[0].stepMarkOneBig = true;
                that.stepMark[1].stepMarkTwoGrey = true;
                that.stepMark[2].stepMarkThreeGrey = true;
            }
            if (that.stepNum === 2) {
                that.upload();
                that.stepMarkReset();
                that.stepLineReset();
                that.hideReset();
                if (!that.findEstate) {
                    that.hide.secondStepFind = true;
                    that.hide.secondStepNoFind = false;
                } else {
                    that.hide.secondStepFind = false;
                    that.hide.secondStepNoFind = true;
                }
                that.addInfo = true;
                that.stepLine.stepLineTwo = true;
                that.stepMark[0].stepMarkOneSmall = true;
                that.stepMark[1].stepMarkTwoBig = true;
                that.stepMark[2].stepMarkThreeGrey = true;
            }
            if (that.stepNum === 3) {
                if (!that.findEstate) {
                    if (!that.imgUrl) {
                        that.stepNum--;
                        return false;
                    }
                    var params = {
                        estateId: parseInt(that.estateId),
                        qualificationName: that.selectedEstateName,
                        qualificationUrl: that.imgUrl
                    };
                    $$settingsModel.submitCheck(params, function (res) {
                        if (parseInt(res.code) === 200) {
                            that.stepMarkReset();
                            that.stepLineReset();
                            that.hideReset();
                            that.hide.secondStepNoFind = true;
                            that.hide.secondStepFind = true;
                            that.hide.thirdStep = false;
                            that.waitCheck = true;
                            that.stepLine.stepLineThree = true;
                            that.stepMark[0].stepMarkOneSmall = true;
                            that.stepMark[1].stepMarkTwoSmall = true;
                            that.stepMark[2].stepMarkThree = true;
                            that.stepText = "完成";
                        }
                    });
                } else {
                    that.schema.validate({
                        name: /^\s*$/.test(that.estateName) ? "" : that.estateName,
                        province: that.selectedProvince,
                        city: that.selectedCity,
                        xian: that.selectedXian,
                        detailAddress: /^\s*$/.test(that.detailAddress) ? "" : that.detailAddress,
                        propertySelected: that.propertySelected
                    }, function (errors, fields) {
                        if (errors) {
                            that.alertShow(1, errors[0].message);
                        }
                        that.stepNum--;
                        if (errors == null) {
                            var circleIds = [];
                            that.selectedBusiness.forEach(function (item) {
                                circleIds.push(item.value);
                            });
                            var params = {
                                "cityId": that.selectedCity,
                                "provinceId": that.selectedProvince,
                                "districtId": that.selectedXian,
                                "projectName": that.estateName,
                                "projectAddress": that.detailAddress,
                                "typeDetail": [],
                                "circleIds": circleIds
                            };
                            that.propertyTags.forEach(function (item) {
                                if (item.propertyTagRedioSelect) {
                                    params.typeDetail.push(item.id);
                                }
                            });
                            $$settingsModel.submitClue(params, function (res) {
                                if (parseInt(res.submitClue.code) === 200) {
                                    that.stepMarkReset();
                                    that.stepLineReset();
                                    that.hideReset();
                                    that.hide.secondStepNoFind = true;
                                    that.hide.secondStepFind = true;
                                    that.hide.thirdStep = false;
                                    that.waitCheck = true;
                                    that.stepLine.stepLineThree = true;
                                    that.stepMark[0].stepMarkOneSmall = true;
                                    that.stepMark[1].stepMarkTwoSmall = true;
                                    that.stepMark[2].stepMarkThree = true;
                                    that.stepText = "完成";
                                    that.stepNum++;
                                } else {
                                    that.alertShow(1, "提交失败，请重新提交！");
                                }
                            });
                        }
                    });
                }
            }
        },
        stepMarkReset: function () {
            var that = this;
            that.stepMark = [{
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }, {
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }, {
                stepMarkOneBig: false,
                stepMarkOneSmall: false,
                stepMarkTwoBig: false,
                stepMarkTwoSmall: false,
                stepMarkTwoGrey: false,
                stepMarkThree: false,
                stepMarkThreeGrey: false
            }];
        },
        stepLineReset: function () {
            var that = this;
            that.stepLine = {
                stepLineOne: false,
                stepLineTwo: false,
                stepLineThree: false
            };
        },
        hideReset: function () {
            var that = this;
            that.hide = {
                firstStep: true,
                secondStep: true,
                thirdStep: true
            }
        },
        propertyTagRedio: function (index) {
            var that = this;
            that.propertyTags[index].propertyTagRedioSelect = !that.propertyTags[index].propertyTagRedioSelect;
            that.propertySelected = [];
            for (var item in that.propertyTags) {
                if (that.propertyTags[item].propertyTagRedioSelect) {
                    that.propertySelected.push(that.propertyTags[item].id);
                }
            }
        },
        redioSelect: function (index) {
            var that = this;
            that.nextBg = false;
            for (var item in that.searchResult) {
                if (that.searchResult[item].redio) {
                    that.searchResult[item].redio = false;
                }
            }
            that.findEstate = false;
            if (index === -1) {
                that.findEstate = !that.findEstate;
                that.estateId = null;
            } else {
                that.searchResult[index].redio = !that.searchResult[index].redio;
                that.estateId = that.searchResult[index].estateId;
                that.selectedEstateName = that.searchResult[index].name;
            }
        },
        pageHandle: function (index) {
            var that = this;
            var tmp = {};
            var pages = 0;
            if (index === "prev" && that.page.pagefirst.pagenum > 1) {
                that.page.pagefirst.pagenum--;
                that.page.pagesecond.pagenum--;
                that.page.pagethird.pagenum--;
                for (var item in that.page) {
                    if (that.page[item].active === true) {
                        pages = that.page[item].pagenum;
                    }
                }

            } else if (index === "next" && that.page.pagethird.pagenum < that.totalPage) {

                that.page.pagefirst.pagenum++;
                that.page.pagesecond.pagenum++;
                that.page.pagethird.pagenum++;
                for (var item in that.page) {
                    if (that.page[item].active === true) {
                        pages = that.page[item].pagenum;
                    }
                }

            } else if (index === "next" && that.page.pagethird.pagenum === that.totalPage) {
                if (that.page['pagefirst'].active === true) {
                    that.page['pagefirst'].active = false;
                    that.page['pagesecond'].active = true;
                    pages = that.page["pagesecond"].pagenum;
                } else if (that.page['pagesecond'].active === true) {
                    that.page['pagesecond'].active = false;
                    that.page['pagethird'].active = true;
                    pages = that.page["pagethird"].pagenum;
                } else if (that.page['pagethird'].active === true) {
                    return false;
                }
            } else if (index === "next" && that.totalPage === 2) {
                if (that.page['pagefirst'].active = true) {
                    that.page['pagefirst'].active = false;
                    that.page['pagesecond'].active = true;
                    pages = that.page["pagesecond"].pagenum;
                } else if (that.page['pagesecond'].active === true) {
                    return false;
                }
            } else if (index === "first" || index === "second" || index === "third") {
                for (var item in that.page) {
                    that.page[item].active = false;
                }
                that.page["page" + index].active = true;
                pages = that.page["page" + index].pagenum;
            } else if (index === "prev" && that.page.pagefirst.pagenum === 1 && that.totalPage != 2) {
                if (that.page['pagethird'].active === true) {
                    that.page['pagethird'].active = false;
                    that.page['pagesecond'].active = true;
                    pages = that.page["pagesecond"].pagenum;
                } else if (that.page['pagesecond'].active === true) {
                    that.page['pagesecond'].active = false;
                    that.page['pagefirst'].active = true;
                    pages = that.page["pagefirst"].pagenum;
                } else if (that.page['pagefirst'].active === true) {
                    return false;
                }
            } else if (index === "prev" && that.page.pagefirst.pagenum === 1 && that.totalPage === 2) {
                if (that.page['pagesecond'].active === true) {
                    that.page['pagesecond'].active = false;
                    that.page['pagefirst'].active = true;
                    pages = that.page["pagefirst"].pagenum;
                } else if (that.page['pagefirst'].active === true) {
                    return false;
                }
            }
            var params = {
                cityId: that.selectedCitySearch,
                name: that.inputedEstate,
                page: pages,
                pageSize: 3
            }
            $$settingsModel.searchEstate(params, function (res) {
                if (parseInt(res.code) === 200) {
                    that.searchResult = [];
                    that.findEstate = false;
                    that.searchEstateStyle = false;
                    that.totalPage = parseInt(res.totalPages);
                    if (parseInt(res.totalPages) > 2) {
                        that.page.pagethird.hide = false;
                    }
                    if (parseInt(res.totalPages) === 2) {
                        that.page.pagethird.hide = true;
                    }
                    res.data.list.forEach(function (item) {
                        tmp.name = item.projName;
                        if (item.typeList) {
                            tmp.tag = "[" + item.typeList.join("] [") + "]";
                        }
                        tmp.address = item.address;
                        tmp.redio = false;
                        tmp.estateId = parseInt(item.estateId);
                        that.searchResult.push(tmp);
                        tmp = {};
                    });
                } else {
                    that.alertShow(1, "获取数据失败！");
                }
            });
        }
    }
}