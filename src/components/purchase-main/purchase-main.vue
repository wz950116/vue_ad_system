<template>
    <div class="top-root purchase-buy">
        <div class="wrap">
            <div class="tab-wrap">
                <div class="tab1 tab orange" v-if="status >= 1">选择广告资源</div>
                <div class="tab1 tab gray" v-if="status < 1">选择广告资源</div>
                <div class="tab2 tab orange" v-if="status >= 2">创建广告单元</div>
                <div class="tab2 tab gray" v-if="status < 2">创建广告单元</div>
                <div class="tab3 tab orange" v-if="status >= 3">完成</div>
                <div class="tab3 tab gray" v-if="status < 3">完成</div>
            </div>
            <div class="line-wrap">
                <div class="line line1 orange left" v-if="status >= 1"></div>
                <div class="line line1 gray left" v-if="status < 1"></div>
                <div class="line line2 orange left" v-if="status >= 2"></div>
                <div class="line line2 gray left" v-if="status < 2"></div>
                <div class="line line3 orange left" v-if="status >= 3"></div>
                <div class="line line3 gray left" v-if="status < 3"></div>
                <div class="line line4 orange right" v-if="status >= 4"></div>
                <div class="line line4 gray right" v-if="status < 4"></div>
                <div class="circle circle1 small gray" v-if="status < 1">1</div>
                <div class="circle circle1 big orange" v-if="status == 1">1</div>
                <div class="circle circle1 small orange" v-if="status > 1">1</div>
                <div class="circle circle2 small gray" v-if="status < 2">2</div>
                <div class="circle circle2 big orange" v-if="status == 2">2</div>
                <div class="circle circle2 small orange" v-if="status > 2">2</div>
                <div class="circle circle3 small gray" v-if="status < 3">3</div>
                <div class="circle circle3 big orange" v-if="status == 3">3</div>
                <div class="circle circle3 small orange" v-if="status > 3">3</div>
            </div>
        </div>
        <create-resource v-show="status === 1"/>
        <create-unit v-show="status === 2"/>
        <create-result ref="createResult" v-show="status >= 3" />
        <!--footer-->
        <!--footer-->
        <!--footer-->
        <div class="create-footer">
            <div class="footer-wrap">
                <div class="wrap-left">
                    <template v-if="status === 1">
                        <div class="btn" @click="toggleList">
                            已选资源列表<em class="num">{{resourceListLength}}</em>
                        </div>
                    </template>
                </div>
                <div class="wrap-right">
                    <div class="btn hot" v-if="status === 1" @click="sureOrder">确认订单</div>
                    <template v-if="status === 2">
                        <div class="btn" @click="prev">上一步</div>
                        <div class="btn hot" @click="pay">确认支付</div>
                    </template>
                    <div class="btn hot" @click="verifyPayResult" v-if="status === 3">支付完成</div>
                    <div class="btn hot" @click="back" v-if="status === 4">返回</div>
                    <div class="btn hot" @click="payDone" v-if="status === 5">完成</div>
                </div>
            </div>
            <div class="create-popup-wrap">
                <div class="popup-sList" v-show="status === 1 && resourceList.display">
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
                                    <th class="opt-item">操作<span class="cancel" @click="toggleList">X</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in resourceList.list">
                                    <td class="select-item">
                                        <div class="checkbox" @click="selectSingle(item.orderId, index)" v-bind:class="{active: item.selected === 'true'}"></div>
                                    </td>
                                    <td>{{item.orderId}}</td>
                                    <td>{{item.name}}</td>
                                    <td :title="dateTitle(item.dateList)">{{item.dateRange.startTime | dateFormat}}-{{item.dateRange.endTime | dateFormat}}</td>
                                    <td>{{item.totalDays}}</td>
                                    <td>{{item.price | moneyFormat}}</td>
                                    <td>{{item.totalPrice | moneyFormat}}</td>
                                    <td>{{(item.restTime / 60).toFixed(0)}}分钟</td>
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
                            <p class="tip">(计划可用余额￥{{resourceList.quota | moneyFormat}})</p>
                        </div>
                    </div>
                </div>
                <div class="popup-paySure" v-show="status === 2">
        <div class="result-left">
                <div class="left-item">
                    <span class="item-key">热门资源</span>
                    <span class="item-value">￥{{order.totalHotCost | moneyFormat}}</span>
                </div>
                <div class="left-item">
                     <span class="item-key">非热门资源</span>
                    <span class="item-value">￥{{order.totalNotHotCost | moneyFormat}}</span>
                </div>
                <div class="left-item">
                    <span class="item-key">赠款账户抵扣</span>
                    <span class="item-value" style="display: block; margin-left: -7px; float:left;">-￥{{order.grantCost | moneyFormat}}</span>
                </div>
                <div class="left-item">
                    <span class="item-key">总计</span>
                    <span class="item-value-orange  item-value">￥{{order.totalPrice | moneyFormat}}</span>
                </div>
            </div>
            <div class="result-right">
                <div class="right-item">
                     <span class="item-key">账户余额</span>
                    <span class="item-value">￥{{order.availableMoney | moneyFormat}}</span>
                    <span class="item-key-grey"> ( 现金账户：</span>
                    <span class="item-value-grey">￥{{order.cashAvailableMoney | moneyFormat}}</span>
                    <span class="item-key-grey">  信用账户：</span>
                    <span class="item-value-grey">￥{{order.creditAvailableMoney | moneyFormat}} )</span>
                </div>
                <div class="right-item">
                     <span class="item-key">使用余额</span>
                     <span style="float:left;" class="item-value">￥ </span>
                <el-input :disabled="isChild === '1'" class="info-content-input" @input="validate" v-model="order.useMoney" placeholder="请输入"></el-input>
                </div>
                <div class="right-item">
                    <span class="item-key">仍需支付</span>
                    <span class="item-value-orange item-value">￥{{restMoney | moneyFormat}}</span>
                </div>
            </div>
                </div>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./main.js"></script>
<style scoped src="./style.css"></style>
