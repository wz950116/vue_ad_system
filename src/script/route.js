var routers = [{
    path: '/',
    redirect: '/customer',
    component: function(resolve) {
        return require(['../components/layout/layout.vue'], resolve)
    },
    children: [{
        path: '/customer',
        name: 'cust',
        redirect: '/customer/index',
        component: function(resolve) {
            return require([
                '../components/customer/customer.vue'
            ], resolve)
        },
        children: [{
            path: 'index',
            component: function(resolve) {
                return require([
                    '../components/index/index.vue'
                ], resolve)
            }
        }, {
            path: 'promotion',
            component: function(resolve) {
                return require([
                    '../components/promotion/promotion.vue'
                ], resolve)
            },
            children: [{
                path: 'all',
                name: 'cust_prom_all',
                component: function(resolve) {
                    return require([
                        '../components/promotion-all/promotion-all.vue'
                    ], resolve)
                }
            }, {
                path: 'plan/:pid',
                name: 'cust_prom_plan',
                component: function(resolve) {
                    return require([
                        '../components/promotion-plan-index/promotion-plan-index.vue'
                    ], resolve)
                },
                children: [{
                    path: 'unit/:uid',
                    name: 'cust_prom_unit',
                    component: function(resolve) {
                        return require([
                            '../components/promotion-unit-index/promotion-unit-index.vue'
                        ], resolve)
                    }
                }]
            }]
        }, {
            path: 'purchase',
            component: function(resolve) {
                return require([
                    '../components/purchase/purchase.vue'
                ], resolve)
            },
            children: [{
                path: 'buy',
                component: function(resolve) {
                    return require([
                        '../components/purchase-buying/purchase-buying.vue'
                    ], resolve)
                }
            }, {
                path: 'distribute',
                name: 'pur_dist',
                component: function(resolve) {
                    return require([
                        '../components/purchase-distribution/purchase-distribution.vue'
                    ], resolve)
                }
            }]
        }, {
            path: 'finance',
            component: function(resolve) {
                return require([
                    '../components/finance/finance.vue'
                ], resolve)
            },
            children: [{
                path: 'overview',
                component: function(resolve) {
                    return require([
                        '../components/finance-overview/finance-overview.vue'
                    ], resolve)
                }
            }, {
                path: 'detail',
                component: function(resolve) {
                    return require([
                        '../components/finance-detail/finance-detail.vue'
                    ], resolve)
                }
            }, {
                path: 'invoice',
                component: function(resolve) {
                    return require([
                        '../components/finance-invoice/finance-invoice.vue'
                    ], resolve)
                }
            }, {
                path: 'credit',
                component: function(resolve) {
                    return require([
                        '../components/finance-credit/finance-credit.vue'
                    ], resolve)
                }
            }, {
                path: 'task',
                component: function(resolve) {
                    return require([
                        '../components/finance-task/finance-task.vue'
                    ], resolve)
                }
            }, {
                name: 'charge',
                path: 'charge',
                component: function(resolve) {
                    return require([
                        '../components/finance-charge/finance-charge.vue'
                    ], resolve)
                }
            }]
        }, {
            path: 'settings',
            component: function(resolve) {
                return require([
                    '../components/settings/settings.vue'
                ], resolve)
            },
            children: [{
                path: 'account',
                component: function(resolve) {
                    return require([
                        '../components/settings-account/settings-account.vue'
                    ], resolve)
                }
            }, {
                path: 'estate',
                component: function(resolve) {
                    return require([
                        '../components/settings-estate/settings-estate.vue'
                    ], resolve)
                }
            }, {
                path: 'notice',
                component: function(resolve) {
                    return require([
                        '../components/settings-notice/settings-notice.vue'
                    ], resolve)
                }
            }, {
                path: 'qualification',
                component: function(resolve) {
                    return require([
                        '../components/settings-qualification/settings-qualification.vue'
                    ], resolve)
                }
            }, {
                path: 'authority',
                component: function(resolve) {
                    return require([
                        '../components/settings-authority/settings-authority.vue'
                    ], resolve)
                }
            }, {
                path: 'log',
                component: function(resolve) {
                    return require([
                        '../components/settings-log/settings-log.vue'
                    ], resolve)
                }
            }]
        }]
    }, {
        path: '/agent/:cid',
        name: 'agent',
        component: function(resolve) {
            return require(['../components/agent/agent.vue'],
                resolve)
        },
        children: [{
            path: '/',
            name: 'sub_cust',
            redirect: '/agent/:cid/promotion',
            component: function(resolve) {
                return require([
                    '../components/promotion/promotion.vue'
                ], resolve)
            }
        }, {
            path: 'promotion',
            component: function(resolve) {
                return require([
                    '../components/promotion/promotion.vue'
                ], resolve)
            },
            children: [{
                path: '/',
                redirect: 'all'
            }, {
                path: 'all',
                name: 'agent_prom_all',
                component: function(resolve) {
                    return require([
                        '../components/promotion-all/promotion-all.vue'
                    ], resolve)
                }
            }, {
                path: 'plan/:pid',
                name: 'agent_prom_plan',
                component: function(resolve) {
                    return require([
                        '../components/promotion-plan-index/promotion-plan-index.vue'
                    ], resolve)
                },
                children: [{
                    path: 'unit/:uid',
                    name: 'agent_prom_unit',
                    component: function(resolve) {
                        return require([
                            '../components/promotion-unit-index/promotion-unit-index.vue'
                        ], resolve)
                    }
                }]
            }]
        }, {
            path: 'finance',
            component: function(resolve) {
                return require([
                    '../components/finance/finance.vue'
                ], resolve)
            },
            children: [{
                path: '/',
                redirect: 'overview'
            }, {
                path: 'overview',
                component: function(resolve) {
                    return require([
                        '../components/finance-overview/finance-overview.vue'
                    ], resolve)
                }
            }, {
                path: 'detail',
                component: function(resolve) {
                    return require([
                        '../components/finance-detail/finance-detail.vue'
                    ], resolve)
                }
            }, {
                path: 'invoice',
                component: function(resolve) {
                    return require([
                        '../components/finance-invoice/finance-invoice.vue'
                    ], resolve)
                }
            }, {
                path: 'credit',
                component: function(resolve) {
                    return require([
                        '../components/finance-credit/finance-credit.vue'
                    ], resolve)
                }
            }, {
                path: 'task',
                component: function(resolve) {
                    return require([
                        '../components/finance-task/finance-task.vue'
                    ], resolve)
                }
            }, {
                path: 'charge',
                component: function(resolve) {
                    return require([
                        '../components/finance-charge/finance-charge.vue'
                    ], resolve)
                }
            }]
        }, {
            path: 'settings',
            component: function(resolve) {
                return require([
                    '../components/settings/settings.vue'
                ], resolve)
            },
            children: [{
                path: 'log',
                component: function(resolve) {
                    return require([
                        '../components/settings-log/settings-log.vue'
                    ], resolve)
                }
            }, {
                path: '/',
                component: function(resolve) {
                    return require([
                        '../components/settings-account/settings-account.vue'
                    ], resolve)
                }
            }, {
                path: 'account',
                component: function(resolve) {
                    return require([
                        '../components/settings-account/settings-account.vue'
                    ], resolve)
                }
            }, {
                path: 'estate',
                component: function(resolve) {
                    return require([
                        '../components/settings-estate/settings-estate.vue'
                    ], resolve)
                }
            }, {
                path: 'notice',
                component: function(resolve) {
                    return require([
                        '../components/settings-notice/settings-notice.vue'
                    ], resolve)
                }
            }, {
                path: 'qualification',
                component: function(resolve) {
                    return require([
                        '../components/settings-qualification/settings-qualification.vue'
                    ], resolve)
                }
            }, {
                path: 'authority',
                component: function(resolve) {
                    return require([
                        '../components/settings-authority/settings-authority.vue'
                    ], resolve)
                }
            }]
        }]
    }]
}, {
    path: '/qualification',
    component: function(resolve) {
        return require([
            '../components/qualification/qualification.vue'
        ], resolve)
    },
    children: [{
        path: 'login',
        component: function(resolve) {
            return require([
                '../components/qualification-login/qualification-login.vue'
            ], resolve)
        }
    }, {
        path: 'collaborator',
        component: function(resolve) {
            return require([
                '../components/qualification-collaborator/qualification-collaborator.vue'
            ], resolve)
        }
    }, {
        path: 'wait',
        component: function(resolve) {
            return require([
                '../components/qualification-wait/qualification-wait.vue'
            ], resolve)
        }
    }, {
        path: 'chose',
        name: 'qualification_chose',
        component: function(resolve) {
            return require([
                '../components/qualification-chose-type/qualification-chose-type.vue'
            ], resolve)
        }
    }, {
        path: 'submit',
        name: 'qualification_submit',
        component: function(resolve) {
            return require([
                '../components/qualification-submit/qualification-submit.vue'
            ], resolve)
        }
    }, {
        path: 'audit',
        name: 'qualification_auditing',
        component: function(resolve) {
            return require([
                '../components/qualification-auditing/qualification-auditing.vue'
            ], resolve)
        }
    }]
}, {
    path: '/*',
    component: function(resolve) {
        return require(['../components/404/404.vue'], resolve)
    }
}];
module.exports = routers;