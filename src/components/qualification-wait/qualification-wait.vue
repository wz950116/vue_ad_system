<template>
    <div class="settle-wrap" :style="{ height: mheight + 'px' }">
        <h3>请等待管理员确认请求!</h3>
    </div>
</template>
<style scoped>
    .settle-wrap {
        width: 1200px;
        margin: 20px auto 21px;
        padding-top: 130px;
        background: #fff url(./warming.png) no-repeat center 50px;
    }

    .settle-wrap h3 {
        margin: 10px auto;
        text-align: center;
        font-size: 24px;
        color: #ee4433;
    }
</style>
<script scoped>
    module.exports = {
        data: function () {
            return {
                mheight: document.documentElement.clientHeight - 400
            }
        },
        methods: {

        }
    }
</script>