<template>
    <div class="doc">
        <index-header></index-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script scoped>
    module.exports =  {
        components: {
            'index-header': require('../header/header.vue')
        }
    };
</script>
