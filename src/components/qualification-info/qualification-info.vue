<template>
    <div>
        <div class="form-wrap">
            <info-company ref="info-company"></info-company>
            <info-contact ref="info-contact"></info-contact>
            <div class="btn-wrap">
                <router-link :to="{ name: 'qualification_chose', params: {}}" class="btn last-step">上一步</router-link>
                <a href="javascript:void(0)" @click.prevent="validate" class="btn submit">提交</a>
            </div>
            <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        </div>
    </div>
</template>
<style scoped>
    .refuse-tip-wrap {
        position: relative;
        margin: 0 auto 20px;
        width: 870px;
        height: 80px;
        line-height: 80px;
        border: 1px solid #FFD56A;
        background-color: #FFFBE9;
    }

    .refuse-tip {
        margin-left: 65px;
        font-size: 18px;
        color: #333;

    }

    .refuse-tip:before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 20px;
        top: 25px;
        width: 33px;
        height: 33px;
        background: url('./images/refuse-tip-icon.png')
    }

    .form-wrap {
        margin: 0 auto;
        width: 870px;
    }

    .form-wrap .account-type {
        padding: 20px 0 35px;
        font-size: 14px;
        color: #333;
    }

    .account-type-item {
        margin-right: 10px;
    }

    .account-type-item:before {
        content: '';
        margin-right: 5px;
        display: inline-block;
        width: 15px;
        height: 15px;
        vertical-align: text-top;
        background: url('./images/type1-icon.png');
    }

    .account-type-item.cur:before {
        background: url('./images/type2-icon.png');
    }

    .btn-wrap {
        padding-bottom: 60px;
        text-align: center;
    }

    .btn-wrap .btn {
        display: inline-block;
        width: 160px;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        text-align: center;

    }

    .btn-wrap .btn.last-step {
        color: #333;
        border: 1px solid #DFDFDF;
        background-color: #F8F8F8;
    }

    .btn-wrap .btn.submit {
        margin-left: 40px;
        color: #fff;
        border: 1px solid #DFDFDF;
        background-color: #EE4433;
    }

    .agreement-wrap {
        border-top: 1px solid #DFDFDF;
        padding-left: 127px;
        line-height: 70px;
        font-size: 14px;
    }

    .agreement-wrap i {
        position: relative;
        display: inline-block;
        top: 3px;
        margin-right: 10px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background-image: url('./images/agreement-icon.png');
        background-position: 0 17px;
    }

    .agreement-wrap.checked i {
        background-position: 0 0;
    }

    .agreement-wrap .link {
        color: #EE4433;
    }


</style>
<script>
    var infoCompany = require('../info-company/info-company.vue');
    var infoContact = require('../info-contact/info-contact.vue');
    var $$enum = require('../../lib/enum.json');
    var _ = require('../../lib/underscore.v1.8.3.js');
    var $$qualiModel = require('../../script/data/model/qualification.js');
    var alert = require('../alert/alert');

    module.exports = {
        data: function () {
            return {
                valid: false,
                agree: true,
                ruzhuTypesMap: $$enum.ruzhuTypes,
                userType: 0,
                alert: {
                    show: false,
                    message: 'xxx',
                    status: 1
                }
            }
        },
        props: {
            type: {
                type: Number
            }
        },
        computed: {
            isCompanyShown: function () {
                return this.type && this.type !== 3; // person类型无公司信息
            },
            validTotal: function () {
                return this.isCompanyShown ? 3 : 2;
            }
        },
        components: {
            'info-company': infoCompany,
            'info-contact': infoContact,
            'alert': alert
        },
        beforeMount: function () {
            this.userType = this.type;
        },
        methods: {
            changeType: function (type) {
                this.type = type;
            },
            clickAgree: function () {
                this.agree = !this.agree;
            },
            validate: function () {
                var valid1 = true;
                var valid2 = '';
                valid1 = this.$refs['info-company'].validate();
                valid2 = this.$refs['info-contact'].validate();
                if (valid1 && valid2) {
                    if (!this.agree) {
                        this.toast(1, "请勾选同意!");
                        return;
                    }
                    this.submit();
                } else if (this.type !== 0 && this.type !== 1) {
                    this.toast(1, "请退回选择您的类型");
                    return;
                } else {
                    this.toast(1, "请正确填写各字段！");
                    return;
                }
            },
            submit: function () {
                var that = this;
                var formData1 = this.$refs['info-company'].form;
                var formData2 = this.$refs['info-contact'].form;
                var formData = {
                    company: formData1.organizationName,
                    type: that.type,
                    cityId: parseInt(formData1.cityId),
                    businessLicenceCode: formData1.organizationCode,
                    businessLicenceUrl: formData1.licenceUrl,
                    mobile: formData2.mobile,
                    qq: formData2.qq,
                    email: formData2.email,
                    contactName: formData2.contactName,
                    address: formData2.addressDetail
                };
                $$qualiModel.submitAccInfo(formData, function (res) {
                    if (res.submitAccInfo.code == "200") {
                        //给audit页面传值
                        that.toast(0, "请求成功");
                        $$qualiModel.isSubmit(true);
                        that.$router.push('/qualification/audit?type=405');
                    } else {
                        that.toast(0, "请求失败");
                        return;
                    }
                });
            },
            toast: function (status, msg) {
                var _this = this;
                this.alert.status = status;
                this.alert.message = msg;
                this.alert.show = true;
                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 1000);
            }
        }
    }

</script>
