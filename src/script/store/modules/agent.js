export const CPD_BUY_LIST_NUM = 'CPD_BUY_LIST_NUM'

const agent = {
    state: {
    	cpdBuyListNum: 0
    },
    mutations: {
    	[CPD_BUY_LIST_NUM] (state, num) {
    		state.cpdBuyListNum = num;
    	}
    },
    actions: {
    	setCpdBuyListNum ({commit}, num) {
    		commit(CPD_BUY_LIST_NUM, num);
    	}
    }
}

export default agent