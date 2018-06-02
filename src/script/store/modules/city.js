export const USER_TYPE = 'USER_TYPE';
export const USER_NAME = 'USER_NAME';
const city = {
    state: {
    	userType: '',
      userName: ''
    },
    mutations: {
    	[USER_TYPE]: function (state, newValue) {
    		state.userType = newValue;
    	},
      [USER_NAME]: function (state, newValue) {
    		state.userName = newValue;
    	}
    },
    actions: {
    	getUserType: function ({commit}, newValue) {
    		commit(USER_TYPE, newValue);
    	},
      getUserName: function ({commit}, newValue) {
    		commit(USER_NAME, newValue);
    	}
    }
}
//
// export const PAGE_NOW = 'PAGE_NOW';
//
// const finance = {
//   state: {
//     page_now: 'overview'
//   },
//   mutations: {
//     [PAGE_NOW]: function(state, newValue) {
//       state.page_now = newValue;
//     }
//   },
//   actions: {
//     changeLeft ({commit}, page) {
//       // console.log(page);
//       commit(PAGE_NOW, page);
//     }
//   },
// }

export default city
