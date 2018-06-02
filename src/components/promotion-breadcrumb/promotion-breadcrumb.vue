<template>
    <div class="promotion-breadcrumb" >
        <router-link
            :to="item.route"
            class="bread-item"
            v-for="item in links">{{item.text}}</router-link>
    </div>
</template>
<style scoped>
    .promotion-breadcrumb {
        margin-bottom: 33px;
        padding-left: 17px;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        border-bottom: 1px solid #d8d8d8;
        background: #fff;
        box-sizing: border-box;
    }

    .promotion-breadcrumb .bread-item {
        color: #999;
    }
    .promotion-breadcrumb .bread-item:after {
        content:'>';
        display: inline-block;
        padding:0 2px 0 5px;
    }
    .promotion-breadcrumb .bread-item:last-child:after {
        content:'';
        display: inline-block;
        visibility: hidden;
    }
</style>
<script>
    module.exports = {
        props: {
            linkList: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                links: this.linkList
            }
        },
        methods: {

        }
    }
</script>
