<template>
    <div class="top-root">
        <div class="wrap">
            <div class="tab-wrap">
                <div class="logo-name">新建广告</div>
                <div class="tab1 tab orange" v-if="status >= 1">选择推广计划</div>
                <div class="tab1 tab gray" v-if="status < 1">选择推广计划</div>
                <div class="tab2 tab orange" v-if="status >= 2">选择广告资源</div>
                <div class="tab2 tab gray" v-if="status < 2">选择广告资源</div>
                <div class="tab3 tab orange" v-if="status >= 3">创建广告单元</div>
                <div class="tab3 tab gray" v-if="status < 3">创建广告单元</div>
                <div class="tab4 tab orange" v-if="status >= 4">完成</div>
                <div class="tab4 tab gray" v-if="status < 4">完成</div>
            </div>
            <div class="line-wrap">
                <div class="line line1 orange" v-if="status >= 1"></div>
                <div class="line line1 gray" v-if="status < 1"></div>
                <div class="line line2 orange" v-if="status >= 2"></div>
                <div class="line line2 gray" v-if="status < 2"></div>
                <div class="line line3 orange" v-if="status >= 3"></div>
                <div class="line line3 gray" v-if="status < 3"></div>
                <div class="line line4 orange" v-if="status >= 4"></div>
                <div class="line line4 gray" v-if="status < 4"></div>
                <div class="line line5 orange" v-if="status >= 5"></div>
                <div class="line line5 gray" v-if="status < 5"></div>
                <div class="circle circle1 small gray" v-if="status < 1">1</div>
                <div class="circle circle1 big orange" v-if="status == 1">1</div>
                <div class="circle circle1 small orange" v-if="status > 1">1</div>
                <div class="circle circle2 small gray" v-if="status < 2">2</div>
                <div class="circle circle2 big orange" v-if="status == 2">2</div>
                <div class="circle circle2 small orange" v-if="status > 2">2</div>
                <div class="circle circle3 small gray" v-if="status < 3">3</div>
                <div class="circle circle3 big orange" v-if="status == 3">3</div>
                <div class="circle circle3 small orange" v-if="status > 3">3</div>
                <div class="circle circle4 small gray" v-if="status < 4">4</div>
                <div class="circle circle4 big orange" v-if="status == 4">4</div>
                <div class="circle circle4 small orange" v-if="status > 4">4</div>
            </div>
        </div>
        <create-plan ref="createPlan" :choosedPlanName="choosedPlanName" :choosedPlanId="choosedPlanId" v-if="status === 1"/>
        <create-resource :planId="planId" v-if="status === 2"/>
        <create-unit v-show="status === 3"/>
        <create-result ref="createResult" v-show="status >= 4"/>
        <!--footer-->
        <!--footer-->
        <!--footer-->
        <div class="create-footer">
            <div class="footer-wrap">
                <div class="wrap-left">
                    <div v-if="status === 2" class="btn" @click="toggleList">
                        已选资源列表<em class="num">{{resourceListLength}}</em>
                    </div>
                    <div @click="cancel" class="btn" v-if="status <= 3">
                        取消
                    </div>
                </div>
                <div class="wrap-right">
                    <div class="btn hot" v-if="status === 1" @click="next">下一步</div>
                    <div class="btn" @click="prev" v-if="status <= 3 && status > 1">上一步</div>
                    <div class="btn hot" v-if="status === 2" @click="sureOrder">确认订单</div>
                    <div v-if="status === 3" class="btn hot" @click="pay">确认支付</div>
                    <div class="btn hot" @click="verifyPayResult" v-if="status === 4">支付完成</div>
                    <div class="btn hot" @click="back" v-if="status === 5">返回</div>
                    <div class="btn hot" @click="payDone" v-if="status === 6">完成</div>
                </div>
            </div>
            <div class="create-popup-wrap">
                <div class="popup-sList" v-show="status === 2 && resourceList.display">
                    <div class="sList">
                        <table class="sTable">
                            <thead>
                                <tr class="t-head">
                                    <th class="select-item">
                                        <div class="checkbox" @click="selectAll" v-bind:class="{active: isSelectedAll === true}"></div>
                                    </th>
                                    <th>订单ID</th>
                                    <th>广告名称</th>
                                    <th>预定日期范围</th>
                                    <th>预定天数</th>
                                    <th>均价</th>
                                    <th>总价</th>
                                    <th>剩余时间</th>
                                    <th class="opt-item">操作<span @click="toggleList" class="cancel">X</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in resourceList.list">
                                    <td class="select-item">
                                        <div class="checkbox" @click="selectSingle(item.orderId, index)" v-bind:class="{active: item.selected === 'true'}"></div>
                                    </td>
                                    <td>{{item.orderId}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.dateRange.startTime | dateFormat}}-{{item.dateRange.endTime | dateFormat}}</td>
                                    <td>{{item.totalDays}}</td>
                                    <td>{{item.price | moneyFormat}}</td>
                                    <td>{{item.totalPrice | moneyFormat}}</td>
                                    <td>{{(parseInt(item.restTime) / 60).toFixed(0)}}分钟</td>
                                    <td class="opt-item">
                                        <div class="del" @click="delChooseResource(index)">删除</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="sResult">
                        <div class="box">
                            <p class="price-sum">总计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em class="num">￥{{resourceTotalPrice | moneyFormat}}</em></p>
                            <p class="tip">(账户可用余额1111￥{{resourceList.quota | moneyFormat}})</p>
                        </div>
                    </div>
                </div>
                <div class="popup-paySure" v-show="status === 3">
                    <table class="pTable">
                        <tr>
                            <td class="name">总计</td>
                            <td class="info">
                                <em class="price-num">￥{{order.totalPrice | moneyFormat}}</em>
                            </td>
                        </tr>
                        <tr>
                            <td class="name">账户余额</td>
                            <td class="info">￥{{order.availableMoney | moneyFormat}}</td>
                        </tr>
                        <tr class="balance-item">
                            <td class="name">使用余额</td>
                            <td class="info">
                                <input type="text" v-model='order.useMoney' placeholder="请输入" :disabled="order.isChild == 1">
                                <!-- <p>验证码</p>
                                <input type="text" v-model="order.authCode" placeholder="请输入">
                                <p class="tip">发送验证码到手机 {{order.phoneNum}}</p>
                                <div class="submit-btn" v-if="order.submitDelay">{{order.delaySecond}}s</div>
                                <div class="submit-btn" v-if="order.submitDelay === false" @click="sendAuthCode($event)">确认发送</div> -->
                            </td>
                        </tr>
                        <tr v-if="order.isChild != 1">
                            <td class="name">还需支付</td>
                            <td class="info">￥{{restMoney | moneyFormat}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <confirm v-show="confirm.show" :title="confirm.msg" v-on:submit="confirmOk" v-on:cancel="confirmCancel"></confirm>
    </div>
</template>
<script src="./main.js"></script>
<style scoped src="./style.css"></style>
