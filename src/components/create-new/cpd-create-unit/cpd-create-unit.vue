<template>
    <div class="cpd-create-unit">
        <div class="module" v-loading="loading" element-loading-text="请稍等">
            <div class="module-div2" v-for="item in tableData">
                <div class="module-div3">
                    <a :href="item.viewInPage" target="_blank" class="module-a1">
                        <div class="module-div4">
                            <img :src="item.imgUrl" class="module-img1">
                            <p class="module-p1">在网页中查看</p></div>
                    </a>
                </div>
                <div class="module-div5">
                    <div class="module-div6">
                        <p class="module-p2">广告单元ID: {{item.id}}&nbsp;<span v-for="i in item.type">{{i}}&nbsp;<span></p>
                        <p class="module-p3">广告名称: {{item.name}}</p>
                        <p class="module-p3">创意规格: <span class="module-span1" v-for="i in item.standard">{{i}}&nbsp;<span></p>
                        <p class="module-p4">素材要求: {{item.requirement}}</p></div>
                </div>
                <div class="module-div7">
                    <div class="module-div8">
                        <p class="module-p5" :title="dateTitle(item.dateList)">推广日期: {{item.promotionDate}}</p>
                        <p class="module-p6">结算方式: {{item.accountWap}}</p>
                        <p class="module-p7">单价: {{item.price | moneyFormat}}</p>
                        <p class="module-p8">总价: {{item.totalPrice | moneyFormat}}</p></div>
                </div>
            </div>
        </div>
        <div class="bottom-result">
            <div class="result-left">
                <div class="left-item">
                    <span class="item-key">热门资源</span>
                    <span class="item-value">￥{{totalHotCost | moneyFormat}}</span>
                </div>
                <div class="left-item"> 
                    <span class="item-key">非热门资源</span>
                    <span class="item-value">￥{{totalNotHotCost | moneyFormat}}</span>
                </div>
                <div class="left-item">
                    <span class="item-key">赠款账户抵扣</span>
                    <span class="item-value" style="display: block; margin-left: -7px; float:left;">-￥{{grantCost | moneyFormat}}</span>
                </div>
                <div class="left-item">
                    <span class="item-key">总计</span>
                    <span class="item-value-orange  item-value">￥{{totalCost | moneyFormat}}</span>
                </div>
            </div>
            <div class="result-right">
                <div class="right-item">
                     <span class="item-key">账户余额</span>
                    <span class="item-value">￥{{availableMoney | moneyFormat}}</span>
                    <span class="item-key-grey">( 现金账户：</span>
                    <span class="item-value-grey">￥{{cashAvailableMoney | moneyFormat}}  </span>
                    <span class="item-key-grey">信用账户：</span>
                    <span class="item-value-grey">￥{{creditAvailableMoney | moneyFormat}} )</span>
                </div>
                <div class="right-item">
                     <span class="item-key">使用余额</span>
                     <span style="float:left;" class="item-value">￥ </span>
                <el-input :disabled="isChild === '1'" class="info-content-input" @input="validate" v-model="useBalance"></el-input>
                </div>
                <div class="right-item">
                    <span class="item-key">仍需支付</span>
                    <span class="item-value-orange item-value">￥{{restMoney | moneyFormat}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./cpd-create-unit.js"></script>
<style src="./cpd-create-unit.css" scoped></style>