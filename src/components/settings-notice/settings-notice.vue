<template>
    <div class="settinngs-notice">
        <!-- <div class="item">
            <span class="left">邮箱：</span>
            <div class="right">
                <div class="group">
                    <div class="email-info" v-for="(item,index) in emailGroup">
                        <span>{{item.email}}</span>
                        <span class="delete" @click="deleteEmail(index, item.email)"></span>
                    </div>
                </div>
                <span class="add-btn" @click="addEmail">添加邮箱地址</span>
            </div>
        </div> -->
        <div class="item">
            <span class="left">手机：</span>
            <div class="right">
                <div class="group">
                    <div class="phone-info" v-for="(item, index) in phoneGroup">
                        <span>{{item.mobile}}</span>
                        <span class="delete" @click="deletePhone(index, item.mobile)"></span>
                    </div>
                </div>
                <span class="add-btn" @click="addPhone">添加手机号码</span>
            </div>
        </div>
        <h2 class="notice-source">通知渠道：</h2>
        <table class="notice-table">
            <tr>
                <th class="con-left">消息类别</th>
                <th class="con-left">消息名称</th>
                <th>站内信</th>
                <!-- <th>邮箱</th> -->
                <th>手机短信</th>
            </tr>
            <tr v-for="(item, index) in notice">
                <td class="con-left">{{item.noticeTypeTxt}}</td>
                <td class="con-left">{{item.noticeName}}</td>
                <td>
                    <!-- <span :class="classObject(item.webInMail)" v-if="edit"></span>
                    <label :class="checkboxClass(item.webInMail)" v-if="!edit" @click="changeCheckbox(index, 'webInMail')"></label> -->
                    <span :class="classObject(item.webInMail)"></span>
                </td>
                <!-- <td>
                    <span :class="classObject(item.email)" v-if="edit"></span>
                    <label :class="checkboxClass(item.email)" v-if="!edit" @click="changeCheckbox(index, 'email')"></label>
                </td> -->
                <td>
                    <span :class="classObject(item.sms)" v-if="edit"></span>
                    <label :class="checkboxClass(item.sms)" v-if="!edit" @click="changeCheckbox(index, 'sms')"></label>
                </td>
            </tr>
        </table>
        <div class="table-operate">
            <span class="btn" v-if="edit" @click="editHandle">编辑</span>
            <span class="btn cancel" v-if="!edit" @click="cancelHandle">取消</span>
            <span class="btn" v-if="!edit" @click="submit">确定</span>
        </div>
        <div :class="['mask-screen', {show: maskScreen}]"></div>
        <div :class="['dialog-email-wrapper', {show: emailDialog}]">
            <div class="dialog">
                <div class="dialog-inner">
                    <div class="dialog-con">
                        <i class="close" @click="hideEmailDialog"></i>
                        <div class="item">
                            <span class="left">输入邮箱：</span>
                            <div class="right">
                                <input v-model="email" type="text" class="input-con email" placeholder="请输入正确的邮箱名" @change="emailChange">
                            </div>
                            <span class="error-info" v-if="emailError"><i class="error-icon"></i>请输入正确的邮箱</span>
                        </div>
                        <div class="item operate">
                            <span class="btn" @click="addEmailSubmit">确定</span>
                            <span class="btn cancel" @click="hideEmailDialog">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="['dialog-phone-wrapper', {show: phoneDialog}]">
            <div class="dialog">
                <div class="dialog-inner">
                    <div class="dialog-con">
                        <i class="close" @click="hidePhoneDialog"></i>
                        <div class="item">
                            <span class="left">输入手机：</span>
                            <div class="right">
                                <input v-model="phone" type="text" class="input-con phone" placeholder="请输入正确的手机号码" @change="phoneChange">
                            </div>
                            <span class="error-info" v-if="phoneError"><i class="error-icon"></i>请输入正确的手机号码</span>
                        </div>
                        <div class="item">
                            <span class="left">短信验证：</span>
                            <div class="right">
                                <input type="text" class="input-con ver-code" placeholder="请输入短信验证码" @change="codeChange" v-model="code">
                                <span class="get-code" @click="getCode" v-if="!secondEle">获取验证码</span>
                                <span class="get-code" v-if="secondEle">{{timer}}s</span>
                            </div>
                            <span class="error-info" v-if="codeError"><i class="error-icon"></i>请输入短信验证码</span>
                        </div>
                        <div class="item operate">
                            <span class="btn" @click="addPhoneSubmit">确定</span>
                            <span class="btn cancel" @click="hidePhoneDialog">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<style scoped>
.mask-screen {
    position: fixed;
    display: none;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: none repeat scroll 0% 0% #000;
    opacity: 0.5;
    z-index: 10001;
}

.dialog-email-wrapper.show,
.dialog-phone-wrapper.show,
.mask-screen.show {
    display: block;
}

.dialog-email-wrapper,
.dialog-phone-wrapper {
    position: fixed;
    display: none;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 10002;
}

.dialog {
    display: table;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #333333;
    overflow: hidden;
}

.dialog-inner {
    display: table-cell;
    width: 485px;
    border: solid 1px #d5d5d5;
    text-align: center;
    vertical-align: middle;
}

.dialog-con {
    position: relative;
    display: inline-block;
    width: 485px;
    background-color: #FFF;
    padding-top: 30px;
    padding-bottom: 20px;
}

.dialog .input-con {
    height: 38px;
    line-height: 38px;
    border: solid 1px #d5d5d5;
}

.dialog .right {
    text-align: left;
}

.dialog .close {
    position: absolute;
    display: block;
    right: 17px;
    top: 18px;
    width: 14px;
    height: 14px;
    background: url("./images/guanbi.png") no-repeat;
    cursor: pointer;
}

.dialog .item {
    position: relative;
    margin-left: 30px;
    text-align: left;
    overflow: visible;
}

.dialog .item.operate {
    margin-left: 90px;
}

.dialog .email,
.dialog .phone {
    padding-left: 10px;
    width: 338px;
}

.dialog .ver-code {
    margin-right: 10px;
    padding-left: 10px;
    width: 228px;
}

.dialog .get-code {
    display: inline-block;
    width: 98px;
    height: 38px;
    line-height: 38px;
    border: solid 1px #d5d5d5;
    border-radius: 1px;
    text-align: center;
    vertical-align: middle;
    background-color: #f6f6f6;
    cursor: pointer;
}

.dialog .get-code.hide {
    display: none;
}

.error-info {
    position: absolute;
    left: 74px;
    bottom: -18px;
    height: 16px;
    font-size: 14px;
    letter-spacing: 0px;
    color: #ee4433;
    vertical-align: middle;
}

.error-icon {
    display: inline-block;
    margin-right: 4px;
    width: 16px;
    height: 16px;
    background: url("./images/error-icon.png") no-repeat;
    vertical-align: middle;
}

.settinngs-notice {
    padding: 12px 40px 0px 40px;
}

.item {
    margin-top: 20px;
    overflow: hidden;
}

.left {
    display: block;
    float: left;
    font-size: 14px;
    color: #333333;
    height: 38px;
    line-height: 38px;
}

.right {
    overflow: hidden;
}

.email-info,
.phone-info {
    display: inline-block;
    padding: 0 18px 0 12px;
    margin: 0 14px 10px 0;
    height: 38px;
    line-height: 38px;
    background-color: #eaeaea;
    border-radius: 17px;
    font-size: 14px;
    color: #666666;
}

.email-no {
    color: #ff6246;
}

.delete {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url("./images/guanbi.png") no-repeat;
    cursor: pointer;
}

.add-btn {
    position: relative;
    display: block;
    padding-left: 36px;
    width: 94px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #333333;
    border: solid 1px #d5d5d5;
    border-radius: 1px;
    cursor: pointer;
}

.add-btn:before {
    position: absolute;
    top: 50%;
    left: 15px;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    content: "";
    background: url("./images/add.png") no-repeat;
}

.notice-source {
    margin: 40px 0px 10px 0px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}

.notice-table {
    width: 100%;
    border: solid 1px #d8d8d8;
    text-align: center;
}

.notice-table tr {
    height: 40px;
}

.notice-table .con-left {
    text-align: left;
}

.notice-table th {
    text-align: center;
    border-right: none;
    border-bottom: solid 1px #bbbbbb;
    padding: 0px 10px;
}

.notice-table tr td {
    border-right: solid 1px #eeeeee;
    border-bottom: solid 1px #d8d8d8;
    padding: 0px 10px;
}

.notice-table tr:nth-child(2n+1) {
    background-color: #f8f8f8;
}

.notice-table tr:nth-child(2n+0) {
    background-color: #fff;
}

.notice-table .number {
    font-family: "Arial";
}

.notice-table .suffix {
    color: #a6a6a6;
}

.checkbox-enable {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("./images/check.png") center no-repeat;
    cursor: pointer;
}

.checkbox-enable.checked {
    background: url("./images/check-select.png") center no-repeat;
}

.default-con {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("./images/line.png") center no-repeat;
}

.default-con.select {
    background: url("./images/select-icon.png") center no-repeat;
}

.table-operate {
    height: 60px;
    line-height: 60px;
    border: solid 1px #d8d8d8;
    border-top: none;
}

.btn {
    display: inline-block;
    margin-left: 10px;
    width: 74px;
    height: 38px;
    border: solid 1px #eb5237;
    line-height: 38px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background-color: #ff6246;
    border-radius: 1px;
    cursor: pointer;
}

.btn.cancel {
    background-color: #f6f6f6;
    border-color: #d5d5d5;
    color: #333333;
}
</style>
<script>
var $$settingsModel = require('../../script/data/model/settings.js');
var alert = require('../alert/alert');
var companyId = "";
exports.data = function() {
    return {
        cid: "",
        email: "",
        phone: "",
        emailGroup: [],
        phoneGroup: [],
        edit: true,
        notice: [],
        noticeInitial: [],
        maskScreen: false,
        emailDialog: false,
        phoneDialog: false,
        codeError: false,
        phoneError: false,
        emailError: false,
        code: "",
        timer: 60,
        secondEle: false,
        alert: {
            show: false,
            message: '充值成功！',
            status: 0
        },
        time: ""
    }
};
exports.components = {
    alert: alert
};
exports.methods = {
    getList: function() {
        var _this = this;
        var tmp = {};
        $$settingsModel.on("getNoticeContactList", function(res) {
            if (parseInt(res.code) === 200) {
                _this.emailGroup.length = 0;
                _this.phoneGroup.length = 0;
                _this.noticeInitial.length = 0;
                _this.notice.length = 0;
                res.data.notfiyEmails.forEach(function(item) {
                    tmp.email = item.item;
                    tmp.isCertificate = item.verified;
                    _this.emailGroup.push(tmp);
                    tmp = {};
                });
                res.data.notifyMobiles.forEach(function(item) {
                    tmp.mobile = item.item;
                    tmp.isCertificate = item.verified;
                    _this.phoneGroup.push(tmp);
                    tmp = {};
                });
                res.data.notifySettings.forEach(function(item) {
                    tmp.noticeTypeTxt = item.msgType;
                    tmp.noticeTypeCode = item.msgClassId;
                    tmp.noticeName = item.msgName;
                    tmp.webInMail = item.sysMsgNotify;
                    tmp.email = item.mailNotify;
                    tmp.sms = item.smsNotify;
                    tmp.msgClassId = item.msgClassId;
                    _this.notice.push(tmp);
                    _this.noticeInitial.push(tmp);
                    tmp = {};
                });
            }
        });
        $$settingsModel.getNoticeContactList(_this.wrapCid({}));
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
    classObject: function(isSelect) {
        return {
            'default-con': true,
            'select': isSelect === 'true'
        }
    },
    checkboxClass: function(isChecked) {
        return {
            'checkbox-enable': true,
            'checked': isChecked === 'true'
        }
    },
    isEmail: function(str) {
        var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        return reg.test(str);
    },
    isPhone: function(str) {
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        return reg.test(str);
    },
    isCode: function(str) {
        var reg = /^[0-9]{6}$/;
        return reg.test(str);
    },
    phoneChange: function() {
        this.phoneError = !this.isPhone(this.phone);
    },
    emailChange: function() {
        this.emailError = !this.isEmail(this.email);
    },
    codeChange: function() {
        this.codeError = !this.isCode(this.code);
    },
    getCode: function() {
        var _this = this;
        this.phoneChange();
        if (this.phoneError) {
            return;
        }
        $$settingsModel.getSmsCheckCode({
            mobile: _this.phone
        }, function(res) {
            if (res.getMsg.code === '400') {
                _this.toastShow(1, res.getMsg.msg);
            } else if (res.getMsg.code === '200') {
                _this.changeVerificationStatus.apply(_this);
            }
        });
    },
    changeVerificationStatus: function() {
        var self = this;
        self.secondEle = true;
        self.time = setInterval(function() {
            --self.timer;
            if (self.timer === 0) {
                clearInterval(self.time);
                self.timer = 60;
                self.secondEle = false;
            }
        }, 1000);
    },
    showEmailDialog: function() {
        this.maskScreen = true;
        this.emailDialog = true;
    },
    hideEmailDialog: function() {
        this.maskScreen = false;
        this.emailDialog = false;
        this.emailError = false;
        this.email = "";
    },
    showPhoneDialog: function() {
        this.maskScreen = true;
        this.phoneDialog = true;
    },
    hidePhoneDialog: function() {
        this.maskScreen = false;
        this.phoneDialog = false;
        this.phoneError = false;
        this.codeError = false;
        this.phone = "";
        this.code = "";
        this.secondEle = false;
        this.timer = 60;
        window.clearInterval(this.time);
    },
    addEmail: function() {
        this.showEmailDialog();
    },
    addPhone: function() {
        this.showPhoneDialog();
    },
    addEmailSubmit: function() {
        var _this = this;
        this.emailChange();
        if (this.emailError) {
            return;
        }
        $$settingsModel.addNoticeEmail(_this.wrapCid({
            "email": this.email
        }), function(res) {
            if (res.code === "200") {
                _this.emailGroup.push({
                    "email": _this.email,
                    "verified": false
                });
                _this.hideEmailDialog();
                _this.toastShow(0, '添加邮箱成功');
            } else if (res.code === "400") {
                _this.toastShow(1, res.msg);
            } else {
                _this.toastShow(1, '添加邮箱失败，请重试');
            }
        });
    },
    addPhoneSubmit: function() {
        var _this = this;
        this.phoneChange();
        this.codeChange();
        if (this.phoneError || this.codeError) {
            return;
        }
        // _this.phoneGroup.forEach(function(item) {
        //     if (item.mobile = _this.phone) {
        //         _this.toastShow(1, '手机号码已存在！');
        //     }
        // });
        $$settingsModel.addNoticeMobile(_this.wrapCid({
            "mobile": _this.phone,
            "verificationCode": _this.code
        }), function(res) {
            if (parseInt(res.code) === 200) {
                _this.phoneGroup.push({
                    "mobile": _this.phone,
                    "verified": true
                });
                _this.hidePhoneDialog();
                _this.toastShow(0, '添加手机号成功');
            } else {
                _this.toastShow(1, res.msg);
            }
        });
    },
    deleteEmail: function(index, email) {
        var _this = this;
        $$settingsModel.deleteNoticeEmail(_this.wrapCid({
            "email": email
        }), function(res) {
            if (res.code === "200") {
                _this.emailGroup.splice(index, 1);
                _this.toastShow(0, '删除成功');
            } else {
                _this.toastShow(1, '删除失败，请重试');
            }
        });
    },
    deletePhone: function(index, phone) {
        var _this = this;
        $$settingsModel.deleteNoticeMobile(_this.wrapCid({
            "mobile": phone
        }), function(res) {
            if (res.code === "200") {
                _this.phoneGroup.pop(index);
                _this.toastShow(0, '删除成功');
            } else {
                _this.toastShow(1, '删除失败，请重试');
            }
        });
    },
    changeCheckbox: function(index, name) {
        for (var key in this.notice) {
            if (parseInt(key, 10) === index) {
                if (this.notice[index][name] === 'true') {
                    this.notice[index][name] = 'false';
                } else {
                    this.notice[index][name] = 'true';
                }
            }
        }
    },
    editHandle: function() {
        this.edit = false;
    },
    cancelHandle: function() {
        this.edit = true;
        this.notice = JSON.parse(JSON.stringify(this.noticeInitial));
    },
    submit: function() {
        var _this = this;
        var tmp = {};
        var params = [];
        this.notice.forEach(function(item) {
            tmp.msgClassId = item.msgClassId;
            tmp.sysMsgNotify = item.webInMail;
            tmp.smsNotify = item.sms;
            tmp.mailNotify = item.email;
            params.push(tmp);
            tmp = {};
        });
        $$settingsModel.on("setNoticeStyle", function(res) {
            if (res.code === "200") {
                _this.noticeInitial = JSON.parse(JSON.stringify(_this.notice));
                _this.edit = true;
            }
        });
        $$settingsModel.setNoticeStyle(params);
    },
    wrapCid: function(data) {
        if (companyId !== '') {
            data.cid = companyId;
        }
        return data;
    }
};
exports.created = function() {
    if (!!(this.$route.params.cid)) {
        companyId = this.$route.params.cid;
    } else {
        companyId = '';
    }
};
exports.activated = function() {
    this.getList();
};
exports.beforeMount = function() {
    this.getList();
}
</script>
