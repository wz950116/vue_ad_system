// shim
require('./lib/es5-shim.js');

// res
require('./lib/reset.v3.1.1.css');
require('./lib/global.css');

//ie placeholder
require('./lib/placeholder-ie.js');

// vue
var vue = require('vue');

var initLogin = require('./script/login');

// vueResource
var vueResource = require('vue-resource');
vue.use(vueResource);

// element
var element = require('element-ui');
require('element-ui/lib/theme-default/index.css');
// require('./lib/element-index.css');
vue.use(element);

// vueRouter
var vueRouter = require('vue-router');
vue.use(vueRouter);

// price date picker
var price = require('price-date-picker');
vue.use(price);

// app
var app = require('./app.vue');
var routes = require('./script/route.js');
var router = new vueRouter({
    mode: 'hash',
    routes: routes
});
router.beforeEach(function(to, from, next) {
    next();
    var $app = require('./script/data/model/app-status.js');
    $app.routerChange();
});

var store = require('./script/store')

initLogin(function() {
    new vue({
        el: '#app',
        router: router,
        store: store,
        render: function(fn) {
            return fn(app);
        }
    });
});

// window
window.vueRouter = router;

// hide loading
window.document.getElementById('loading').style.display = 'none';
