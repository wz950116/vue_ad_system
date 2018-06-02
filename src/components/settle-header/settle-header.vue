<template>
    <div class="step">
        <a href="javascript:;" :class="['step-item',{'light':step > 0}]"><span>1</span>选择类型</a>
        <a href="javascript:;" :class="['step-item',{'light':step > 1}]"><span>2</span>认证资料</a>
    </div>
</template>
<style scoped>
    .step{
        margin-bottom: 40px;
        width:100%;
        overflow: hidden;
        text-align: center;
    }
    .step a:hover{
        cursor: default;
    }
    .step-item{
        display: inline-block;
        width:210px;
        height:35px;
        line-height: 35px;
        color:#fff;
        font-size:16px;
        text-align: left;
        background: #ccc;
        border-radius: 4px;
    }
    .step-item.light{
        background: #ff8a65;
    }
    .step-item span{
        display: inline-block;
        margin-right: 30px;
        width:52px;
        text-align: center;
        background: url("./img/arrow.png") no-repeat right 0;
    }


</style>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        props: {
            step: {
                type: Number,
                default: 1
            },
            ruzhuType: {
                type: Number,
                default: 0
            },
        }

    }
</script>
