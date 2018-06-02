<template>
    <div class="qual-wrap">
        <div class="qual-title">
            <span class="qual-title-text">资质管理</span>
        </div>
        <div class="qual-content">
            <span class="qual-explain">明星肖像使用授权书:如果您的广告使用了明星的肖像，请提供该资质</span>
            <div class="qual-handle-wrap">
                <div class="h-100 m-b-41" v-for="(item, index) in qualificationList">
                    <span class="qual-name">资质{{index+1}}</span>
                    <img :src="item.qImgUrl" class="qual-img">
                    <span class="qual-text">{{item.qDes}}</span>
                    <span class="del" @click="del(index, item.qId)">删除</span>
                </div>
                <div class="h-100 m-b-41 add-qual">
                    <span class="qual-name">{{addQual.name}}</span>
                    <img :src="imgUrl" class="qual-img" v-if="imgUrl !== ''">
                    <span class="upload-wrap" v-if="imgUrl === ''">
                        <a id="selectFiles2" href="javascript:;" class="uploads"/>
                    </span>
                    <span class="img-explain" v-if="imgUrl === ''">请上传明星肖像使用授权书，支持jpg或png格式，文件需小于500KB</span>
                    <input class="input-explain" v-model="addQual.text" @keyup="length" @focus="focus" @blur="blur" v-bind:class="{ placeholder: placeholder.status }" />
                    <span class="length">{{inputLen}}/10</span>
                    <span v-if="checkRule.textError" class="error-info"><i class="error-icon"></i>请填写资质说明</span>
                    <span v-if="checkRule.picError" class="error-info"><i class="error-icon"></i>请上传授权书</span>
                    <span class="preserve" @click="preserve">保存</span>
                </div>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<style scoped>
.qual-wrap {
    background-color: rgb(250, 250, 250);
    padding-top: 40px;
    padding-left: 42px;
    padding-right: 40px;
}

.qual-title {
    height: 43px;
    border-bottom: 1px solid rgb(213, 213, 213);
}

.qual-title-text {
    font-size: 24px;
}

.qual-explain {
    margin-top: 20px;
    font-size: 16px;
    margin-bottom: 45px;
    display: inline-block;
}

.qual-handle-wrap {
    min-width: 800px;
    background-color: #fff;
    padding: 41px 41px;
    border: rgb(213, 213, 213) 1px solid;
    margin-bottom: 40px;
}

.h-100 {
    height: 100px;
}

.m-b-41 {
    margin-bottom: 41px;
    position: relative;
}

.qual-img {
    height: 100px;
    width: 200px;
    margin-left: 42px;
    vertical-align: middle;
}

.qual-name {
    font-size: 14px;
    vertical-align: middle;
}

.qual-text {
    margin-left: 40px;
    font-size: 14px;
}

.del {
    padding: 14px 38px 12px;
    border: rgb(213, 213, 213) 1px solid;
    background-color: rgb(246, 246, 246);
    font-size: 14px;
    position: absolute;
    top: 29px;
    right: 60px;
    display: inline-block;
    height: 14px;
    cursor: pointer;
}

.input-explain {
    font-size: 14px;
    height: 14px;
    padding: 12px 13px;
    border: rgb(213, 213, 213) 1px solid;
    vertical-align: middle;
    margin-left: 40px;
}

.length {
    margin-left: 11px;
    font-size: 14px;
    vertical-align: middle;
}

.preserve {
    padding: 14px 38px 12px;
    border: rgb(213, 213, 213) 1px solid;
    background-color: rgb(246, 246, 246);
    font-size: 14px;
    margin-left: 338px;
    display: inline-block;
    height: 14px;
    cursor: pointer;
    position: absolute;
    top: 28px;
    right: 63px;
}

.img-explain {
    display: inline-block;
    position: absolute;
    top: 110px;
    left: 80px;
    font-size: 12px;
    color: #999999;
    width: 200px;
}

.add-qual {
    position: relative;
}

.placeholder {
    color: #999999;
}

.upload-wrap {
    position: relative;
    width: 200px;
    height: 100px;
    background: url('./images/add-img.png') no-repeat 0px 0px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 42px;
    overflow: hidden;
}

.uploads {
    display: inline-block;
    width: 200px;
    height: 100px;
}

.upload-wrap input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.page-area {
    margin-bottom: 30px;
}

.page-area .el-pagination {
    background: none;
}

.error-info {
    color: #e43;
}

.error-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('./images/error-icon.png') no-repeat;
    vertical-align: -4px;
    margin-right: 8px;
    margin-left: 8px;
}
</style>
<script>
var _ = require('../../lib/underscore.v1.8.3.js');
var $$settingsModel = require('../../script/data/model/settings.js');
var alert = require('../alert/alert');
var $$upload = require('../../lib/upload.js');
var uploadUrl = require('../../lib/uploadurl.js');
var companyId = "";
module.exports = {
    data: function() {
        return {
            cid: "",
            qualificationList: [],
            addQual: {
                name: "资质1",
                src: "/images/add-img.png",
                text: "请填写资质说明"
            },
            inputLen: "0",
            placeholder: {
                text: "请填写资质说明",
                status: true
            },
            imgUrl: "",
            imgMd5: "",
            pageInfo: {
                pageIndex: 1,
                pageSize: 5,
                totalNum: 100
            },
            checkRule: {
                textError: false,
                picError: false
            },
            alert: {
                show: false,
                message: '充值成功！',
                status: 0
            }
        }
    },
    components: {
        alert: alert
    },
    created: function() {
        if (!!(this.$route.params.cid)) {
            companyId = this.$route.params.cid;
        } else {
            companyId = '';
        }
    },
    activated: function() {
        this.getList();
    },
    beforeMount: function() {
        var _self = this;
        _self.getList();
    },
    mounted: function() {
        var _this = this;
        $$upload($('#selectFiles2'), uploadUrl, function(res) {
            if (JSON.parse(res).code === 0) {
                _this.imgUrl = JSON.parse(res).data.url;
                _this.imgMd5 = JSON.parse(res).data.md5;
            }
        });
    },
    methods: {
        changePage: function(val) {
            this.pageInfo.pageIndex = val;
            this.getList();
        },
        toastShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        getList: function() {
            var _self = this;
            var tmp = {};
            $$settingsModel.on("getQualificationList", function(res) {
                if (res.code === "200") {
                    _self.qualificationList.length = 0;
                    res.data.items.forEach(function(item) {
                        tmp.qId = item.id;
                        tmp.qImgUrl = item.url;
                        tmp.qDes = item.name;
                        _self.qualificationList.push(tmp);
                        tmp = {};
                    });
                    var len = _self.qualificationList.length;
                    _self.addQual.name = "资质" + (len + 1);
                }
            });
            $$settingsModel.getQualificationList(_self.wrapCid({
                qualificationType: 0
            }));
        },
        length: function() {
            var _self = this,
                len = _self.inputLen,
                text = _self.addQual.text;
            _self.inputLen = text.length;
            if (len >= 10) {
                _self.addQual.text = text.slice(0, 10);
            }
        },
        focus: function() {
            var _self = this,
                text = _self.addQual.text;
            if (text === "请填写资质说明") {
                _self.addQual.text = "";
                _self.placeholder.status = false;
            }
        },
        blur: function() {
            var _self = this,
                text = _self.addQual.text;
            if (text === "") {
                _self.placeholder.status = true;
                _self.addQual.text = "请填写资质说明";
            }
        },
        del: function(index, id) {
            var _self = this;
            $$settingsModel.on("deleteQualification", function(res) {
                if (res.code === "200") {
                    _self.getList();
                    _self.toastShow(0, '删除成功。');
                } else {
                    _self.toastShow(1, '删除失败，请重试。');
                }
            });
            $$settingsModel.deleteQualification(_self.wrapCid({
                "qualificationId": parseInt(id)
            }));
        },
        preserve: function() {
            var _self = this;
            var counter = "";
            var tmp = {};
            if (_self.addQual.text === "请填写资质说明" || _self.addQual.text.trim() === "") {
                _self.checkRule.textError = true;
                return;
            } else {
                if (_self.imgUrl === "") {
                    _self.checkRule.textError = false;
                    _self.checkRule.picError = true;
                    return;
                }
            }
            $$settingsModel.on("addQualification", function(res) {
                if (res.code === "200") {
                    _self.getList();
                    _self.imgUrl = "";
                    _self.addQual.text = "";
                    _self.checkRule.textError = false;
                    _self.checkRule.picError = false;
                    _self.inputLen = 0;
                    _self.toastShow(0, '信息提交成功。');
                } else {
                    _self.toastShow(1, '信息提交失败，请重试。');
                }
            });
            $$settingsModel.addQualification(_self.wrapCid({
                name: _self.addQual.text,
                qualificationType: 0,
                url: _self.imgUrl,
                description: ""
            }));
        },
        wrapCid: function(data) {
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        }
    }
};
</script>
