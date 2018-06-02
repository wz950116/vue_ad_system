<template>
    <div class="promotion-idea-table">
        <div class="menu-line">
            <a href="javascript:;" @click="ideaCreateClicked" v-if="showCreateBtn" :class="['menu-line-new', 'left', {'disabled': disabled}]"><span>+</span>新建创意</a>
            <a href="javascript:;" :class="['menu-line-new', 'left', {'disabled': disabled}]" @click="confirm.show = disabled ? false : true" v-if="showCreateBtn">删除创意</a>
            <a href="javascript:;" class="menu-line-normal right" v-on:click="downloadList()">下载列表</a>
        </div>
        <div class="filter-line">
            <div class="filter-exam left">
                <span class="label">状态</span>
                <status-select v-on:change="changeStatusSelect(arguments[0])" :defaultIndex='defaultIndex' :options="statusOptions" class="status-select" />
            </div>
            <div class="filter-search left">
                <input type="text" v-model="keyword" class="keyword-input" placeholder="输入创意ID" />
                <span class="search-icon" v-on:click="sendKeyword()"></span>
            </div>
            <div class="filter-time right">
                <el-date-picker v-model="dateRangeForView" type="daterange" format="yyyy/MM/dd" placeholder="选择日期范围" style="width: 220px"></el-date-picker>
            </div>
        </div>
        <div class="plan-table-wrapper" v-show="isEmptyData">
            <div class="table-header">
                <div class="column check-box">
                    <!-- <span class="icon" v-on:click="choose('all')" v-if="!allCheck"></span>
                    <span class="icon select" v-on:click="choose('all')" v-else></span> -->
                </div>
                <div class="column column-1">
                    <span class="coulum-text">创意ID</span>
                </div>
                <div class="column column-2">
                    <span class="coulum-text">创意</span>
                </div>
                <div class="column column-3">
                    <span class="coulum-text">审核状态</span>
                </div>
                <div class="column column-4">
                    <span class="coulum-text">投放状态</span>
                </div>
                <div class="column column-5">
                    <span class="coulum-text">曝光量</span>
                </div>
                <div class="column column-6">
                    <span class="coulum-text">点击量</span>
                </div>
                <div class="column column-7">
                    <span class="coulum-text">点击率</span>
                </div>
                <div class="column column-8">
                    <span class="coulum-text">消耗</span>
                </div>
                <div class="column column-9">
                    <span class="coulum-text">创意链接</span>
                </div>
                <div class="column column-10">
                    <span class="coulum-text">广告计划</span>
                </div>
                <div class="column column-11">
                    <span class="coulum-text">广告单元</span>
                </div>
            </div>
            <div v-bind:class="['table-column', {'block': !isBlock}]" v-for="(item, index) in tableData">
                <div class="column check-box">
                    <span v-bind:class="['icon', {select: item.checkStatus}]" v-on:click="choose(item.id)"></span>
                </div>
                <div class="column column-1">
                    {{item.id}}
                </div>
                <div class="column column-2">
                    <a v-if="item.id !== '总计'" class="seeDetail" href="javascript:void(0);" @click="seeIdeaDetail(item.id, item.orderName)">编辑或查看</a>
                </div>
                <div class="column column-3">
                    <!-- <a v-if="item.id !== '总计'" class="seeDetail" href="javascript:void(0);" @click="seeIdeaDetail1(item.id, item.orderName)">查看创意</a> -->
                    {{item.auditStatus}}
                </div>
                <div class="column column-4">
                    <span v-on:click="changePullStatus(item.id)" v-if="item.planId" v-bind:class="['task-notice-switch', {'task-notice-switch-trans': item.pullStatus != 0}, {'task-disable': item.pullStatus == 2}]">
                        <span class="task-notice-switch-off"></span>
                    </span>
                </div>
                <div class="column column-5">
                    {{item.exposure == -1 ? '无' : item.exposure}}
                </div>
                <div class="column column-6">
                    {{item.click == -1 ? '无' : item.click}}
                </div>
                <div class="column column-7">
                    {{item.clickRate}}%
                </div>
                <div class="column column-8">
                    {{item.consume | moneyFormat}}
                </div>
                <div class="column column-9">
                    <a v-bind:href="item.ideaHref" target="_blank" :title="item.ideaHref">{{item.ideaHref}}</a>
                </div>
                <div class="column column-10">
                    <router-link :to="item.adPlan.href" :title="item.adPlan.name">{{item.adPlan.name}}</router-link>
                </div>
                <div class="column column-11">
                    <router-link :to="item.adUnit.href" :title="item.adUnit.name">{{item.adUnit.name}}</router-link>
                </div>
            </div>
        </div>
        <div class="block" v-show="isEmptyData">
            <el-pagination @current-change="changePage" :current-page="pageInfo.pageIndex" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="pageInfo.itemCount">
            </el-pagination>
        </div>

        <confirm v-show="confirm.show" :title="'确定删除这些广告创意？'" v-on:submit="confirmOk" v-on:cancel="confirmCancel" />
        <alert v-show="alert.show" :message="alert.message" :status="alert.status" />
        <idea-create-new ref="createDialog" :unitName="unitName" :orderId="orderId" :ideaId="ideaId"></idea-create-new>
        <idea-detail-dialog ref="detailDialog" :ideaId="detailDialog.ideaId" :orderName="detailDialog.orderName"></idea-detail-dialog>
    </div>
</template>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>
