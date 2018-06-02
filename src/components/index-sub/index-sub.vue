<template>
    <div class="index-sub">
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <editCompany ref="editCompany"></editCompany>
        <!-- 头部 -->
        <div>
            <div class="info-line1">
                <span class="name">{{ tableData.demanderName }}</span>
                <span class="status">客户ID : {{ tableData.demanderId }}</span>
                <span class="status" v-show="tableData.status == 2">已认证通过</span>
                <div class="r-wrap">
                    <!-- 审核失败 -->
                    <span class="subAccount w-113" @click="editSub" v-if="tableData.status == 3">
                        修改账号信息
                    </span>
                    <!-- 审核通过 -->
                    <span class="subAccount w-113" @click="checkSub" v-if="tableData.userName">
                        查看子客账号
                    </span>
                    <!-- 审核通过 || 审核中 -->
                    <span class="subAccount w-113" @click="addSub" v-if="tableData.status == 2 && !tableData.userName">
                        子客账号
                    </span>
                    <router-link class="btn btn1" :to="getSubLink(demanderID)" v-if="tableData.status != 1">
                        进入后台
                    </router-link>
                </div>
            </div>
            <div class="info-line2">
                <span class="label">累计配额：</span>
                <span class="value">{{ tableData.totalQuota | moneyFormat }}</span>
                <span class="label">可用余额：</span>
                <span class="value">{{ tableData.availableBalance | moneyFormat }}</span>
            </div>
        </div>
        
        <!-- account部分 -->
        <div class="account">
            <div class="account-right">
                <dl>
                    <dt>创意统计</dt>
                    <dd>已通过：<a @click="changeStatus(2)" class="href-link">{{ dataStatus.passed }}</a></dd>
                    <dd>待审核：<a @click="changeStatus(1)" class="href-link">{{ dataStatus.check }}</a></dd>
                    <dd>未通过：<a @click="changeStatus(3)" class="href-link">{{ dataStatus.nopass }}</a></dd>
                </dl>
            </div>

            <div class="account-left">
                <div class="account-left-con">
                    <span class="acc-name">今日消耗</span>
                    <span class="acc-num">{{ tableData.todayCost | moneyFormat }}</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">
                        现金金额
                        <span class="modify-quota" @click="modifyQuota">
                            修改配额 
                        </span>
                    </span>
                    <span class="acc-num">{{ tableData.totalBalance | moneyFormat }}</span>
                    <span class="acc-use">( 可用￥{{tableData.availableBalance | moneyFormat }} )</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">赠款余额</span>
                    <span class="acc-num">{{ tableData.totalGrant | moneyFormat }}</span>
                    <span class="acc-use">( 可用￥{{tableData.availableGrant | moneyFormat }} )</span>
                </div>
            </div>
        </div>
        
        <!-- 整体数据部分 -->
        <div class="select-section">
            <span class="totalData">整体数据：</span>
            <div class="select">
                <selecter v-on:change="changeChartSelect(arguments[0])" :defaultIndex="0" :options="datasetOptions" />
            </div>
            <div class="section-tab">
                <div class="section-tab-item">
                    <p class="item-data item-expose">{{ overData.expose | amountFormat }}</p>
                    <p class="item-name">曝光量</p>
                </div>
                <div class="section-tab-item">
                    <p class="item-data item-click">{{ overData.click | amountFormat }}</p>
                    <p class="item-name">点击量</p>
                </div>
                <div class="section-tab-item">
                    <p class="item-data item-clickRate">{{ overData.clickRate }}</p>
                    <p class="item-name">点击率</p>
                </div>
                <div class="section-tab-item">
                    <p class="item-data item-cost">￥{{ overData.cost | moneyFormat }}</p>
                    <p class="item-name">总花费</p>
                </div>
            </div>
        </div>

        <!-- echart部分 -->
        <index-chart ref="chart" :dataset="statis" />

        <!-- 弹框部分 -->
        <div class="layer_index_sub" v-show="showLayer"></div>

        <!-- 修改配额 -->
        <div class="changeQuotaDialog" v-show="showChangeQuotaDialog">
            <div class="changeQuotaDialogContent">
                <p class="changeQuotaTitle">配额调整</p>
                <div class="changeQuotaSelect">
                    <el-radio class="radio" v-model="radioQuota" label="0">增加子客配额</el-radio>
                    <el-radio class="radio" v-model="radioQuota" label="1">减少子客配额</el-radio>
                </div>
                <p class="mainAccountBalance">
                    主账户可用余额￥
                    <span>{{ tableData.availableBalanceAgent | moneyFormat }}</span>
                </p>
                <p class="childAccountBalance">
                    子账户可用余额￥
                    <span>{{ tableData.availableBalance | moneyFormat }}</span>
                </p>
                <div class="changeQuotaNum">
                    <span class="changeQuotaLabel">请输入金额:</span>
                    <input class="changeQuotaInput" v-model="changeQuotaMoney">
                </div>
                <div class="changeQuotaButtonWrap">
                    <span class="addQuotaButton addQuotaCancel" @click="addQuotaCancel">取消</span>
                    <span class="addQuotaButton addQuotaConfirm" @click="addQuotaConfirm">确定</span>
                </div>
            </div>
        </div>
        
        <!-- 新增子客账号 -->
        <div class="addSub" v-show="showaddSubDialog">
            <div class="addSubTitle">
                <span class="addSubTitleText">添加子客账号</span>
                <span class="addSubTitleClose" @click="addSubCancel"></span>
            </div>
            <div class="addSubContent">
                <div>
                    <span class="addSubLabel m-l-14">手机号码:</span>
                    <input class="addSubInput" v-model="addSubPhone" @focus="phoneFocus" @blur="phoneBlur" :style="{color:phonePlaceHolder}"></input>
                </div>
                <div class="m-t-25">
                    <span class="addSubLabel">手机验证码:</span>
                    <input class="addSubInput w-162" v-model="addSubVerification"></input>
                    <span v-show="showSendVerification" class="sendVerification" @click="sendVerification('customer')">发送验证码</span>
                    <span class="sendVerification cur" v-show="showTimer">
                        <span class="timer">{{timer}}s</span> 重新发送
                    </span>
                    <span class="sendVerification" v-show="reSendVerification" @click="ReSendVerification('customer')">重新发送</span>
                </div>
                <p class="linkWrap" :class="{linkHide:linkHide}"><a :href="addCustomer_link" class="addCustomer_link" target="_blank">{{sendVerificationError}}</a></p>
                <div class="addSubButtonWrap">
                    <span class="addQuotaButton addQuotaCancel" @click="addSubCancel">取消</span>
                    <span class="addQuotaButton addQuotaConfirm" @click="addSubConfirm">确定</span>
                </div>
            </div>
        </div>

        <div class="addSub h-202" v-show="showCheckSubDialog">
            <div class="addSubTitle">
                <span class="addSubTitleText">查看子客账号</span>
                <span class="addSubTitleClose" @click="checkSubCancel"></span>
            </div>
            <div class="addSubContent">
                <div>
                    <span class="addSubLabel m-l-14">手机号码: {{ tableData.userName }}</span>
                </div>
                <div class="addSubButtonWrap">
                    <span class="addQuotaButton addQuotaCancel" @click="checkSubCancel">取消</span>
                    <span class="addQuotaButton addQuotaConfirm" @click="checkSubCancel">确定</span>
                </div>
            </div>
        </div>
        
        <!-- 修改子客账号 -->
        <div class="addSub h-202" v-show="showModifySubDialog">
            <div class="addSubTitle">
                <span class="addSubTitleText">修改子客账号</span>
                <span class="addSubTitleClose" @click="modifySubCancel"></span>
            </div>
            <div class="addSubContent">
                <div class="modifySubTitle">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="电话：">
                            <el-input placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="addSubButtonWrap">
                    <span class="addQuotaButton addQuotaCancel" @click="modifySubCancel">
                        取消
                    </span>
                    <span class="addQuotaButton addQuotaConfirm" @click="modifySubCancel">
                        确定
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .linkWrap {
        margin-top: 10px;
        height: 12px;
    }

    .linkHide {
        visibility: hidden;
    }

    .addCustomer_link {
        font-size: 12px;
        color: rgb(255, 98, 70);
    }

    .w-113 {
        width: 113px!important;
        margin-left: 20px;
    }

    .h-202 {
        height: 202px!important;
    }

    .addSubButtonWrap {
        float: right;
        margin-right: 20px;
        margin-top: 14px;
    }

    .m-l-14 {
        margin-left: 14px!important;
    }

    .m-t-25 {
        margin-top: 25px;
    }

    .w-162 {
        width: 162px!important;
    }

    .addSubInput {
        height: 14px;
        line-height: 14px;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 14px;
        width: 282px;
        border: 1px solid rgb(213, 213, 213);
        vertical-align: middle;
    }

    .addSubLabel {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin-right: 12px;
        vertical-align: middle;
    }

    .addSubContent {
        margin-left: 20px;
        margin-top: 25px;
        font-size: 0;
    }

    .addSubTitleClose {
        height: 50px;
        width: 14px;
        line-height: 50px;
        display: inline-block;
        background: url('./images/close.png') no-repeat 0px center;
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }

    .addSubTitleText {
        font-size: 16px;
        color: #666666;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        margin-left: 20px;
        font-weight: bold;
    }

    .addSubTitle {
        height: 50px;
        border-bottom: 1px solid rgb(213, 213, 213);
    }

    .modifySubTitle {
        width: 250px;
        height: 50px;
        line-height: 50px;
    }

    .addSub {
        width: 426px;
        height: 279px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(213, 213, 213);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        font-size: 0;
    }

    .addQuotaConfirm {
        background-color: rgb(255, 98, 70);
        color: #fff;
        border: 1px solid rgb(233, 83, 62);
        margin-left: 20px;
    }

    .addQuotaCancel {
        background-color: rgb(246, 246, 246);
        border: 1px solid rgb(213, 213, 213);
    }

    .addQuotaButton {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        font-size: 14px;
        height: 38px;
        width: 84px;
        line-height: 38px;
        cursor: pointer;
    }

    .cur {
        cursor: default!important;
        color: #333333;
    }

    .timer {
        color: rgb(255, 129, 107);
    }

    .m-t-25 {
        margin-top: 25px;
    }

    .sendVerification {
        display: inline-block;
        height: 38px;
        width: 109px;
        line-height: 38px;
        font-size: 14px;
        text-align: center;
        border: 1px solid rgb(213, 213, 213);
        background-color: rgb(246, 246, 246);
        margin-left: 10px;
        cursor: pointer;
        vertical-align: middle;
    }

    .canUse {
        color: rgb(255, 129, 107)!important;
        margin-left: 5px!important;
    }

    .changeQuotaInput {
        height: 14px;
        width: 162px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 14px;
        line-height: 14px;
        padding-top: 12px;
        padding-bottom: 12px;
        border: 1px solid rgb(213, 213, 213);
        vertical-align: middle;
    }

    .changeQuotaLabel {
        min-width: 80px;
        font-size: 14px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        margin-right: 11px;
    }

    .changeQuotaTitle {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
    }

    .changeQuotaSelect {
        margin: 15px 0;
    }

    .changeQuotaNum {
        margin: 20px 0 0 20px;
    }

    .mainAccountBalance, .childAccountBalance {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #000;
    }

    .changeQuotaDialog {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 426px;
        height: 305px;
        margin-left: -213px;
        margin-top: -150px;
        padding: 20px 20px 30px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(213, 213, 213);
        z-index: 100;
    }

    .changeQuotaButtonWrap {
        position: absolute;
        right: 20px;
        bottom: 30px;
    }

    .layer_index_sub {
        width: 100%;
        height: 100%;
        background-color: black;
        filter: alpha(opacity=50);
        -moz-opacity: 0.5;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .r-wrap {
        float: right;
    }

    .subAccount {
        display: inline-block;
        width: 79px;
        height: 38px;
        line-height: 38px;
        font-size: 15px;
        text-align: center;
        background-color: rgb(246, 246, 246);
        border: 1px solid rgb(213, 213, 213);
        cursor: pointer;
        vertical-align: middle;
    }

    .subAccount.w-114 {
        width: 110px;
    }

    .addQuota {
        display: inline-block;
        width: 95px;
        height: 27px;
        line-height: 27px;
        padding-left: 29px;
        font-size: 15px;
        background: url('./images/addQuota.png') no-repeat 0px 0px;
        cursor: pointer;
    }

    .info-line1 {
        height: 40px;
        line-height: 40px;
    }

    .name {
        font-size: 20px;
        font-weight: 700;
    }

    .status {
        font-size: 14px;
        margin-left: 18px;
        color: #5d5d5d;
    }

    .btn {
        display: inline-block;
        height: 40px;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 38px;
        border-radius: 3px;
        padding: 0px 14px;
        font-size: 14px;
        margin-left: 20px;
        vertical-align: middle;
    }

    .btn1 {
        color: #fff;
        background-color: #ff6246;
    }

    .btn2 {
        background-color: #f6f6f6;
        color: #5d5d5d;
        border: 1px #d5d5d5 solid;
    }

    .info-line2 {
        padding-: 0 14px;
        font-size: 14px;
        line-height: 60px;
    }

    .info-line2 .label {
        color: #757575;
    }

    .info-line2 .value {
        color: #e43;
        margin-right: 30px;
    }

    .plan-table .table-title {
        font-size: 14px;
        font-family: microsoft yahei;
        color: #4A4A4A;
        height: 30px;
        line-height: 30px;
    }

    .plan-table-wrapper {
        width: 100%;
        border: 1px solid #D8D8D8;
        margin: 20px 0 0 0;
    }

    .plan-table-wrapper .table-header {
        height: 41px;
        line-height: 41px;
        background-color: #F8F8F8;
        font-size: 0;
        border-bottom: 1px solid #BBBBBB;
    }

    .plan-table-wrapper .table-header .column {
        text-align: center;
        font-size: 12px;
        font-family: 'microsoft yahei';
        font-weight: 500;
        color: #333333;
        display: inline-block;
        box-sizing: border-box;
    }

    .plan-table-wrapper .column.plan-name {
        width: 15%;
    }

    .plan-table-wrapper .column.plan-name a {
        color: #4990E2;
        text-decoration: underline;
    }

    .plan-table-wrapper .column.plan-id {
        width: 10%;
    }

    .plan-table-wrapper .column.plan-status {
        width: 10%;
    }

    .plan-table-wrapper .column.budget {
        width: 15%;
    }

    .plan-table-wrapper .column.exposure {
        width: 15%;
    }

    .plan-table-wrapper .column.click {
        width: 15%;
    }

    .plan-table-wrapper .column.click-rate {
        width: 10%;
    }

    .plan-table-wrapper .column.used-budget {
        width: 10%;
    }

    .plan-table-wrapper .column.consume {
        width: 10%;
    }

    .plan-table-wrapper .table-column {
        height: 40px;
        line-height: 40px;
        width: 100%;
        font-size: 0;
    }

    .plan-table-wrapper .table-column:nth-child(2n + 1) {
        background-color: #F8F8F8;
    }

    .plan-table-wrapper .table-column:hover {
        background-color: #FAF3E1;
    }

    .plan-table-wrapper .table-column .column {
        height: 100%;
        overflow: hidden;
        display: inline-block;
        padding: 0 10px;
        text-align: center;
        border-bottom: 1px solid #D8D8D8;
        font-size: 12px;
        font-family: 'microsoft yahei';
        color: #666666;
        box-sizing: border-box;
    }

    .plan-table-wrapper .table-column .column.plan-name {
        text-align: left;
    }

    .plan-table-wrapper .column.budget .from {
        margin: 0 0 0 -20px;
    }

    .plan-table-wrapper .column.budget .to {
        margin: 0 -20px 0 0;
    }

    .plan-table-wrapper .table-column.block .column {
        border-right: 1px solid #EEEEEE;
    }

    .plan-table-wrapper .table-column.block .column:last-child {
        border-right: none;
    }

    .plan-table-wrapper .table-column.block:last-child .column {
        border-bottom: none;
    }

    .select-section {
        position: relative;
        height: 60px;
        line-height: 40px;
        clear: both;
    }

    .select-section .select {
        float: right;
    }

    .select-section .totalData {
        font-size: 20px;
        font-weight: bold;
    }
    
    /*account部分*/
    .index-sub .account {
        margin-bottom: 50px;
    }
    .index-sub .account-left {
        height: 100px;
        color: #f8f8f8;
        background: #28B779;
        border-radius: 2px;
        overflow:hidden;
    }

    .index-sub .account-left .account-line {
        float: left;
        width: 1px;
        height: 50px;
        background: #7AD488;
        margin-top: 25px;
    }

    .index-sub .account-left-con {
        float: left;
        width: 33%;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
    }

    .index-sub .account-left-con:last-child {
        width: auto;
    }

    .index-sub .acc-name {
        height: 26px;
        line-height: 18px;
        font-size: 18px;
        clear: both;
        display: block;
        margin-bottom: 4px;
    }

    .acc-name .modify-quota {
        float: right;
        margin-right: 14px;
        width: 56px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid #aeeccc;
        cursor: pointer;
    }

    .index-sub .acc-num {
        height: 24px;
        line-height: 14px;
        font-size: 14px;
        display: block;
    }

    .index-sub .acc-use {
        line-height: 12px;
        font-size: 12px;
        display: block;
    }

    .account-right {
        float: right;
        width: 380px;
        height: 98px;
        border: 1px solid #FFB848;
        border-radius: 2px;
        font-size: 14px;
        margin-left:20px;
    }

    .account-right dt {
        height: 35px;
        line-height: 35px;
        background: #FFB848;
        color: #fff;
        padding-left: 15px;
    }

    .account-right dd {
        float: left;
        height: 38px;
        line-height: 38px;
        color: #4a4a4a;
        margin: 8px 0 0 20px;
    }

    .account-right dd a {
        color: #FF613E;
        text-decoration:underline;
    }

    .href-link {
        cursor: pointer;
    }

    /*整体数据*/
    .select {
        width: 170px;
    }

    .selecter {
        width: 100%;
    }

    .section-tab {
        width: 100%;
        height: 80px;
        padding: 10px 20px;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 20px;
    }

    .section-tab-item {
        float: left;
        width: 25%;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid #eeeeee;
        font: 14px/19px 'MicrosoftYaHei';
        color: #666;
    }

    .section-tab-item:last-of-type {
        border: none;
    }

    .section-tab-item:first-of-type {
        padding: 0;
    }

    .section-tab-item .item-name {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
    }
    .section-tab-item .item-expose {
        color: #FF613E;
    }

    .section-tab-item .item-click {
        color: #28B779;
    }

    .section-tab-item .item-clickRate {
        color: #4990E2;
    }

    .section-tab-item .item-cost {
        color: #FFB848;
    }
    
    .item-data {
        height: 31px;
        line-height: 31px;
        font-size: 24px;
    }
</style>

<script>
var $$agent = require('../../script/data/model/agent.js');
var _ = require('../../lib/underscore.v1.8.3.js');
var alert = require('../alert/alert');
var Schema = require("async-validator");
var $user = require('../../script/data/model/user.js');
var editCompany = require('../index-left/edit-company.vue');

var indexChart = require('../index-chart/index-chart.vue');
var selecter = require('../selecter/selecter');
var $$customer = require('../../script/data/model/customer.js');

module.exports = {
    props: {
        data: {
            type: Object,
            default: function () {
                return {}
            }
        },
        demanderID: {
            type: String
        }
    },
    data: function() {
        return {
            name: '',
            valid_status: 1,
            plan_list: [],
            mobile: "",
            showChangeQuotaDialog: false,
            showLayer: false,
            changeQuotaMoney: "",
            addQuotaVerification: "",
            showSendVerification: true,
            showTimer: false,
            reSendVerification: false,
            timer: 60,
            addSubPhone: "请输入11位有效手机号",
            phonePlaceHolder: "#d8d8d8",
            addSubVerification: "",
            showaddSubDialog: false,
            showCheckSubDialog: false,
            showModifySubDialog: false,
            alert: {
                show: false,
                message: '',
                status: 0
            },
            customer_id: this.demanderID,
            username: "",
            sendVerificationError: "",
            addCustomer_link: "",
            linkHide: true,
            addSubConfirmFlag: true,
            isAgent: false,
            datasetOptions: [
                {
                    value: '30',
                    text: '过去30天'
                },
                {
                    value: '7',
                    text: '过去7天'
                },
                {
                    value: '1',
                    text: '昨天'
                },
                {
                    value: '0',
                    text: '今天'
                }
            ],
            dateOption: 30,
            statis: [],
            // 头部数据
            tableData: this.data,
            // 子客统计
            dataStatus: {
                check: '',
                passed: '',
                nopass: ''
            },
            // 整体数据
            overData: {
                click: '',
                clickRate: '',
                cost: '',
                expose: ''
            },
            // 增加/减少 子客配额
            radioQuota: '0'
        }
    },
    filters: {
        moneyFormat: function (money) {
            money = money + "";
            if (Number(money) < 0) {
                money = money * (-1);
                var point = '.00'
                if (money.toString().indexOf('.') > 0) {
                    point = '.' + money.toString().replace(/\d*\./g, '');
                }
                var arr = money.toString().replace(/^\.\d*/g, '').split('').reverse(), newArr = [];
                for (var i=0; i < arr.length; i++) {
                    var newStr = (i + 1) % 3 === 0 && i < arr.length - 1 ? ',' + arr[i] : arr[i];
                    newArr.push(newStr);
                }
                return '-' + newArr.reverse().join('') + point;
            }
            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + money.replace(/^\./, "0.");
        },
        amountFormat: function (amount) {
            // 若为负值则返回0
            if (typeof amount === 'string') amount = Number(amount);
            var arr = amount.toString().replace(/\.\d*/g, '').split('').reverse(), newArr = [];
            for (var i=0; i < arr.length; i++) {
                var newStr = (i + 1) % 3 === 0 && i < arr.length - 1 ? ',' + arr[i] : arr[i];
                newArr.push(newStr);
            }
            return newArr.reverse().join('');
        }
    },
    components: {
        alert: alert,
        editCompany: editCompany,
        indexChart: indexChart,
        selecter: selecter
    },
    watch: {
        data: function (data) {
            this.tableData = data;
            this.dataStatus.check = this.tableData.ideaStatus[0].countNum;
            this.dataStatus.passed = this.tableData.ideaStatus[1].countNum;
            this.dataStatus.nopass = this.tableData.ideaStatus[2].countNum;
        },
        demanderID: function (id) {
            var _this = this,
                params = {
                    'lastdays': _this.dateOption,
                    'childId': id 
                };
            _this.customer_id = id;
            $$agent.dayByDay(params, function (res) {
                _this.overData.click = res.data.click;
                _this.overData.clickRate = res.data.clickRate;
                _this.overData.cost = res.data.cost;
                _this.overData.expose = res.data.expose;
                // echart图表数据
                _this.statis = res.data.dayByDayList;
            });
        }
    },
    methods: {
        editSub: function () {
            var self = this,
                parms = {
                childDemanderId: self.customer_id
            };
            $$agent.viewSubCustomer(parms, function(res) {
                if (res.code === "200") {
                    self.$refs.editCompany.companyForm = {
                        name: res.data.company,
                        zhucehao: res.data.businessLicenceCode,
                        pic: res.data.businessLicenceUrl,
                        isPic: true
                    };
                    //类型2为编辑公司
                    self.$refs.editCompany.formType = 2;
                    self.$refs.editCompany.uploaded = true;
                    self.$refs.editCompany.companyDialog = true;
                } else {
                    self.alertShow(1, res.msg);
                }
            });
        },
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        getPlanLink: function(pid) {
            return '/agent/' + this.id + '/promotion/plan/' + pid;
        },
        getSubLink: function(cid) {
            return '/agent/' + cid + '/promotion/all';
        },
        modifyQuota: function() {
            this.showChangeQuotaDialog = true;
            this.showLayer = true;
            this.showSendVerification = true;
        },
        addSub: function() {
            this.showaddSubDialog = true;
            this.showLayer = true;
            this.showSendVerification = true;
        },
        addSubCancel: function() {
            this.showaddSubDialog = false;
            this.showLayer = false;
            this.reSendVerification = false;
            this.showTimer = false;
            this.showSendVerification = true;
            this.addSubPhone = "";
            this.addSubVerification = "";
            this.linkHide = true;
            this.addSubPhone = "请输入11位有效手机号";
            this.phonePlaceHolder = "#d8d8d8";
        },
        addQuotaCancel: function() {
            this.showChangeQuotaDialog = false;
            this.showLayer = false;
            this.reSendVerification = false;
            this.showTimer = false;
            this.showSendVerification = true;
            this.changeQuotaMoney = "";
            this.addQuotaVerification = "";
        },
        sendVerification: function(type) {
            //发送验证码
            var self = this;
            if (type === "addQuota") {
                $$agent.sendQuotaVerification(function(res) {
                    if (res.code === "200") {
                        self.changeVerificationStatus.apply(self);
                        self.alertShow(0, "验证码发送成功！");
                    } else {
                        self.alertShow(1, "验证码发送失败！");
                    }
                });
            } else if (type === "customer") {
                if (self.addSubPhone === "" || self.addSubPhone === "请输入11位有效手机号") {
                    self.alertShow(1, "请输入电话号码！");
                    return false;
                } else if (!(/^1[34578]\d{9}$/.test(parseInt(self.addSubPhone)))) {
                    self.alertShow(1, "请输入正确的电话号码！");
                    return false;
                }
                var parms = {
                    childDemanderId: self.customer_id,
                    username: self.addSubPhone
                };
                $$agent.sendCustomerVerification(parms, function(res) {
                    if (res.sendCustomerVerification.code === "200") {
                        self.changeVerificationStatus.apply(self);
                        self.alertShow(1, "验证码发送成功！");
                    } else {
                        self.linkHide = false;
                        self.sendVerificationError = res.sendCustomerVerification.msg;
                        self.addCustomer_link = res.sendCustomerVerification.data;
                    }
                });
            }
        },
        changeVerificationStatus: function() {
            var self = this;
            self.showTimer = true;
            self.showSendVerification = false;
            var time = setInterval(function() {
                --self.timer;
                if (self.timer === 0) {
                    clearInterval(time);
                    self.timer = 60;
                    self.reSendVerification = true;
                    self.showTimer = false;
                }
            }, 1000);
        },
        ReSendVerification: function(type) {
            var self = this;
            if (type === "addQuota") {
                $$agent.sendQuotaVerification(function(res) {
                    if (res.code === "200") {
                        self.reSendVerification = false;
                        self.changeVerificationStatus.apply(self);
                        self.alertShow(1, "验证码发送成功！");
                    } else {
                        self.alertShow(1, "验证码发送失败！");
                    }
                });
            } else if (type === "customer") {
                if (self.addSubPhone === "" || self.addSubPhone === "请输入11位有效手机号") {
                    self.alertShow(1, "请输入电话号码！");
                    return false;
                } else if (!(/^1[34578]\d{9}$/.test(parseInt(self.addSubPhone)))) {
                    self.alertShow(1, "请输入正确的电话号码！");
                    return false;
                }
                var parms = {
                    childDemanderId: self.customer_id,
                    username: self.addSubPhone
                };
                $$agent.sendCustomerVerification(parms, function(res) {
                    if (res.sendCustomerVerification.code === "200") {
                        self.reSendVerification = false;
                        self.changeVerificationStatus.apply(self);
                        self.alertShow(1, "验证码发送成功！");
                    } else {
                        self.linkHide = false;
                        self.sendVerificationError = res.sendCustomerVerification.msg;
                        self.addCustomer_link = res.sendCustomerVerification.data;
                    }
                });
            }
        },
        addQuotaConfirm: function() {
            var that = this;
            if (that.changeQuotaMoney === "") {
                that.alertShow(1, "请输入金额！");
                return false;
            } else if (Number(that.changeQuotaMoney) <= 0) {
                that.alertShow(1, "请输入正确的金额!");
                return false;
            } else if (that.radioQuota == '0' && Number(that.changeQuotaMoney) > Number(that.tableData.availableBalanceAgent)) {
                that.alertShow(1, "增加配额不得超过主账户可用余额!");
                return false;
            } else if (that.radioQuota == '1' && Number(that.changeQuotaMoney) > Number(that.tableData.availableBalance)) {
                that.alertShow(1, "减少配额不得超过子账户可用余额!");
                return false;
            }
            var params = {
                id: that.customer_id,
                quota: that.changeQuotaMoney,
                type: Number(that.radioQuota)
            };
            $$agent.addQuotaConfirm(params, function(res) {
                if (res.code === "200") {
                    that.alertShow(0, "提交成功！");
                    if (that.radioQuota == '0') {
                        that.tableData.availableBalance = that.tableData.availableBalance*1 + that.changeQuotaMoney*1;
                        that.tableData.availableBalanceAgent = that.tableData.availableBalanceAgent*1 - that.changeQuotaMoney*1;
                        that.tableData.totalBalance = that.tableData.totalBalance*1 + that.changeQuotaMoney*1;
                    } else if (that.radioQuota == '1') {
                        that.tableData.availableBalance = that.tableData.availableBalance*1 - that.changeQuotaMoney*1;
                        that.tableData.availableBalanceAgent = that.tableData.availableBalanceAgent*1 + that.changeQuotaMoney*1;
                        that.tableData.totalBalance = that.tableData.totalBalance*1 - that.changeQuotaMoney*1;
                    }
                    that.showChangeQuotaDialog = false;
                    that.showLayer = false;
                    that.reSendVerification = false;
                    that.showTimer = false;
                    that.showSendVerification = true;
                    that.changeQuotaMoney = "";
                    that.addQuotaVerification = "";
                } else {
                    that.alertShow(1, res.msg);
                }
            });

        },
        addSubConfirm: function() {
            var that = this;
            if (that.addSubPhone === "" || that.addSubPhone === "请输入11位有效手机号") {
                that.alertShow(1, "请输入电话号码！");
                return false;
            } else if (!(/^1[34578]\d{9}$/.test(parseInt(that.addSubPhone)))) {
                that.alertShow(1, "请输入正确的电话号码！");
                return false;
            } else if (!that.addSubVerification) {
                that.alertShow(1, "请输入验证码！");
                return false;
            }
            if (!that.addSubConfirmFlag) {
                return false;
            } else {
                that.addSubConfirmFlag = false;
            }
            var parms = {
                childDemanderId: that.customer_id,
                username: that.addSubPhone,
                code: that.addSubVerification
            }
            $$agent.addSubConfirm(parms, function(res) {
                if (parseInt(res.code) === 200) {
                    that.addSubConfirmFlag = true;
                    that.alertShow(1, "提交成功！");
                    that.addSubCancel();
                    $$agent.getCustomerAccount({
                        childDemanderId: that.customer_id
                    }, function(res) {
                        that.username = res.data.username;
                    });
                } else {
                    that.alertShow(1, res.msg);
                }
            });
        },
        phoneFocus: function() {
            if (this.addSubPhone == "请输入11位有效手机号") {
                this.addSubPhone = "";
                this.phonePlaceHolder = "black";
            }
        },
        phoneBlur: function() {
            if (this.addSubPhone == "") {
                this.addSubPhone = "请输入11位有效手机号";
                this.phonePlaceHolder = "#d8d8d8";
            }
        },
        checkSub: function() {
            this.showCheckSubDialog = true;
            this.showLayer = true;
        },
        checkSubCancel: function() {
            this.showCheckSubDialog = false;
            this.showLayer = false;
        },
        modifySubCancel: function () {
            this.showModifySubDialog = false;
        },
        changeChartSelect: function (select) {
            var _this = this,
                params = {
                    'lastdays': parseInt(select.value),
                    'childId': _this.data.demanderId 
                };
            _this.dateOption = parseInt(select.value);
            $$agent.dayByDay(params, function (res) {
                _this.overData.click = res.data.click;
                _this.overData.clickRate = res.data.clickRate;
                _this.overData.cost = res.data.cost;
                _this.overData.expose = res.data.expose;
                // echart图表数据
                _this.statis = res.data.dayByDayList;
            });
        },

        // 点击子客统计跳转
        changeStatus: function (status) {
            var infoData = $user.getCurrentInfo().data,
                _this = this;
            if (infoData.userRoleName == 'ROLE_DEMANDER_ACCOUNTANT') {
                //权限管理：财务员
                return
            } else {
                $$customer.changeUnitStatus(status);
                _this.$router.push({
                    name: 'agent_prom_all',
                    params: {
                        cid: _this.demanderID
                    },
                    query: {
                        type: status,
                        plan_status: 2
                    }
                })
            }
        }
    },
    beforeMount: function() {
        var _this = this;

        // 废弃API
        // $$agent.on('getSubCustomerInfo', function(data) {
        //     console.log(data);
        // });

        $$agent.dayByDay({
            'lastdays': _this.dateOption,
            'childId': _this.demanderID
        }, function (res) {
            _this.overData.click = res.data.click;
            _this.overData.clickRate = res.data.clickRate;
            _this.overData.cost = res.data.cost;
            _this.overData.expose = res.data.expose;
            // echart图表数据
            _this.statis = res.data.dayByDayList;
        })
    }
}
</script>
