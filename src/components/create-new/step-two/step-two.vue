<template>
    <div class="step-two step-wrapper" v-loading="loading" element-loading-text="请稍等">
        <div class="two-header">
            <span class="two-header-title">选择投放平台</span>
            <el-tooltip effect="light" placement="right" content="选择将出现您的推广内容的平台">
                <span class="icon-question"></span>
            </el-tooltip>
            <el-select class="platForm" v-model="searchParams.platformType" placeholder="请选择投放平台">
                <el-option v-for="item in platFormList" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <div class="table-wrapper">
            <table class="step-table-wrapper">
                <thead>
                    <tr class="th-line">
                        <th>资源Id</th>
                        <th>资源名称</th>
                        <th>广告形式</th>
                        <th>日均曝光量</th>
                        <th>平均花费(元/千次展示)</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index_ad) in tableData">
                        <tr class="tr-line" @click="expandShow(index_ad)">
                            <td><el-radio class="radio" v-model="resourceId" :label="item.resourcesId"></el-radio></td>
                            <td>{{item.name}}</td>
                            <td>
                                <template v-for="(it,index) in item.adStyle">
                                    <el-tooltip effect="light" placement="bottom" popper-class="tooltip-popper">
                                        <div slot="content">{{it.adStyleFormat}}<br/>{{it.adStyleSize}}</div>
                                        <span v-if="index != 0" class="ad-type">/{{it.adStyleName}}</span>
                                        <span v-else class="ad-type">{{it.adStyleName}}</span>
                                    </el-tooltip>
                                </template>
                            </td>
                            <td>{{item.exposure}}</td>
                            <td>{{item.avgCost}}</td>
                        </tr>
                        <tr v-if="item.expand">
                            <td colspan="5">
                                <template v-if="item.preview.preview.length > 0">
                                    <div class="expand global-clearfix">
                                        <!-- <div class="expand-l arrow"></div> -->
                                        <div class="expand-content">
                                            <span class='left-expand' @click="changePos('left',index_ad)">
                                                <i class="el-icon-arrow-left"></i>
                                            </span>
                                            <div class="expand-list-wrapper global-clearfix">
                                                <div v-for="(it,index_pre) in item.preview.preview" class="expand-list-item" :style="{left : ''+272*(index_pre+previewPos[index_ad]) + 'px'}">
                                                    <div class="list-item-mask"></div>
                                                    <img class="list-item-img" :src="it.url" alt="">
                                                    <!-- <div class="list-item-bottom">在网页中查看</div> -->
                                                    <a class="list-item-expand" :href="it.url" target="_blank"></a>
                                                    <p class="list-item-title">{{it.description}}</p>
                                                </div>
                                            </div>
                                            <span class="right-expand" @click="changePos('right',index_ad)">
                                                <i class="el-icon-arrow-right"></i>
                                            </span>
                                            <div class="expand-inner">您的广告可能会出现在以上位置</div>
                                        </div>
                                        <!-- <div class="expand-r arrow"></div> -->
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="no-preview">此资源没有预览图</div>
                                </template>
                            </td>
                        </tr>
                    </template>
                    <template v-if="tableData.length === 0">
                        <tr>
                            <td colspan="5">
                                暂无数据
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./step-two.js"></script>
<style scoped src="../create-new-common.css"></style>
<style scoped src="./step-two.css"></style>