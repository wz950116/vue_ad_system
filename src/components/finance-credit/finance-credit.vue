<template>
    <div class="finance-credit">
        <div class="layer" v-show="chargelayer"></div>
        <div class="addSub" v-show="chargeshow">
            <span class="chargeFinish">{{chargeText}}</span>
            <span class="chargeCancel" @click="chargeCancel"></span>
        </div>
        <div  class="credit-info">
            <div class="credit-tlt">
                <span class="credit-tlt-line">|</span>
                <span>信用额度</span>
            </div>
            <ul class="credit-info-list">
                <li class="credit-info-item">
                    <span class="credit-info-tlt">总信用额度:</span>
                    <span>{{creditLine}}</span>
                </li>
                <li class="credit-info-item">
                    <span class="credit-info-tlt">已用额度:</span>
                    <span>{{spendAmount}}</span>
                 
                </li>
                <li class="credit-info-item">
                    <span class="credit-info-tlt">可用额度:</span>
                    <span>{{canUse}}</span>
                </li>
                <li class="credit-info-item">
                    <span class="credit-info-tlt">信用状态:</span>
                    <span>{{status}}</span>
                </li>
                <!-- <li class="credit-info-item">
                    <span class="credit-info-tlt">本月应还:</span>
                    <el-tooltip class="item" :disabled="minimumPayment==='0'" effect="light" :content="hint" placement="right" >
                        <el-button>{{minimumPayment}}</el-button>
                    </el-tooltip>
                </li> -->
            </ul>
        </div>
        <div class="submit-info">
            <div class="credit-tlt">
            </div>
            <!-- <div class="save-btn" @click="submit">立即还款</div> -->
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
 <style>
 </style>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>