<template>
    <div class="root">
        <purchase-main :headerStatus="headerStatus" :footerStatus="footerStatus"/>
    </div>
</template>
<script>
    var purchaseMain = require('../purchase-main/purchase-main');
    module.exports = {
        data: function () {
            return {
                headerStatus: 1,
                footerStatus: 1
            }
        },
        components: {
            "purchase-main": purchaseMain
        }
    };
</script>