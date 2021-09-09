import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminLogin from '../views/AdminLogin.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/Dashboard',
    components: {
      default:()=>import("../components/Dashboard.vue"),
      Sidebar:()=>import("../views/Sidebar.vue")
    }
  }, 
  {
    path: '/MyBookings',
    components: {
      default:()=>import("../components/MyBookings.vue"),
      Sidebar:()=>import("../views/Sidebar.vue")
    }
  }, 
  ,
  {
    path: '/AdminDashboard',
    components: {
      default:()=>import("../components/AdminDashboard.vue"),
      AdminSidebar:()=>import("../views/AdminSidebar.vue")
    }
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
