<template>
    <div class="cpd-buy-list module" v-show="visible" v-loading="loading" element-loading-text="请稍等">
        <div class="module-div2">
            <div class="module-div2">
                <table class="module-table1">
                    <thead class="module-div2">
                        <tr class="module-tr1">
                            <th class="module-th1">
                                <div @click="doSelectAll" class="module-div3" :class="{selected: selectedAll}"></div>
                            </th>
                            <th class="module-th2">订单ID</th>
                            <th class="module-th2">广告名称</th>
                            <th class="module-th2">预定日期范围</th>
                            <th class="module-th2">预定天数</th>
                            <th class="module-th2">均价</th>
                            <th class="module-th2">总价</th>
                            <th class="module-th2">剩余时间</th>
                            <th class="module-th3">操作
                                <span class="module-span1" @click="visible = false;">X</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="module-div2">
                        <tr class="module-tr2" v-for="(item, index) in tableData">
                            <td class="module-td1">
                                <div @click="toggleSelect(item)" class="module-div3" :class="{selected: item.selected}"></div>
                            </td>
                            <td class="module-td2">{{item.orderId}}</td>
                            <td class="module-td2">{{item.name}}</td>
                            <td class="module-td2" :title="dateTitle(item.dateList)">{{item.dateRange.startTime}}-{{item.dateRange.endTime}}</td>
                            <td class="module-td2">{{item.totalDays}}</td>
                            <td class="module-td2">{{item.price | moneyFormat}}</td>
                            <td class="module-td2">{{item.totalPrice | moneyFormat}}</td>
                            <td class="module-td2">{{(parseInt(item.restTime) / 60).toFixed(0)}}分钟</td>
                            <td class="module-td3">
                                <div class="module-div4" @click="delRow(index, item)">删除</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="module-div5">
                <div class="module-div6">
                    <p class="module-p1">总计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <em class="module-em1">￥{{totalCount | moneyFormat}}</em></p>
                    <p class="module-p2">(账户可用余额￥{{quota | moneyFormat}})</p></div>
            </div>
        </div>
        <div class="module-div7">
            <table class="module-table2">
                <tr class="module-tr3">
                    <td class="module-td4">总计</td>
                    <td class="module-td5">
                        <em class="module-em2">￥0.00</em></td>
                </tr>
                <tr class="module-tr3">
                    <td class="module-td4">账户余额</td>
                    <td class="module-td5">￥0.00</td></tr>
                <tr class="module-tr3">
                    <td class="module-td4">使用余额</td>
                    <td class="module-td6">
                        <input placeholder="请输入" type="text" class="module-input1"></td>
                </tr>
                <tr class="module-tr3">
                    <td class="module-td4">还需支付</td>
                    <td class="module-td5">￥0.00</td></tr>
            </table>
        </div>
      <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./cpd-buy-list.js"></script>
<style scoped src="./cpd-buy-list.css"></style>