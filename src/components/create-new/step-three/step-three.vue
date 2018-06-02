<template>
    <div class="step-three step-wrapper">
        <div class="panel">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">设定投放时间</span>
                </div>
            </div>
            <div class="panel-content">
                 <el-date-picker
                    v-show="payForm.longTime"
                    class="date-pick"
                    v-model="dateRange"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-date-picker
                    v-show="!payForm.longTime"
                    v-model="dateRange"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 220px">
                </el-date-picker>
                <el-checkbox v-model="payForm.longTime">长期投放(仅设置开始日期)</el-checkbox> 
            </div>
        </div>
        <div class="panel">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">设定投放区域</span>
                </div>
            </div>
            <div class="panel-content">
                <el-radio-group v-model="payForm.areaLimit">
                    <el-radio :label="'0'">不限</el-radio>
                    <el-radio :label="'1'">自定义</el-radio>
                </el-radio-group>
                <div v-show="payForm.areaLimit === '1'" class="area-wrapper global-clearfix">
                    <div class="area-item area-l">
                        <div class="area-inner">
                            <div class="inner-header">国内</div>
                            <div class="inner-content" v-loading="treeLoading" element-loading-text="请稍等">
                                <el-tree ref="tree" show-checkbox :data="treeData" :props="defaultProps"></el-tree>
                            </div>
                        </div>
                    </div>
                    <div class="area-item area-m">
                        <el-button size="small" icon="plus" @click="addCity">添加</el-button>
                    </div>
                    <div class="area-item area-r">
                        <div class="area-inner">
                            <div class="inner-header">已选择<span class="num">{{chooseCity.length}}</span>个，还剩{{restCity}}个可选</div>
                            <div class="inner-content">
                                <div class="choosed">
                                    <div v-for="(item, index) in chooseCity" class="content-item">{{item.provinceName}} {{item.name}}<div class="content-close" @click="delCity(index)"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-header global-clearfix">
                <div class="panel-header-l">
                    <span class="panel-header-title">设定付费信息</span>
                </div>
            </div>
            <div class="panel-content">
                <el-form label-position="left" :model="payForm" :rules="payFormRules" ref="ruleForm" label-width="100px">
                    <el-form-item label="广告单元名称" prop="orderName">
                        <el-input placeholder="请输入广告单元名称" class="unit-input" v-model="payForm.orderName"></el-input>
                    </el-form-item>
                    <el-form-item label="计费方式" prop="costType">
                        <el-radio :label="1" v-model="payForm.costType">CPM</el-radio>
                    </el-form-item>
                    <el-form-item label="限额">
                        <el-radio-group v-model="limitType">
                            <el-radio :label="1">不限</el-radio>
                            <el-radio :label="2">每日限额</el-radio>
                        </el-radio-group>
                        <el-input :disabled="limitType === 1 ? true : false" placeholder="请输入限额" class="limitMoney" v-model="getPayFormLimit"></el-input>
                        <span v-if="limitType === 1 ? false : true">只能输入100以上整数<span>
                    </el-form-item>
                    <el-form-item label="广告出价" prop="bid">
                        <el-input placeholder="请输入广告出价" class="unit-input price" v-model="payForm.bid"></el-input>元/千次展示
                        <span>建议出价大于{{floorPrice}}元/千次展示</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./step-three.js"></script>
<style scoped src="../create-new-common.css"></style>
<style scoped src="./step-three.css"></style> 