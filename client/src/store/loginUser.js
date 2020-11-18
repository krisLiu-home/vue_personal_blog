import * as loginSer from '../services/loginServices'
export default {
  namespaced: true,
  state: {
    data: null,  // 管理员信息
    isLoading: false,  // 是否正在登录
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    /**
     * 登录
     * @param {*} param0 
     * @param {*} loginId 
     * @param {*} loginPwd 
     */
    async login({ commit }, {loginId, loginPwd}) {
      commit('setIsLoading', true);
      const result = await loginSer.login(loginId, loginPwd);
      commit('setData', result.data.data);
      commit('setIsLoading', false);
    },

    /**
     * 登出
     */
    loginOut() {
      localStorage.removeItem('token');
    },

    /**
     * who am i
     * @param {*} param0 
     */
    async whoAmI({commit}) {
      commit('setIsLoading', true);
      try{
      const result = await loginSer.whoAmI();
      commit('setData', result.data);
      } catch {
        commit('setData', null);
      }
      commit('setIsLoading', false);
    }
  }
}