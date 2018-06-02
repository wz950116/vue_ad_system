<template>
    <div class="layer">
        <div class="layer-box">
            <div class="header"><i @click="cancel"></i></div>
            <div class="item">{{title}}</div>
            <div class="submit global-clearfix">
                <a href="javascript:;" class="submit-btn-ok" @click="submit">{{buttonContent}}</a>
                <a href="javascript:;" class="submit-btn-cancel" @click="cancel">取消</a>
            </div>
            <slot name="explain"></slot>
        </div>
    </div>
</template>
<style scoped>
    .layer{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(51,51,51,0.5);
        z-index: 1;
    }
    .layer-box{
        position: absolute;
        left: 50%;
        top:50%;
        width:485px;
        transform: translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -ms-transform: translate(-50%, -50%);
        background: #fff;
        border: 1px solid #D5D5D5;
        z-index: 100;
    }
    .layer-box .header{
        padding-left:20px;
        height:48px;
        line-height: 48px;
        color:#666;
        font-size: 16px;
        margin: 5px 0;
    }
    .layer-box .header i{
        display: block;
        float: right;
        padding:18px;
        width:14px;
        height:14px;
        cursor: pointer;
        background: url('images/guanbi.png') no-repeat center center;
    }
    .item{
        min-width:300px;
        margin:0 auto 30px;
        font-size: 18px;
        line-height: 1;
        color: #4A4A4A;
        text-align: center;
    }
    .submit{
        width:220px;
        margin:0 auto 30px;
    }
    .submit-btn-ok,.submit-btn-cancel{
        display: inline-block;
        padding:10px 26px;
        font-size: 14px;
        color: #4A4A4A;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
    }
    .submit-btn-ok{
        margin-right:20px;
        background: #FF6246;
        color: #fff;
    }
</style>
<script>
    module.exports = {
        props: {
            title: {
                type: String,
                default: '确认提交？'
            },
            buttonContent: {
                type: String,
                default: '确认'
            }
        },
        data: function () {
            return {
            }
        },
        methods: {
            cancel: function () { // 取消
                this.$emit('cancel');
            },
            submit: function () { // 提交
                this.$emit('submit');
            }
        }
    }
</script>
