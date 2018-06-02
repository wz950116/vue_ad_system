<template>
    <div class="alert">
        <span class="success-text" v-if="status == 0">{{message}}</span>
        <span class="fail-text" v-if="status == 1">{{message}}</span>
    </div>
</template>
<style scoped>
.alert {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    height: 58px;
    color: #fff;
    border: rgb(204, 204, 204) 1px solid;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
}

.success-text {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    background: url('./images/ok.png') no-repeat 0px center;
    margin: 0 20px;
    text-indent: 31px;
}

.fail-text {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    background: url('./images/fail.png') no-repeat 0px center;
    margin: 0 20px;
    text-indent: 31px;
}
</style>
<script>
module.exports = {
    props: {
        status: {
            type: Number,
            default: 0 //0代表成功，1代表失败
        },
        message: {
            type: String
        },
        isShow: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {}
    }
};
</script>
