import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerView from '@/view/CoustomerView.vue'
import LoginView from '@/view/LoginView.vue'
import AdminView from '@/view/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
        name: "login"
    }
  },
  {
      path: "/login",
      name: "login",
      component: LoginView
  },
  {
    path: "/CustomerView",
    name: "CustomerView",
    component: CustomerView
  },
  {
    path: "/AdminView",
    name: "AdminView",
    component: AdminView
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  transitionOnLoad: false
})

export default router
