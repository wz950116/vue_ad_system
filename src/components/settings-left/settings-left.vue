<template>
    <div class="nav-wrap">
        <ul class="nav">
            <li v-for="(item, index) in lists" v-on:click="selected(index)" v-bind:class="{ 'tab-on': item.isActive }">
                <router-link :to="item.routerName">
                    <span v-bind:class="{ 'text-on': item.isActive }">{{item.listName}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.nav-wrap {
    background-color: #fff;
    width: 199px;
    border-right: 1px solid rgb(216, 216, 216);
    height: 100%;
}

.nav {
    width: 110px;
    padding-top: 40px;
    padding-left: 30px;
    height: 100%;
}

.nav li {
    height: 38px;
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(213, 213, 213);
    text-align: center;
    margin-bottom: 19px;
    cursor: pointer;
    position: relative;
}

.nav li.tab-on:after {
    position: absolute;
    width: 15px;
    height: 28px;
    background: url('./images/arrow.png') no-repeat 0px 0px;
    top: 5px;
    left: 154px;
    content: '';
}

.nav .tab-on {
    background-color: rgb(252, 99, 77);
    border: 1px solid rgb(252, 99, 77);
    color: #fff;
}

.nav li span {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #333333;
    height: 38px;
    line-height: 38px;
}

.nav .text-on {
    color: #fff;
}
</style>
<script>
var $model = require('../../script/data/model/header');
var $user = require('../../script/data/model/user.js');
var $app = require('../../script/data/model/app-status.js');
var _ = require('../../lib/underscore.v1.8.3.js');
module.exports = {
    data: function() {
        return {
            lists: [],
            listsShow: [{
                listName: '账号设置',
                routerName: 'account',
                isActive: true
            }, {
                listName: '楼盘管理',
                routerName: 'estate',
                isActive: false
            }, {
                listName: '资质管理',
                routerName: 'qualification',
                isActive: false
            }, {
                listName: '权限管理',
                routerName: 'authority',
                isActive: false
            }, {
                listName: '通知管理',
                routerName: 'notice',
                isActive: false
            }, {
                listName: '操作日志',
                routerName: 'log',
                isActive: false
            }],
            listsHide: [{
                listName: '账号设置',
                routerName: 'account',
                isActive: true
            }, {
                listName: '权限管理',
                routerName: 'authority',
                isActive: false
            }, {
                listName: '通知管理',
                routerName: 'notice',
                isActive: false
            }, {
                listName: '操作日志',
                routerName: 'log',
                isActive: false
            }],
            settingHide: true
        }
    },
    beforeMount: function() {
        var _this = this;
        var list = this.lists;
        var len = list.length;
        var data = $user.getCurrentInfo().data;

        //如果权限是操作员：有部分权限
        if (data.userRoleName == 'ROLE_DEMANDER_OPERATOR') {
            if (vueRouter.app._route.params.cid || parseInt(data.userType) === 0 || parseInt(data.userType) === 1 || parseInt(data.userType) === 2) {
                _this.lists.length = 0;
                _this.lists = [
                    {
                        listName: '楼盘管理',
                        routerName: 'estate',
                        isActive: true
                    }, {
                        listName: '资质管理',
                        routerName: 'qualification',
                        isActive: false
                    },
                    {
                        listName: '账号设置',
                        routerName: 'account',
                        isActive: false
                    }
                ];
            } else {
                _this.lists.length = 0;
                _this.lists = [];
            }
        } else if (data.userRoleName == 'ROLE_DEMANDER_ADMIN') {
            //如果权限是管理员员：拥有全部权限

            if (vueRouter.app._route.params.cid || parseInt(data.userType) === 0 || parseInt(data.userType) === 1 || parseInt(data.userType) === 2) {
                _this.lists.length = 0;

                
                if (vueRouter.app._route.params.cid) {
                    _this.listsShow.forEach(function(item) {
                        _this.lists.push(item);
                    });
                }else {
                    if (data.userType == 1) {
                        //如果是代理商
                        _this.listsHide.forEach(function(item) {
                            _this.lists.push(item);
                        });
                    } else {
                        _this.listsShow.forEach(function(item) {
                            _this.lists.push(item);
                        });
                    }
                }

            } else {
                _this.lists.length = 0;
                _this.lists = [];
            }
        }
        // if (vueRouter.app._route.params.cid || parseInt(data.userType) === 0 || parseInt(data.userType) === 2) {
        //     _this.lists.length = 0;
        //     _this.listsShow.forEach(function(item) {
        //         _this.lists.push(item);
        //     });
        //
        // } else {
        //     _this.lists.length = 0;
        //     _this.listsHide.forEach(function(item) {
        //         _this.lists.push(item);
        //     });
        // }
        var fnSwitchTab = function() {
            var path = _this.$route.path;
            var len = _this.lists.length;
            var list = _this.lists;
            for (var i = 0; i < len; i++) {
                if (path.indexOf(list[i].routerName) >= 0) {
                    list[i].isActive = true;
                } else {
                    list[i].isActive = false;
                }
            }
        };

        $model.on('inTab', function() {
            fnSwitchTab();
        });
        $app.on('routerChange', function() {
            fnSwitchTab();
        });
    },
    methods: {
        selected: function(index) {
            var _self = this;
            _.each(_self.lists, function(v, i) {
                if (i === index) {
                    v.isActive = true;
                } else {
                    v.isActive = false;

                }
            });
        }
    }
};
</script>
