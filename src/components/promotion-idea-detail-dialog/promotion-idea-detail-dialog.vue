<template>
    <div class="promotion-idea-detail-dialog">
        <el-dialog title="编辑创意" v-model="dialogVisible">
            <div class="info-w">
                <h3>广告单元：{{orderName}}</h3>
                <template v-if="infoData.link">
                    <h3 class="subtitle">推广内容</h3>
                    <div class="info-content">
                        <span v-if="infoData.type_id === 'estate'">{{infoData.type_name}}： {{infoData.name}}</span>
                        <span>页面链接： {{infoData.link}}</span>
                        <el-button class="preview" size="mini" @click="preview(infoData.link)">点击预览</el-button>
                    </div>
                </template>
            </div>
            <div class="resource-w">
                <h3 class="subtitle">查看广告创意</h3>
                <div class="resource-content" v-for="item in groupedResource">
                    <h5>{{item.showName}}</h5>
                    <div class="resource-inner-w global-clearfix">
                        <!-- 图片 -->
                        <div v-if="parseInt(it.type) >= 1 && parseInt(it.type) <= 3" v-for="it in item.posResourceList" class="resource-item">
                            <img :src="it.url" alt="" class="img-w">
                        </div>
                        <!-- 文字链 -->
                        <div v-if="parseInt(it.type) === 0" v-for="it in item.posResourceList" class="resource-item">
                            <span class="text-wrapper">{{it.description}}</span>
                        </div>
                        <!-- 图文 -->
                        <template v-if="parseInt(it.type) >= 4 && parseInt(it.type) <= 6"  v-for="it in item.posResourceList">
                            <div class="resource-item">
                                <img :src="it.url" alt="" class="img-w">
                            </div>
                            <div class="resource-item">
                                <span class="text-wrapper">{{it.description}}</span>
                            </div>
                        </template>
                        <!-- 视频 -->
                        <div v-if="parseInt(it.type) === 7" v-for="it in item.posResourceList" class="resource-item">
                            <span class="text-wrapper">视频链接：<a target="_blank" :href="it.url">{{it.url}}</a></span>
                        </div>
                        <!-- 排行 -->
                        <div v-if="parseInt(it.type) === 9" v-for="it in item.posResourceList" class="resource-item">
                            <p v-for="(item, index) in it.list" class="paihang">
                                <span>{{index + 1}}.</span>
                                <span>{{item.name}}</span>
                                <span>{{item.dealPrice}}元/㎡</span>
                                <span>{{item.dealNum}}套</span>
                                <span>{{item.link}}</span>
                            </p>
                        </div>
                        <!-- 行情 -->
                        <div v-if="parseInt(it.type) === 11" v-for="it in item.posResourceList" class="resource-item">
                            <span class="text-wrapper">
                                <span class="hangqing">{{it.description}}</span>
                                <span class="hangqing">{{it.num1}}套</span>
                                <span class="hangqing">{{it.num2}}套</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="btn-gr global-clearfix">
                    <div class="btn-gr-left">
                        <el-button size="large" @click="dialogVisible = false">取消</el-button>
                    </div>
                    <div class="btn-gr-right">
                        <!-- <el-button size="large">预览</el-button> -->
                        <el-button size="large" type="primary">确定</el-button>
                    </div>
                </div>
            </div>
        </el-dialog> 
    </div>
</template>
<style src="./element-patch.css"></style>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>
