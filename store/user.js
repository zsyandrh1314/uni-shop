export default {
  // 开启命名空间
  namespaced: true,
  
  // state 数据
  state: () => ({
    // token: '',
    // 3. 获取本地的收获地址数据，初始化 address 对象
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录成功之后的 token 字符串
    token: uni.getStorageSync('token') || '',
    // 用户的基本信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),
  
  // 方法
  mutations: {
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    },
    // 更新收获地址
    updateAddress(state, address) {
      state.address = address
      // 2.通过 this.commit() 方法，调用 m_user模块下的 saveAddressToStorage
      this.commit('m_user/saveAddressToStorage')
    },
    
    // 1. 定义将 address 持久化存储到本地的 mutations 方法
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    
    // 更新用户的基本信息
      updateUserInfo(state, userinfo) {
        state.userinfo = userinfo
        // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
        this.commit('m_user/saveUserInfoToStorage')
      },
      
      // 将 userinfo 持久化存储到本地
      saveUserInfoToStorage(state) {
        uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
      },
      
      // 更新 token 字符串 (将token存储到vuex)
      updateToken(state, token) {
        state.token = token
        // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法,将 token 字符串持久化存储到本地
        this.commit('m_user/saveTokenToStorage')
      },
      
      // 将 token 字符串持久化存储到本地
      saveTokenToStorage(state) {
        uni.setStorageSync('token', state.token)
      }
  },
  
  // 数据包装器
  getters:{
    // 把收货的详细地址抽离为 getters，方便在多个页面和组件之间实现复用
    // 收获详细地址的计算属性
    addstr(state) {
      //provinceName 国标收货地址第一级地址
      if (!state.address.provinceName) return ''
      
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}