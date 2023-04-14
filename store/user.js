export default {
  // 开启命名空间
  namespaced: true,
  
  // state 数据
  state: () => ({
    // 3. 获取本地的收获地址数据，初始化 address 对象
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  
  // 方法
  mutations: {
    // 更新收获地址
    updateAddress(state, address) {
      state.address = address
      
      // 2.通过 this.commit() 方法，调用 m_user模块下的 saveAddressToStorage
      this.commit('m_user/saveAddressToStorage')
    },
    // 1. 定义将 address 持久化存储到本地的 mutations 方法
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
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