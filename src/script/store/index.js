import Vue from 'vue'
import Vuex from 'vuex'

import ad from './modules/ad.js'
import agent from './modules/agent.js'
import city from './modules/city.js'
import finance from './modules/finance.js'
import customer from './modules/customer.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ad,
        agent,
        city,
        finance,
        customer
    }
})
