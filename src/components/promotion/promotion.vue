<template>
    <div class="wrap global-clearfix">
        <left :style="{ height: mheight + 'px' }"></left>
        <div class="main" :style="{ height: mheight + 'px' }">
            <bread :linkList="breads" />
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<style scoped>
    .wrap {
        background: #fafafa;
        /*height: 100%;*/
        overflow: hidden;
    }

    .main {
        margin-left: 201px;
        height: 100%;
        overflow-y: scroll;
    }
</style>
<script>
    var bread = require('../promotion-breadcrumb/promotion-breadcrumb');
    var left = require('../promotion-left/promotion-left');
    var $$header = require('../../script/data/model/header.js');
    var $$agent = require('../../script/data/model/agent.js');
    var $$customer = require('../../script/data/model/customer.js');
    module.exports = {
        data: function () {
            return {
                breads: [],
                showPromotionCreate: false,
                showIdeaCreate: false,
                mheight: this.$route.name.startsWith('agent') ? document.documentElement.clientHeight - 178: document.documentElement.clientHeight - 110
            };
        },
        components: {
            'left': left,
            'bread': bread
        },
        methods: {
            updateBreads: function () {
                var isAgent = this.$route.name.startsWith('agent'); /* 判断当前页面是代理商下的还是客户下的 */
                var prefix = isAgent ? 'agent' : 'cust';
                var cid = this.$route.params.cid;
                var pid = this.$route.params.pid;
                var uid = this.$route.params.uid;
                this.breads.splice(0, this.breads.length);

                if (isAgent) {
                    this.breads.push({
                        text: $$header.getCacheData().demander.data.companyName || '',
                        route: {
                            path: '/'
                        }
                    });
                    this.breads.push({
                        text: ($$header.getCacheData().subCustomer.companyName || '') + '所有广告内容',
                        route: {
                            name: prefix + '_prom_all',
                            params: {
                                cid: cid
                            }
                        }
                    });
                } else {
                    this.breads.push({
                        text: '所有广告内容',
                        route: {
                            name: prefix + '_prom_all'
                        }
                    });
                }

                if (pid) {
                    this.breads.push({
                        text: ($$customer.getCacheData().planTable[pid] ?
                            $$customer.getCacheData().planTable[pid].name : ''),
                        route: {
                            name: prefix + '_prom_plan',
                            params: {
                                pid: pid
                            }
                        }
                    });
                }

                if (uid) {
                    this.breads.push({
                        text: $$customer.getCacheData().unitTable[uid] ?
                            $$customer.getCacheData().unitTable[uid].name : '',
                        route: {
                            name: prefix + '_prom_unit',
                            params: {
                                pid: pid,
                                uid: uid
                            }
                        }
                    });
                }
            }
        },
        watch: {
            '$route': function () {
                if (this.$route.name && (this.$route.name.startsWith('agent_prom') || this.$route.name.startsWith('cust_prom'))) {
                    $$customer.updateBreads();
                }
            }
        },
        created: function () {
            this.updateBreads();
        },
        beforeMount: function () {
            var _this = this;
            $$customer.on('updateBreads', function () {
                _this.updateBreads();
            });
            window.onresize = function () {
                 _this.mheight = _this.$route.name.startsWith('agent')? document.documentElement.clientHeight - 178: document.documentElement.clientHeight - 110;
            }
        }
    }
</script>
