<template>
    <div class="promotion-banner">
        <span 
            v-for="(item, index) of tabs"
            v-bind:class="['banner-item', {cur: (index === cur)}]"
            @click="changeTab(index)">
            {{ item.text }}
        </span>
    </div>
</template>
<style scoped>
    .promotion-banner {
        margin:0 40px 20px 40px;
        padding-left: 38px;
        border-bottom: 1px solid #d8d8d8;
        background: #fafafa;
    }

    .promotion-banner .banner-item {
        display: inline-block;
        margin-right: 80px;
        padding: 0 17px;
        color: #333;
        font-size: 16px;
        line-height: 35px;
        cursor: pointer;
    }

    .promotion-banner .banner-item.cur {
       /* margin-bottom: -1px;*/
        color: #e43;
        border-bottom: 2px solid #e43;
    }
</style>
<script>
    var $$customer = require('../../script/data/model/customer.js');
    module.exports = {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            list: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                cur: this.defaultIndex,
                tabs: this.list
            };
        },
        watch: {
            defaultIndex: function () {
                this.cur = this.defaultIndex;
            }
        },
        methods: {
            changeTab: function (index) {
                this.cur = index;
                this.$emit('change', this.cur);
            },
            getQueryString: function (name) {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var str = location.href;
                var num = str.indexOf("?") 
                str = str.substr(num+1); 
                var result = str.match(reg);
                if (result != null) {
                    return  unescape(result[2]);
                } else {
                    return null;
                }
            }
        },
        beforeMount: function () {
            var _this = this;
            $$customer.on('changeTab', function () {
                _this.changeTab(_this.defaultIndex);
            });
        }
    };
</script>
