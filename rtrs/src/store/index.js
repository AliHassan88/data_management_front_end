import Vue from 'vue'
import Vuex from 'vuex'

import login from './login'
import register from './register'
import schedule from './schedule'
import myBookings from './myBookings'
import adminLogin from './adminLogin'
import adminCrud from './adminCrud'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:
  {
    login,
    register,
    schedule,
    myBookings,
    adminLogin,
    adminCrud
  }
})
