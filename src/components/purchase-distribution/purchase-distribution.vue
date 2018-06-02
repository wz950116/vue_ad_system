<template>
    <div class="purchase-distribution">
        <div class="purchase-state">
            <div class="state-title">
                投放状态
            </div>
            <selecter class="white-selecter" v-on:change="changeStatus(arguments[0])" :defaultIndex="0"
                      :options="data.putIn"/>
        </div>
        <div class="purchase-resource-list">
            <div class="resource-list-header">
                <div class="item zyid">资源ID</div>
                <div class="item adname">广告位名称</div>
                <div class="item bgl" @click="bglSortFn">平均曝光量
                    <div class="sort">
                        <em :class="['up', {active: sort.bgl.up}]"></em>
                        <em :class="['down', {active: sort.bgl.down}]"></em>
                    </div>
                </div>
                <div class="item price" @click="priceSortFn">价格(元/天)
                    <div class="sort">
                        <em :class="['up', {active: sort.price.up}]"></em>
                        <em :class="['down', {active: sort.price.down}]"></em>
                    </div>
                </div>
                <div class="item cg">已采购天数</div>
                <div class="item fp">已分配天数</div>
                <div class="item tf">投放状态</div>
                <div class="item opt">操作</div>
            </div>
            <ul class="resource-list-content">
                <li class="resource-item" v-for="(item, index) in data.list" v-if="item.exist">
                    <div class="resource-line">
                        <div class="item zyid">{{item.id}}</div>
                        <div class="item adname">{{item.positionName}}</div>
                        <div class="item bgl">{{item.average}}</div>
                        <div class="item price">{{item.price | moneyFormat}}</div>
                        <div class="item cg">{{item.totalDay}}</div>
                        <div class="item fp">{{item.releaseDay}}</div>
                        <div class="item tf">{{item.statusName}}</div>
                        <div class="item opt">
                            <div :class="['opt-btn', {'opt-btn-disabled': item.ifCanceled}]"
                                 @click="cancelPayedOrder(index)">取消订单
                            </div>
                        </div>
                        <div :class="['item', 'show', {active: item.isShow}]" @click="showItemDetailFn(index)">
                            <div class="arrow"></div>
                        </div>
                    </div>
                    <div class="resource-detail" v-if="item.isShow">
                        <div class="detail-fp clear">
                            <div class="img-box">
                                <img :src="item.imgUrl" alt=""/>
                                <a class="text" href="#"></a>
                                <p class="img-size" :title="showTitle(item.standard)">
                                    <span v-for="itt in item.standard">{{itt}}</span>
                                </p>
                            </div>
                            <div class="info-box">
                                <table class="table">
                                    <tr>
                                        <th class="name">选择日期</th>
                                        <th>
                                            <!-- <el-date-picker v-model="item.duringTime" type="daterange" format="yyyy-MM-dd" placeholder="选择日期范围" style="width: 215px; margin-right: 10px; float: left;"></el-date-picker> -->
                                            <calendar v-on:pricedaterange="getRange(arguments[0], item)"
                                                            :price="item.allocList"
                                                            style="width: 215px; margin-right: 10px; float: left;line-height: 1;"></calendar>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="name">选择公司</td>
                                        <td>
                                            <selecter v-on:change="changeCompanyId(index, arguments[0])" :options="item.company"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="name">选择计划</td>
                                        <td>
                                            <selecter v-on:change="changePlanId(index, arguments[0])"
                                                      :options="item.plan"/>
                                        </td>
                                    </tr>
                                    <tr class="ad-tr">
                                        <td class="name">广告单元名称</td>
                                        <td @click="modifyAdNameFn">
                                            <input class="adNameInput" type="text" v-model="item.orderName"
                                                   disabled="disabled" @focus="modifyAdNameFocusFn($event)"
                                                   @blur="modifyAdNameBlurFn($event)">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <span class="submit-btn" @click="releaseAdResource(index)">确认</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="detail-history">
                            <p class="history-title">分配历史记录</p>
                            <table class="history-table">
                                <tr>
                                    <th>公司名称</th>
                                    <th>分配计划</th>
                                    <th>分配天数</th>
                                    <th>分配日期</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                <tr :record-id="ite.recordId" v-for="(ite,ind) in item.recordList">
                                    <td>{{ite.companyName}}</td>
                                    <td>
                                        <router-link
                                                :to="{ name: 'agent_prom_plan', params: { cid: ite.companyId, pid: ite.planId}}">
                                            {{ite.planName}}
                                        </router-link>
                                    </td>
                                    <td>{{ite.releaseDay}}</td>
                                    <td :title="dateTitle(ite.dateList)">{{ite.strTime[0]}} - {{ite.strTime[1]}}</td>
                                    <td>{{ite.statusName}}</td>
                                    <td>
                                        <div :class="['opt-btn', {'active' : ite.canceled == true}]"
                                             @click="removeHistoryTable(index, ind)">取消
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <confirm v-show="confirm.show" :title="confirm.msg" v-on:submit="confirmOk"
                 v-on:cancel="confirmCancel"></confirm>
    </div>
</template>
<script src="./main.js"></script>
<style scoped src="./style.css"></style>