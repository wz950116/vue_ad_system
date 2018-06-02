<template>
    <div class="top-banner">
        <ul class="nav-list">
            <li v-on:click="selected(item)" v-for="(item, index) in navList" v-bind:class="{'nav-item': true,'active': item.isActive}">
                <router-link class="nav-link" :to="item.link">
                    {{item.name}}
                </router-link>
            </li>
        </ul>
        <a v-if="btnSpreadShow" class="btn btn-spread" href="javascript:;" @click="createPromotion">开始推广</a>
        <promotion-create v-if="btnSpreadShow"/>
    </div>
</template>
<script>
var $model = require('../../script/data/model/header');
var $app = require('../../script/data/model/app-status.js');
var promotionCreate = require('../create/create');
var $user = require('../../script/data/model/user.js');

var $customer = require('../../script/data/model/customer');
//全部功能
var navListForIndex = [{
    'name': '首页',
    'isActive': false,
    'link': '/customer/index',
    'type': 'index'
},
{
    'name': '推广管理',
    'isActive': false,
    'link': '/customer/promotion/all',
    'type': 'promotion'
},
{
    'name': '固定广告位采购',
    'isActive': false,
    'link': '/customer/purchase/buy',
    'type': 'purchase'
}, {
    'name': '财务',
    'isActive': false,
    'link': '/customer/finance/overview',
    'type': 'finance'
}, {
    'name': '工具',
    'isActive': false,
    'link': '/customer/settings/account',
    'type': 'settings'
}];

//操作员功能
var navListForOpc = [{
    'name': '首页',
    'isActive': false,
    'link': '/customer/index',
    'type': 'index'
},
{
    'name': '推广管理',
    'isActive': false,
    'link': '/customer/promotion/all',
    'type': 'promotion'
},
{
    'name': '固定广告位采购',
    'isActive': false,
    'link': '/customer/purchase/buy',
    'type': 'purchase'
}, {
    'name': '财务',
    'isActive': false,
    'link': '/customer/finance/overview',
    'type': 'finance'
}, {
    'name': '工具',
    'isActive': false,
    'link': '/customer/settings/estate',
    'type': 'settings'
}];

//财务员功能
var navListForFinance = [{
    'name': '首页',
    'isActive': false,
    'link': '/customer/index',
    'type': 'index'
}, {
    'name': '财务',
    'isActive': false,
    'link': '/customer/finance/overview',
    'type': 'finance'
}];

//观察员功能
var navListForWatcher = [{
    'name': '首页',
    'isActive': false,
    'link': '/customer/index',
    'type': 'index'
}];

//进入后台
var navListForReport = [{
    'name': '推广管理',
    'isActive': false,
    'route': '/promotion/all',
    'type': 'promotion'
}, {
    'name': '财务',
    'isActive': false,
    'route': '/finance/overview',
    'type': 'finance'
}, {
    'name': '工具',
    'isActive': false,
    'route': '/settings/account',
    'type': 'settings'
}];

var navListForCompany = ([]).concat(navListForIndex);
navListForCompany.splice(1, 1, {
    'name': '推广管理',
    'isActive': false,
    'link': '/customer/promotion/all',
    'type': 'promotion'
});

module.exports = {
    data: function() {
        return {
            btnSpreadShow: false,
            navList: [],
            roleType: ''
        };
    },
    props: ['navType'],
    components: {
        'promotion-create': promotionCreate
    },
    beforeMount: function() {
        //获取公司id
        var cid = this.$route.params.cid;
        //获取用户基本信息
        var infoData = $user.getCurrentInfo().data;
        //如果是操作员，对应的子客页面（即进入后台页面）的工具页tab路由要做一下适配。
        if (infoData.userRoleName == 'ROLE_DEMANDER_OPERATOR') {
            navListForReport.splice(2, 1, {
                'name': '工具',
                'isActive': false,
                'route': '/settings/estate',
                'type': 'settings'
            });
        } else {
            navListForReport.splice(2, 1, {
                'name': '工具',
                'isActive': false,
                'route': '/settings/account',
                'type': 'settings'
            });
        }
        if (cid) {
            //处理跳转url
            for (var i = 0; i < navListForReport.length; i++) {
                navListForReport[i].link = '/agent/' + cid + navListForReport[i].route;
            }
        }

        $model.on('getCid', function(cid) {
            if (cid) {
                //处理跳转url
                for (var i = 0; i < navListForReport.length; i++) {
                    navListForReport[i].link = '/agent/' + cid + navListForReport[i].route;
                }
            }
        });
        var _this = this;
        //拉取model
        //判断使用哪一个列表
        if (_this.navType === 'report') {
            //子客
            _this.btnSpreadShow = true;
            _this.navList = ([]).concat(navListForReport);

        } else {
            //权限管理：
            if (infoData.userRoleName == 'ROLE_DEMANDER_OPERATOR') {
                //如果是操作员：
                if (infoData.userType == 0) {
                    //直客:无采购tab
                    navListForOpc.splice(2, 1);
                    _this.btnSpreadShow = true;

                } else if (infoData.userType == 1) {
                    //代理商：无推广tab
                    navListForOpc.splice(1, 1);
                    _this.btnSpreadShow = false;

                } else if (infoData.userType == 2) {
                    //子客：无采购tab
                    navListForOpc.splice(2, 1);
                    _this.btnSpreadShow = true;
                }
                _this.navList = ([]).concat(navListForOpc);

            } else if (infoData.userRoleName == 'ROLE_DEMANDER_OBSERVER') {
                //如果是观察者：(移除了)
                _this.btnSpreadShow = false;
                _this.navList = ([]).concat(navListForWatcher);

            } else if (infoData.userRoleName == 'ROLE_DEMANDER_ACCOUNTANT') {
                //如果是财务员：
                _this.btnSpreadShow = false;
                _this.navList = ([]).concat(navListForFinance);

            } else if (infoData.userRoleName == 'ROLE_DEMANDER_ADMIN') {
                //如果是管理员：
                if (infoData.userType == 0) {
                    //直客:无采购tab
                    navListForIndex.splice(2, 1);
                    _this.btnSpreadShow = true;

                } else if (infoData.userType == 1) {
                    //代理商：无推广tab
                    navListForIndex.splice(1, 1);
                    _this.btnSpreadShow = false;

                } else if (infoData.userType == 2) {
                    //子客:无采购tab
                    navListForIndex.splice(2, 1);
                    _this.btnSpreadShow = true;

                }
                _this.navList = ([]).concat(navListForIndex);
            }
        }

        //原代码
        // if (_this.navType === 'index') {
        //     _this.btnSpreadShow = false;
        //     _this.navList = ([]).concat(navListForIndex);
        // } else if (_this.navType === 'report') {
        //     _this.btnSpreadShow = true;
        //     _this.navList = ([]).concat(navListForReport);
        // } else if (_this.navType === 'company') {
        //     _this.btnSpreadShow = true;
        //     _this.navList = ([]).concat(navListForCompany);
        // }

        var fnSwitchTab = function() {
            var len = _this.navList.length;
            var path = _this.$route.path;

            for (var j = 0; j < len; j++) {
                var ele = _this.navList[j];
                ele.isActive = false;
                if (path.indexOf('index') >= 0 && ele.type === 'index') {
                    ele.isActive = true;
                } else if (path.indexOf('purchase') >= 0 && ele.type === 'purchase') {
                    ele.isActive = true;
                } else if (path.indexOf('finance') >= 0 && ele.type === 'finance') {
                    ele.isActive = true;
                } else if (path.indexOf('settings') >= 0 && ele.type === 'settings') {
                    ele.isActive = true;
                } else if (path.indexOf('promotion') >= 0 && ele.type === 'promotion') {
                    ele.isActive = true;
                }
            }
        };
        fnSwitchTab();
        $app.on('routerChange', function() {
            fnSwitchTab();
        });
    },
    methods: {
        createPromotion: function() {
            $customer.launchCreate();
        },

        // selected: function(item) {
        //     var _this = this;
        //     if (_this.navType === 'index') {
        //         _this.btnSpreadShow = false;
        //         _this.navList = navListForIndex;
        //         var len = navListForIndex.length;
        //         // for (var i = 0; i < len; i++) {
        //         //     if (_this.$route.path.indexOf(navListForIndex[i].link) >= 0) {
        //         //         navListForIndex[i].isActive = true;
        //         //     } else {
        //         //         navListForIndex[i].isActive = false;
        //         //     }
        //         // }
        //         for (var i = 0; i < len; i++) {
        //             navListForIndex[i].isActive = false;
        //         }
        //         item.isActive = true;
        //     } else if (_this.navType === 'report') {
        //         _this.btnSpreadShow = true;
        //         _this.navList = navListForReport;
        //         var len = navListForReport.length;
        //         // for (var j = 0; j < len; j++) {
        //         //     if (_this.$route.path.indexOf(navListForReport[j].link) >= 0) {
        //         //         navListForReport[j].isActive = true;
        //         //     } else {
        //         //         navListForReport[j].isActive = false;
        //         //     }
        //         // }
        //         for (var j = 0; j < len; j++) {
        //             navListForReport[j].isActive = false;
        //         }
        //         item.isActive = true;
        //     } else if (_this.navType === 'company') {
        //         _this.btnSpreadShow = true;
        //         _this.navList = navListForCompany;
        //         var len = navListForCompany.length;
        //         // for (var j = 0; j < len; j++) {
        //         //     if (item.link.indexOf(navListForCompany[j].link) >= 0) {
        //         //         navListForCompany[j].isActive = true;
        //         //     } else {
        //         //         navListForCompany[j].isActive = false;
        //         //     }
        //         // }
        //         for (var j = 0; j < len; j++) {
        //             navListForCompany[j].isActive = false;
        //         }
        //         item.isActive = true;
        //     }
        // }
        selected: function(item) {
            //新版（增加了权限管理的判断 0216）
            var _this = this;
            //获取用户基本信息
            var infoData = $user.getCurrentInfo().data;
            if (_this.navType === 'report') {
                _this.btnSpreadShow = true;
                _this.navList = ([]).concat(navListForReport);

                var len = _this.navList.length;
                for (var j = 0; j < len; j++) {
                    navListForReport[j].isActive = false;
                }
                item.isActive = true;
            } else {
                //权限管理：
                if (infoData.userRoleName == 'ROLE_DEMANDER_OPERATOR') {
                    //如果是操作员：
                    _this.navList = ([]).concat(navListForOpc);

                    var len = _this.navList.length;
                    for (var j = 0; j < len; j++) {
                        navListForOpc[j].isActive = false;
                    }
                    item.isActive = true;
                    //是否显示“开始推广”
                    if (infoData.userType == 0) {
                        _this.btnSpreadShow = true;

                    } else if (infoData.userType == 1) {
                        _this.btnSpreadShow = false;

                    } else if (infoData.userType == 2) {
                        _this.btnSpreadShow = true;
                    }

                } else if (infoData.userRoleName == 'ROLE_DEMANDER_OBSERVER') {
                    //如果是观察者：(移除了)
                    _this.btnSpreadShow = false;
                    _this.navList = ([]).concat(navListForWatcher);

                    var len = _this.navList.length;
                    for (var j = 0; j < len; j++) {
                        navListForWatcher[j].isActive = false;
                    }
                    item.isActive = true;

                } else if (infoData.userRoleName == 'ROLE_DEMANDER_ACCOUNTANT') {
                    //如果是财务员：
                    //是否显示“开始推广”
                    _this.btnSpreadShow = false;
                    _this.navList = ([]).concat(navListForFinance);

                    var len = _this.navList.length;
                    for (var j = 0; j < len; j++) {
                        navListForFinance[j].isActive = false;
                    }
                    item.isActive = true;

                } else if (infoData.userRoleName == 'ROLE_DEMANDER_ADMIN') {
                    //如果是管理员：
                    _this.navList = ([]).concat(navListForIndex);

                    var len = _this.navList.length;
                    for (var j = 0; j < len; j++) {
                        navListForIndex[j].isActive = false;
                    }
                    item.isActive = true;

                    //是否显示“开始推广”
                    if (infoData.userType == 0) {
                        _this.btnSpreadShow = true;

                    } else if (infoData.userType == 1) {
                        _this.btnSpreadShow = false;

                    } else if (infoData.userType == 2) {
                        _this.btnSpreadShow = true;
                    }
                }
            }
            // window.location.reload();
            this.$store.default.dispatch('changeLeft','overview');
        }
    }
};
</script>
<style scoped>
.top-banner {
    height: 50px;
    width: 100%;
    background-color: #57565b;
    position: relative;
}

.nav-list {
    list-style: none;
    overflow: hidden;
    zoom: 1;
    height: 50px;
}

.nav-item {
    display: inline-block;
    height: 50px;
    padding: 0 40px;
}

.nav-link {
    display: inline-block;
    padding: 0 20px;
    color: #fff;
    text-decoration: none;
    height: 46px;
    line-height: 50px;
    font-size: 18px;
}

.nav-item.active .nav-link,
.nav-item:hover .nav-link {
    font-weight: bold;
    border-bottom: 4px solid #ee4433;
}

.top-banner .btn {
    color: #fff;
    height: 50px;
}

.top-banner .btn-spread {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    background-color: #ee4433;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
    font-size: 18px;
}
</style>
