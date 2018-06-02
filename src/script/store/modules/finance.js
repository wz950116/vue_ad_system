export const PAGE_NOW = 'PAGE_NOW';

const finance = {
  state: {
    page_now: 'overview'
  },
  mutations: {
    [PAGE_NOW]: function(state, newValue) {
      state.page_now = newValue;
    }
  },
  actions: {
    changeLeft ({commit}, page) {
      // console.log(page);
      commit(PAGE_NOW, page);
    }
  },
}

export default finance
