<template>
    <div class="status">
        <div data-tip="信息已提交" v-if="this.submitOk" class="info-wrap">
            <span class="status-icon success"></span>
            <p class="title">您的信息已提交成功</p>
            <p class="reason">审核结果将在7个工作日内反馈，请您耐心等待</p>
            <div class="opearte">
            </div>
        </div>

        <div data-tip="审核通过" v-if="!this.submitOk && this.auditStatus == '200'" class="info-wrap">
            <p class="title">审核通过</p>
            <div class="opearte">

            </div>
        </div>

        <div data-tip="审核中" v-if="!this.submitOk && this.auditStatus == '405'" class="info-wrap">
            <span class="status-icon error"></span>
            <p class="title">审核中</p>
            <p class="reason">您的资料正在审核中，请您耐心等待</p>
            <div class="opearte">

            </div>
        </div>

        <div data-tip="审核拒绝，可重新编辑" v-if="!this.submitOk && this.auditStatus == '406'" class="info-wrap">
            <span class="status-icon error"></span>
            <p class="title">审核未通过</p>
            <p class="reason">{{rejectReason}}</p>
            <div class="opearte">
                <router-link :to="{ name: 'qualification_chose' }" replace>
                    <span class="btn red">重新上传</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .info-wrap {
        width: 500px;
        margin: 0 auto;
    }

    .status {
        margin-top: 20px;
        padding: 200px 0 400px;
        background-color: #fff;
        text-align: center;
        font-family: "微软雅黑";
    }

    .status-icon {
        display: block;
        margin: 0px auto;
        width: 46px;
        height: 46px;
    }

    .success {
        background: url("./img/success.png") no-repeat;
    }

    .error {
        background: url("./img/error.png") no-repeat;
    }

    .title {
        margin-top: 21px;
        font-size: 28px;
        color: #333;
    }

    .reason {
        margin-top: 28px;
        font-size: 16px;
        color: #666;
    }

    .btn {
        display: inline-block;
        margin: 60px 10px 0px 10px;
        width: 112px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 1px;
        font-size: 14px;
        border: solid 1px #dfdfdf;
        cursor: pointer;
    }

    .btn.grey {
        background-color: #f8f8f8;
        color: #333;
    }

    .btn.red {
        background-color: #ee4433;
        border-color: #e03221;
        color: #fff;
    }

    .btn.grey:hover {
        background-color: #eee;
        border-color: #dfdfdf;

    }

    .btn.red:hover {
        background-color: #db3f2f;
        border-color: #e03221;
        color: #fff;
    }
</style>
<script>
    var $$qualiModel = require('../../script/data/model/qualification.js');

    module.exports = {
        data: function () {
            return {
                submitOk: false,
                auditStatus: '',
                type: '',
                rejectReason: '您的信息不完善或有误，请重新完善资料',
            }
        },
        activated: function () {
            var _this = this;
            _this.auditStatus = this.$route.query.type;
        }
    }
</script>

