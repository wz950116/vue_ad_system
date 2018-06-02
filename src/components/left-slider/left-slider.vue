<template>
    <div class="left-slider-wrap">
        <el-menu v-bind:default-active="current" class="el-menu-vertical-demo" theme="dark">
            <el-menu-item index="/"><router-link to='/'>首页</router-link></el-menu-item>
            <el-menu-item index="/spider"><router-link to='error'>错误页</router-link></el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped>
    .left-slider-wrap{
        height: 100%;
    }
    .left-slider-wrap .el-menu-item {
        border-bottom: 1px solid #e1e1e1;
        background: #eff2f7;
    }
    .left-slider-wrap .el-menu-item:hover , .left-slider-wrap .el-menu-item.is-active{
        background-color: #d3dce6;
    }

     .left-slider-wrap .el-menu-item a{
        display:block;
        color:#475669;
    }
    .left-slider-wrap .el-menu-item:hover a,.left-slider-wrap .el-menu-item.is-active a{
        color: #20a0ff;
    }
    .left-slider-wrap .el-submenu{
        border-bottom: 1px solid #e1e1e1;
    }
</style>

<script>
    module.exports = {
        data: function () {
            return {
                self_name:'left-slider',
                slider:'',
                testInfo:'2',
                current: '/'
            }
        },
        beforeMount : function () {
        }
    }
</script>
