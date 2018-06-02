<template>
    <div class="edit-cpm-dialog">
        <el-dialog title="编辑广告单元" v-model="dialogVisible">
            <div class="cpm-dialog-wrapper" v-loading="loading" element-loading-text="请稍等">
                <cpm-step-three ref="cpmStepThree"></cpm-step-three>
                <div class="bottom-edit global-clearfix">
                    <div class="bottom-edit-l">
                        <div class="bottom-edit-btn" @click="dialogVisible = false;">取消</div>
                    </div>
                    <div class="bottom-edit-r">
                        <div class="bottom-edit-btn edit-btn-sure" @click="save">确认</div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./edit-cpm-dialog.js"></script>
<style scoped src="./edit-cpm-dialog.css"></style>
<style>
    body .edit-cpm-dialog .el-dialog {
        width: 908px!important;
    }
</style>