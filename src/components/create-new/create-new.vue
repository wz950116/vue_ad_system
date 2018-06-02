<template>
    <div class="create-new" v-loading="loading" element-loading-text="请稍等">
        <div class="create-new-header" ref="createNewHeader">
            <div class="module-div2">
                <div class="module-div3 text">新建广告</div>
                <div class="module-div4 text active" :class="{active: step >= 1}">填写基本信息</div>
                <div class="module-div5 text" :class="{active: step >= 2}">选择广告资源</div>
                <div class="module-div5 text" :class="{active: step >= 3}">创建广告单元</div>
                <div class="module-div5 text" :class="{active: step >= 4}">完成</div>
            </div>
            <div class="module-div6">
                <div class="module-div7 line" :class="{active: step >= 1}"></div>
                <div class="module-div8 line" :class="{active: step >= 2}"></div>
                <div class="module-div8 line" :class="{active: step >= 3}"></div>
                <div class="module-div8 line" :class="{active: step >=4 }"></div>
                <div class="module-div9 line" :class="{active: step >= 4}"></div>
                <div class="module-div10 icon" :class="{active: step >= 1}">1</div>
                <div class="module-div11 icon" :class="{active: step >= 2}">2</div>
                <div class="module-div12 icon" :class="{active: step >= 3}">3</div>
                <div class="module-div13 icon" :class="{active: step >= 4}">4</div>
            </div>
        </div>
        <div class="create-content" ref="createContent">
            <step-one ref="stepOne" v-show="step === 1" :planId="choosedPlanId"></step-one>
            <template v-if="cpm.costType === 1">
                <step-two ref="stepTwo" v-if="step === 2"></step-two>
                <step-three ref="stepThree" v-if="step === 3"></step-three>
            </template>
            <template v-if="cpm.costType === 0">
                <create-resource :planId="parseInt(cpm.planId)" v-if="step === 2"/>
                <cpd-create-unit ref="cpdCreateUnit" v-show="step === 3"/>
            </template>
            <div class="result-wrapper" v-show="step === 4">
                <span class="result-tip">{{result}}</span>
                <template v-if="result === '支付中...'">
                    <el-button type="text" @click="checkPay">确认支付</el-button>
                </template>
                <template v-if="result === '创建成功'">
                    <p class="result-link">在广告单元中添加广告创意才能正常投放，点击<el-button type="text" @click="goAdunit" class="result-check">查看已采购资源</el-button></p>
                </template>
                <template v-if="result === '支付失败'">
                    <p class="error-season">可能是以下原因导致</p>
                    <p class="error-season">1.您在15分钟内未完成扣款</p>
                    <p class="error-season">2.由于系统原因未正确扣款</p>
                    <p class="error-season">如果您已确认扣款,仍出现该提示,请联络客服解决</p>
                </template>
            </div>
        </div>
        <div class="buy-list-wrapper" v-show="cpm.costType === 0 && step === 2">
            <cpd-buy-list ref="cpdBuyList" @showListNum='setListNum'></cpd-buy-list>
        </div>
        <div class="create-footer global-clearfix">
            <div class="footer-l">
                <div v-show="cpm.costType === 0 && step === 2" class="create-footer-btn" @click="$refs.cpdBuyList.visible = !$refs.cpdBuyList.visible;">已选资源列表<span class="choose-num">{{cpd.resourceNum}}</span></div>
                <div class="create-footer-btn" @click="$parent.display = false;">取消</div>
            </div>
            <div class="footer-r">
                <div class="create-footer-btn" v-if="step > 1" @click="step--;">上一步</div>
                <div class="create-footer-btn active" v-if="(step < 4 && cpm.costType === 1) || (step < 3 && cpm.costType === 0)" @click="addStep">下一步</div>
                <div class="create-footer-btn active" v-if="step === 3 && cpm.costType === 0" @click="addStep">确认支付</div>
                <div class="create-footer-btn active" v-if="step === 4" @click="complete">完成</div>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./create-new.js"></script>
<style src="./create-new.css"></style>
<style src="./create-new-element-patch.css"></style>