<template>
    <div class="settle-wrap">
        <settle-header></settle-header>
        <info :type="type"></info>
    </div>
</template>
<style scoped>
    .settle-wrap {
        width: 1200px;
        margin: 20px auto 0;
        padding-top: 40px;
        background-color: #fff;
    }
</style>
<script scoped>

    var settleHeader = require('../settle-header/settle-header.vue');
    var $$qualiModel = require('../../script/data/model/qualification.js');
    var info = require('../qualification-info/qualification-info.vue');
    module.exports = {
        data: function () {
            return {
                type: 1
            }
        },
        components: {
            'settleHeader': settleHeader,
            'info': info
        },
        activated: function () {
            this.type = parseInt(this.$route.query.type);
        }
    }

</script>