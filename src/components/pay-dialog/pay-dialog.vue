<template>
    <div class="pay-dialog">
        <el-dialog custom-class="self-dialog" v-model="dialogVisible" size="tiny">
            <p class="dialog-text">由于Chrome浏览器不支持网银支付，如果您希望使用网银支付，请复制以下链接去IE浏览器（9.0以上版本）中打开并完成支付。</p>
            <!-- <p class="dialog-text text-red" v-show="paying"></p> -->
            <p class="dialog-link" v-show="!paying">{{link}}</p>
            <div class="dialog-footer">
                <el-button class="dialog-btn" v-if="!paying" @click="toIe($event)">复制链接去IE浏览器支付</el-button>
                <el-button class="dialog-btn" v-else @click="checkCharge">支付完成</el-button>
                <el-button class="dialog-btn dialog-btn-red"  @click="toOther">使用其他方式支付</el-button>
                <!-- <el-button @click="dialogVisible = false;" v-show="paying && result">确 定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>
<style src="./element-patch.css"></style>
<script src="./main.js"></script>