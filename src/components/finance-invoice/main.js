var $$financeModel = require('../../script/data/model/finance.js');
var tableComponent = require('../finance-invoice-table/finance-invoice-table.vue');
var alert = require('../alert/alert');
var $$upload = require('../../lib/lib-upload');
var uploadUrl = require('../../lib/uploadurl.js');
var companyId = "";
module.exports = {
    created: function() {
        if (!!(this.$route.params.cid)) {
            companyId = this.$route.params.cid;
        } else {
            companyId = '';
        }
    },
    data: function() {
        return {
            temp: '',
            backgroundUrl: '',
            uploaded: false,
            invoiceCount: '', //发票可开金额
            isNormal: true, //发票类型标志位
            invoiceType: 'normal', //发票类型
            checkRule: { //校验表单输入框标志位
                "headerRight": false,
                "headerError": false,
                "moneyError": false,
                "moneyRight": false,
                "moneyNumError": false,
                "contactsError": false,
                "contactsRight": false,
                "addressError": false,
                "addressRight": false,
                "telError": false,
                "telRight": false,
                "telNumError": false
            },
            taxCheckRule: {
                "comNameError": '',
                "comNameRight": '',
                "bankError": '',
                "bankRight": '',
                "addressError": '',
                "addressRight": '',
                "accountNumError": '',
                "accountError": '',
                "accountRight": '',
                "taxNumNumError": '',
                "taxNumError": '',
                "taxNumRight": '',
                "comTelNumError": '',
                "comTelError": '',
                "comTelRight": '',
                "picError": '',
                "picRight": ''
            },
            taxPayer: {
                "companyName": "",
                "bankAccount": "",
                "openBank": "",
                "taxManId": "",
                "companyAddress": "",
                "companyTel": "",
                "status": '',
                "statusName":'',
                "qualificationPic":''
            },
            inputTaxPayer: {
                "companyName": "",
                "bankAccount": "",
                "openBank": "",
                "taxManId": "",
                "companyAddress": "",
                "companyTel": "",
                "status":'',
                "statusName":'',
                "qualificationPic":''
            },
            invoiceInfo: {
                "invoiceHeader": '',
                "invoiceMoney": '',
                "invoiceContacts": '',
                "invoiceAddress": '',
                "invoiceTel": ''
            },
            picInfo: '', //纳税人材料图片标志位，false表示纳税人材料为空
            editSatus: '', //纳税人信息是否为可编辑状态，false为不可编辑
            checkTaxFlag: '',
            alert: {
                show: false,
                message: '提交成功！',
                status: 0
            }
        }
    },
    components: {
        'table-component': tableComponent,
        'alert': alert
    },
    beforeMount: function() {
        var self = this;
        $$financeModel.getLastInvoiceInfo(self.wrapCid({}), function(res) {
            if (res.code === '200' && res.data) {
                res.data = JSON.parse(res.data);
                if (!res.data.company) {
                    self.picInfo = false; //资料信息初始化为空
                    self.editSatus = true; //纳税人信息初始化为可编辑状态
                } else {
                    self.picInfo = true; //资料信息初始化不为空
                    self.editSatus = false; //纳税人信息初始化为不可编辑状态
                    self.taxPayer = {
                        "companyName": res.data.company,
                        "bankAccount": res.data.account,
                        "openBank": res.data.bank,
                        "taxManId": res.data.taxpayerCode,
                        "companyAddress": res.data.addr,
                        "companyTel": res.data.phone,
                        "qualificationPic": res.data.certMd5,
                        "status":res.data.status,
                        "statusName":res.data.statusName
                    };
                    self.backgroundUrl = res.data.certMd5;
                    self.inputTaxPayer = {
                        "companyName": res.data.company,
                        "bankAccount": res.data.account,
                        "openBank": res.data.bank,
                        "taxManId": res.data.taxpayerCode,
                        "companyAddress": res.data.addr,
                        "companyTel": res.data.phone,
                        "qualificationPic": res.data.certMd5,
                        "status":res.data.status,
                        "statusName":res.data.statusName
                    };
                }
            }
        });
        $$financeModel.on('setInvoiceInfo', function(res) {
            if (res.code == "200") {
                self.alertShow(0, '提交信息成功');
                var keys;
                for (keys in self.invoiceInfo) {
                    self.invoiceInfo[keys] = '';
                }
                for (keys in self.checkRule) {
                    self.checkRule[keys] = false;
                }
                //刷新发票记录
            }
        });
        $$financeModel.getInvoiceCount(function(res) {
            if (res.business.code === "200") {
                self.invoiceCount = res.business.data.amount;
            }
        });
    },
    methods: {
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        wrapCid: function(data) {
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        },
        selectInvoiceType: function(type) {
            if (type == "normal") {
                this.invoiceType = "normal";
                this.isNormal = true;
            } else {
                this.invoiceType = "nonormal";
                this.isNormal = false;
            }
            var keys;
            for (keys in this.checkRule) {
                this.checkRule[keys] = '';
            }
            this.invoiceInfo.invoiceHeader = '';
            this.invoiceInfo.invoiceMoney = '';
        },
        verifyInfo: function(info, type, tax) {
            if (tax) {
                if (info) {
                    this.taxCheckRule[type + 'Right'] = true;
                    this.taxCheckRule[type + 'Error'] = false;
                } else {
                    this.taxCheckRule[type + 'Right'] = false;
                    this.taxCheckRule[type + 'Error'] = true;
                }
            } else {
                if (info) {
                    this.checkRule[type + 'Right'] = true;
                    this.checkRule[type + 'Error'] = false;
                } else {
                    this.checkRule[type + 'Right'] = false;
                    this.checkRule[type + 'Error'] = true;
                }
            }
        },
        verifyNum: function(info, type, tax) {
            if (tax) {
                if (info) {
                    if (/^[0-9]*$/.test(info)) {
                        this.taxCheckRule[type + 'Right'] = true;
                        this.taxCheckRule[type + 'Error'] = false;
                        this.taxCheckRule[type + 'NumError'] = false;
                    } else {
                        this.taxCheckRule[type + 'Right'] = false;
                        this.taxCheckRule[type + 'Error'] = false;
                        this.taxCheckRule[type + 'NumError'] = true;
                    }
                } else {
                    this.taxCheckRule[type + 'Right'] = false;
                    this.taxCheckRule[type + 'Error'] = true;
                    this.taxCheckRule[type + 'NumError'] = false;
                }
            } else {
                if (info) {
                    if (/^[0-9]*$/.test(info)) {
                        this.checkRule[type + 'Right'] = true;
                        this.checkRule[type + 'Error'] = false;
                        this.checkRule[type + 'NumError'] = false;
                    } else {
                        this.checkRule[type + 'Right'] = false;
                        this.checkRule[type + 'Error'] = false;
                        this.checkRule[type + 'NumError'] = true;
                    }
                } else {
                    this.checkRule[type + 'Right'] = false;
                    this.checkRule[type + 'Error'] = true;
                    this.checkRule[type + 'NumError'] = false;
                }
            }
            if (this.taxPayer.status == '1' || this.isNormal) {
                if (+this.invoiceInfo.invoiceMoney >= 100 && parseInt(this.invoiceInfo.invoiceMoney) === +this.invoiceInfo.invoiceMoney && +this.invoiceInfo.invoiceMoney <= +this.invoiceCount) {
                    this.checkRule.moneyRight = true;
                    this.checkRule.moneyError = false;
                    this.checkRule.moneyNumError = false;
                } else {
                    this.checkRule.moneyRight = false;
                    this.checkRule.moneyError = false;
                    this.checkRule.moneyNumError = true;
                }
            }
        },
        changeEditSatus: function() {
            var self = this;
            self.picInfo = true;
            self.editSatus = true;
            self.temp = self.taxPayer.qualificationPic;

            var keys;
            for(keys in this.taxPayer) {
                this.inputTaxPayer[keys] = this.taxPayer[keys];
            }

            var getMd5 = function (url) {
                var pieces = url.split('/'), len = pieces.length;
                return pieces[len - 1];
            };

            if (this.taxPayer.qualificationPic) {
                this.inputTaxPayer.certMd5 = getMd5(this.taxPayer.qualificationPic);
            }

            $$upload({
                id: '#selectFiles3',
                uploadUrl: uploadUrl,
                fileName: 'file',
                min: 0,
                max: 1024 * 1024,
                type: '*',
                fn: function (res) {
                    if (res.code === 0) {
                        self.picInfo = true;
                        self.taxCheckRule.picRight = true;
                        self.taxCheckRule.picError = false;
                        self.backgroundUrl = res.data.url;
                        self.inputTaxPayer.certMd5 = res.data.md5 + "." + res.data.file_type;
                        self.temp = self.taxPayer.qualificationPic;
                        self.taxPayer.qualificationPic = self.backgroundUrl;
                        self.uploaded = true;
                    }
                }
            });


            // $$upload($('#selectFiles3'), uploadUrl, function(res) {
            //     if (JSON.parse(res).code === 0) {
                    
            //     }
            // });
        },
        //发票信息保存修改
        saveChange: function() {
            this.checkTaxFlag = true;
            var keys;
            for (keys in this.inputTaxPayer) {
                if (!this.inputTaxPayer[keys]) {
                    if (keys != 'status' && keys != 'statusName' && keys != 'qualificationPic') {
                        this.checkTaxFlag = false;
                    };
                }
            }
            if (!this.picInfo) {
                this.taxCheckRule.picError = true;
            }
            if (this.checkTaxFlag && this.picInfo) {
                //验证通过可以提交信息

                var self = this;
                var params = {};
                params.company = this.inputTaxPayer.companyName;
                params.bank = this.inputTaxPayer.openBank;
                params.account = this.inputTaxPayer.bankAccount;
                params.taxpayerCode = this.inputTaxPayer.taxManId;
                params.addr = this.inputTaxPayer.companyAddress;
                params.phone = this.inputTaxPayer.companyTel;
                params.certMd5 = this.inputTaxPayer.certMd5;
                $$financeModel.setTaxManInfo(params, function(res) {
                    if (res.code == "200") {
                        for (keys in self.taxCheckRule) {
                            self.taxCheckRule[keys] = '';
                        }
                        self.picInfo = true;
                        self.editSatus = false;
                        for(keys in self.inputTaxPayer){
                            self.taxPayer[keys] = self.inputTaxPayer[keys];
                        }
                        self.taxPayer.qualificationPic =self.backgroundUrl; 
                        self.alertShow(0, '修改信息成功');
                    } else {
                        self.alertShow(0, '修改信息失败!');

                    }
                });
            }
        },
        //取消修改
        cancelChange: function(){
            this.editSatus = false;
            this.taxPayer.qualificationPic = this.temp;
            var keys;
            for (keys in this.taxCheckRule) {
                this.taxCheckRule[keys] = '';
            }
        },
        //提交申请
        submitInfo: function(invoiceInfo) {
            var self = this;
            invoiceInfo.type = this.invoiceType;
            if (this.invoiceInfo.invoiceHeader == '') {
                this.checkRule.headerRight = false;
                this.checkRule.headerError = true;
                return false;
            }
            if (this.invoiceInfo.invoiceMoney == '') {
                this.checkRule.moneyRight = false;
                this.checkRule.moneyError = true;
                this.checkRule.moneyNumError = false;
                return false;
            }
            if (parseInt(this.invoiceInfo.invoiceMoney) > parseInt(this.invoiceCount)) {
                this.checkRule.moneyRight = false;
                this.checkRule.moneyError = false;
                this.checkRule.moneyNumError = true;
                return false;
            }
            if (this.invoiceInfo.invoiceContacts == '') {
                this.checkRule.contactsRight = false;
                this.checkRule.contactsError = true;
                return false;
            }
            if (this.invoiceInfo.invoiceAddress == '') {
                this.checkRule.addressRight = false;
                this.checkRule.addressError = true;
                return false;
            }
            if (this.invoiceInfo.invoiceTel == '') {
                this.checkRule.telRight = false;
                this.checkRule.telError = true;
                this.checkRule.telNumError = false;
                return false;
            }
            if (this.checkRule.headerRight && this.checkRule.moneyRight && this.checkRule.contactsRight && this.checkRule.addressRight && this.checkRule.telRight) {
                //提交申请
                $$financeModel.setInvoiceInfo(this.wrapCid(invoiceInfo));
                $$financeModel.getInvoiceCount(function(res) {
                    if (res.business.code === "200") {
                        self.invoiceCount = res.business.data.amount;
                        location.reload();
                    }
                });
            }
        }
    }
}