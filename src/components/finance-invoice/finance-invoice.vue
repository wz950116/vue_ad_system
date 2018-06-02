<template>
    <div class="finance-invoice">
        <div class="invoice-info">
            <div class="invoice-tlt">
                <span class="invoice-tlt-line">|</span>
                <span>发票信息<span class="invoice-desc">(所有项为必填项)</span></span>
            </div>
            <ul class="invoice-info-list">
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">发票类型：</span>
                    <span v-on:change="selectInvoiceType(invoiceType)" v-bind:class="{'invoice-type-active':isNormal,'invoice-type':!isNormal}">
                    <input v-model="invoiceType" type="radio" name="invoice" value="normal"/>
                    <label>增值税普通发票</label>
                </span>
                    <span v-on:change="selectInvoiceType(invoiceType)" v-bind:class="{'invoice-type':isNormal,'invoice-type-active':!isNormal}">
                    <input v-model="invoiceType" type="radio" name="invoice" value="special"/>
                    <label>增值税专用发票</label>
                </span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">开票抬头：</span>
                    <input v-if="taxPayer.status == '1' || isNormal" v-model="invoiceInfo.invoiceHeader" v-on:blur="verifyInfo(invoiceInfo.invoiceHeader,'header')" type="text" />
                    <input v-else disabled="disabled" type="text" placeholder="纳税人信息还未通过审核" />
                    <span v-if="checkRule.headerError" class="error-info"><i class="error-icon"></i>发票抬头不能为空</span>
                    <span v-if="checkRule.headerRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">可开金额：</span>
                    <span>{{invoiceCount}}</span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">开票金额：</span>
                    <input v-if="taxPayer.status == '1' || isNormal" v-model="invoiceInfo.invoiceMoney" v-on:blur="verifyNum(invoiceInfo.invoiceMoney,'money')" type="text" />
                    <input v-else disabled="disabled" type="text" placeholder="纳税人信息还未通过审核" />
                    <span>元</span>
                    <span class="invoice-desc">(100以上整数)</span>
                    <span v-if="checkRule.moneyError" class="error-info"><i class="error-icon"></i>开票金额不能为空</span>
                    <span v-if="checkRule.moneyNumError" class="error-info"><i class="error-icon"></i>请输入正确的开票金额</span>
                    <span v-if="checkRule.moneyRight" class="right-info"><i class="right-icon"></i></span>
                </li>
            </ul>
        </div>
        <div v-if="!isNormal" class="global-clearfix invoice-info">
            <div class="invoice-tlt">
                <span class="invoice-tlt-line">|</span>
                <span>一般纳税人信息<span class="invoice-desc">(所有项为必填项)</span></span>
            </div>
            <ul class="invoice-info-list">
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">公司名称：</span>
                    <span v-if="!editSatus">{{taxPayer.companyName}}</span>
                    <input v-else v-model="inputTaxPayer.companyName" v-on:blur="verifyInfo(inputTaxPayer.companyName,'comName',true)" type="text" />
                    <span v-if="taxCheckRule.comNameError" class="error-info"><i class="error-icon"></i>公司名称不能为空</span>
                    <span v-if="taxCheckRule.comNameRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">银行账户：</span>
                    <span v-if="!editSatus">{{taxPayer.bankAccount}}</span>
                    <input v-else v-model="inputTaxPayer.bankAccount" type="text" v-on:blur="verifyNum(inputTaxPayer.bankAccount,'account',true)" />
                    <span v-if="taxCheckRule.accountError" class="error-info"><i class="error-icon"></i>银行账户不能为空</span>
                    <span v-if="taxCheckRule.accountNumError" class="error-info"><i class="error-icon"></i>请输入正确的银行账户</span>
                    <span v-if="taxCheckRule.accountRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">开户行：</span>
                    <span v-if="!editSatus">{{taxPayer.openBank}}</span>
                    <input v-else v-model="inputTaxPayer.openBank" v-on:blur="verifyInfo(inputTaxPayer.openBank,'bank',true)" type="text" />
                    <span v-if="taxCheckRule.bankError" class="error-info"><i class="error-icon"></i>开户行名称不能为空</span>
                    <span v-if="taxCheckRule.bankRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">纳税人识别号：</span>
                    <span v-if="!editSatus">{{taxPayer.taxManId}}</span>
                    <input v-else v-model="inputTaxPayer.taxManId" type="text" v-on:blur="verifyNum(inputTaxPayer.taxManId,'taxNum',true)" />
                    <span v-if="taxCheckRule.taxNumError" class="error-info"><i class="error-icon"></i>纳税人识别号不能为空</span>
                    <span v-if="taxCheckRule.taxNumNumError" class="error-info"><i
                            class="error-icon"></i>请输入正确的纳税人识别号</span>
                    <span v-if="taxCheckRule.taxNumRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">公司地址：</span>
                    <span v-if="!editSatus">{{taxPayer.companyAddress}}</span>
                    <input v-else v-model="inputTaxPayer.companyAddress" v-on:blur="verifyInfo(inputTaxPayer.companyAddress,'address',true)" type="text" />
                    <span v-if="taxCheckRule.addressError" class="error-info"><i class="error-icon"></i>公司地址不能为空</span>
                    <span v-if="taxCheckRule.addressRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">公司电话：</span>
                    <span v-if="!editSatus">{{taxPayer.companyTel}}</span>
                    <input v-else v-model="inputTaxPayer.companyTel" type="text" v-on:blur="verifyNum(inputTaxPayer.companyTel,'comTel',true)" />
                    <span v-if="taxCheckRule.comTelError" class="error-info"><i class="error-icon"></i>公司电话不能为空</span>
                    <span v-if="taxCheckRule.comTelNumError" class="error-info"><i
                            class="error-icon"></i>请输入正确的公司电话</span>
                    <span v-if="taxCheckRule.comTelRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">资质材料：</span>
                    <div class="invoicePicWrap" :style="{'z-index': 1}">
                        <img :src="taxPayer.qualificationPic" class="invoicePic">
                    </div>
                    <div class="invoicePicWrap flash-upload" :style="!editSatus ? {opacity: 0, 'z-index': 0} : {opacity: 0, 'z-index': 2}">
                        <a id="selectFiles3" href="javascript:;" class="invoiceUpload" :class="{invoiceUploaded:uploaded}"></a>
                    </div>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt-long">审核状态：</span>
                    <span>{{taxPayer.statusName}}</span>
                </li>
            </ul>
            <div v-if="editSatus" class="save-btn edit-btn" v-on:click="saveChange(inputTaxPayer)">保存修改</div>
            <div v-if="editSatus" class="save-btn edit-btn cacel-btn" v-on:click="cancelChange(inputTaxPayer)">取消修改</div>
            <div v-else class="save-btn edit-btn" v-on:click="changeEditSatus">修改信息</div>
        </div>
        <div class="invoice-info">
            <div class="invoice-tlt">
                <span class="invoice-tlt-line">|</span>
                <span>快递信息<span class="invoice-desc">(所有项为必填项)</span></span>
            </div>
            <ul class="invoice-info-list">
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">联系人：</span>
                    <input v-model="invoiceInfo.invoiceContacts" v-on:blur="verifyInfo(invoiceInfo.invoiceContacts,'contacts')" type="text" />
                    <span v-if="checkRule.contactsError" class="error-info"><i class="error-icon"></i>联系人不能为空</span>
                    <span v-if="checkRule.contactsRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">地址：</span>
                    <input v-model="invoiceInfo.invoiceAddress" v-on:blur="verifyInfo(invoiceInfo.invoiceAddress,'address')" type="text" />
                    <span v-if="checkRule.addressError" class="error-info"><i class="error-icon"></i>地址不能为空</span>
                    <span v-if="checkRule.addressRight" class="right-info"><i class="right-icon"></i></span>
                </li>
                <li class="invoice-info-item">
                    <span class="invoice-info-tlt">电话：</span>
                    <input v-model="invoiceInfo.invoiceTel" v-on:blur="verifyNum(invoiceInfo.invoiceTel,'tel')" type="text" />
                    <span v-if="checkRule.telError" class="error-info"><i class="error-icon"></i>电话不能为空</span>
                    <span v-if="checkRule.telNumError" class="error-info"><i class="error-icon"></i>请输入的正确的电话</span>
                    <span v-if="checkRule.telRight" class="right-info"><i class="right-icon"></i></span>
                </li>
            </ul>
        </div>
        <div class="submit-info">
            <div class="invoice-tlt">
            </div>
            <div class="save-btn" v-on:click="submitInfo(invoiceInfo)">提交申请</div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <table-component></table-component>
    </div>
</template>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>