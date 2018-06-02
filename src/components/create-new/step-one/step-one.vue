<template>
    <div class="step-one step-wrapper">
        <div class="panel">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">选择广告计划</span>
                    <el-tooltip effect="light" placement="right" content="请选择或新建一个推广计划，您购买的资源将创建在这个计划下">
                        <span class="icon-question"></span>
                    </el-tooltip>
                </div>
            </div>
            <div class="panel-content" v-loading="adPlan.loading" element-loading-text="请稍等">
                <div class="ad-plan-form">
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title">推广计划
                            <el-tooltip effect="light" placement="right" content="推广计划是广告单元的合集，类似于文件夹的功能，您可以把具有某些共同特点的广告单元置于同一个推广计划当中">
                                <span class="icon-question"></span>
                            </el-tooltip>
                        </div>
                        <el-select class="plan-form-line-item" v-model="form.planId" placeholder="请选择推广计划">
                            <el-option v-for="item in planList" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-button class="plan-form-line-button" icon="plus" @click="toggle">新建计划</el-button>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title">计划预算
                            <el-tooltip effect="light" placement="right" content="此推广计划内所有广告单元的最高总花费">
                                <span class="icon-question"></span>
                            </el-tooltip>
                        </div>
                        <p class="plan-form-p">{{adPlan.budget_total | moneyFormat}}元（可用{{adPlan.availableMoney | moneyFormat}}元）</p>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title">计划描述
                            <el-tooltip effect="light" placement="right" content="您可以为这个计划添加一些备注信息">
                                <span class="icon-question"></span>
                            </el-tooltip>
                        </div>
                        <p class="plan-form-p">{{adPlan.desc}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">设定计费方式</span>
                    <el-tooltip effect="light" placement="right" content="不同的广告资源有不同的计费方式，您可以选择按照自己期望的计费方式进行计费">
                        <span class="icon-question"></span>
                    </el-tooltip>
                </div>
            </div>
            <div class="panel-content">
                <el-radio-group class="step-one-radio" v-model="form.costType">
                    <el-radio :label="0">按天计费
                        <el-tooltip effect="light" placement="right" content="您的广告将获得全量的曝光，并且按照每天的价格进行计费">
                            <span class="icon-question"></span>
                        </el-tooltip>
                    </el-radio>
                    <el-radio :label="1">按展示计费
                        <el-tooltip effect="light" placement="right" content="您的广告将与其他广告主进行竞价，最后按照您的实际曝光量进行计费">
                            <span class="icon-question"></span>
                        </el-tooltip>
                    </el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="panel" v-if="form.costType === 1">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">设定推广内容</span>
                    <el-tooltip effect="light" placement="right" content="请选择您想推广的内容，以及呈现给用户的页面">
                        <span class="icon-question"></span>
                    </el-tooltip>
                </div>
            </div>
            <div class="panel-content">
                <div class="ad-plan-form">
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title long">
                            <el-radio size="small" class="radio" v-model="form.supportType" label="estate">关联楼盘
                                <el-tooltip effect="light" placement="right" content="推广您关联的楼盘，如果还没有关联楼盘请先添加楼盘">
                                    <span class="icon-question"></span>
                                </el-tooltip>
                            </el-radio>
                        </div>
                        <div class="panel-content-right" v-if="form.supportType === 'estate'">
                            <el-button class="plan-form-line-button" @click="addEstate">添加楼盘</el-button>
                            <el-select class="plan-form-line-loupan" v-model="form.estateId" placeholder="选择楼盘" filterable>
                                <el-option v-for="item in estateList" :label="item.estateName" :value="item.estateId"></el-option>
                            </el-select>
                            <el-select class="plan-form-line-ldy" v-model="form.linkType" placeholder="选择落地页">
                                <el-option label="楼盘详情页" :value="0"></el-option>
                                <el-option label="自定义页面" :value="1"></el-option>
                            </el-select>
                            <el-input style="width: 230px;display: inline-block;" v-if="form.linkType === 1" placeholder="请填链接" v-model="form.link"></el-input>
                            <el-button class="plan-form-line-button" @click="preview">点击预览</el-button>
                        </div>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title long">
                            <el-radio size="small" class="radio" v-model="form.supportType" label="live">焦点直播
                                <el-tooltip effect="light" placement="right" content="推广您在焦点看房APP上注册的直播间">
                                    <span class="icon-question"></span>
                                </el-tooltip>
                            </el-radio>
                        </div>
                        <div v-if="form.supportType === 'live'" class="panel-content-right">
                            <el-input v-model="form.liveId" class="content-right-ip" placeholder="请输入直播间ID"></el-input>
                            <el-button class="plan-form-line-button" @click="preview">点击预览</el-button>
                        </div>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title long">
                            <el-radio size="small" class="radio" v-model="form.supportType" label="news">文章资讯
                                <el-tooltip effect="light" placement="right" content="推广焦点中的文章或者资讯">
                                    <span class="icon-question"></span>
                                </el-tooltip>
                            </el-radio>
                        </div>
                        <div class="panel-content-right" v-if="form.supportType === 'news'">
                            <el-input v-model="form.link" class="content-right-ip" placeholder="请输入文章链接"></el-input>
                            <el-button class="plan-form-line-button" @click="preview">点击预览</el-button>
                        </div>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title long">
                            <el-radio size="small" class="radio" v-model="form.supportType" label="forum">论坛帖子
                                <el-tooltip effect="light" placement="right" content="推广焦点论坛中的一个帖子">
                                    <span class="icon-question"></span>
                                </el-tooltip>
                            </el-radio>
                        </div>
                        <div class="panel-content-right"  v-if="form.supportType === 'forum'">
                            <el-input v-model="form.link" class="content-right-ip" placeholder="请输入帖子链接"></el-input>
                            <el-button class="plan-form-line-button" @click="preview">点击预览</el-button>
                        </div>
                    </div>
                    <div class="plan-form-line global-clearfix">
                        <div class="plan-form-line-title long">
                            <el-radio size="small" class="radio" v-model="form.supportType" label="web">网站链接<span class="icon-question"></span></el-radio>
                        </div>
                        <div class="panel-content-right" v-if="form.supportType === 'web'">
                            <el-input v-model="form.link" class="content-right-ip" placeholder="请输入网站链接" @blur="checkoutUrl"></el-input>
                            <el-button class="plan-form-line-button" @click="preview">点击预览</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <promotionPlanCreate ref="createPlanRef" v-show="addPlanDialogShow" v-on:close="toggle()" v-on:submit="submitCreatePlan"></promotionPlanCreate>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./step-one.js"></script>
<style scoped src="../create-new-common.css"></style>
<style scoped src="./step-one.css"></style>
<style>
    .step-one .el-icon-plus {
        color: #FF613E;
    }
</style>