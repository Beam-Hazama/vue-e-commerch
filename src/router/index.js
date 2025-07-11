import { createRouter, createWebHistory } from 'vue-router'
//user
import HomeView from '@/views/user/HomeView.vue'
import CartView from '@/views/user/CartView.vue'
import Checkout from '@/views/user/Checkout.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SearchView from '@/views/user/SearchView.vue'
import SuccessView from '@/views/user/SuccessView.vue'

//admin
import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from'@/views/admin/DashboardView.vue'

import AdminOrderDetail from '@/views/admin/order/DetailView.vue'
import AdminOrderlist from '@/views/admin/order/ListView.vue'

import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'

import { uesAccountStore } from '@/stores/account'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView,
    },

    //admin
    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin,
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate,
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate,
    },
    {
      path: '/admin/products/list',
      name: 'admin-products-list',
      component: AdminProductList,
    },
    {
      path: '/admin/order',
      name: 'admin-orders-list',
      component: AdminOrderlist,
    },
    {
      path: '/admin/order/detail/:id',
      name: 'admin-orders-detail',
      component: AdminOrderDetail,
    },
    {
      path: '/admin/user',
      name: 'admin-users-list',
      component: AdminUserList,
    },
    {
      path: '/admin/user/update/:id',
      name: 'admin-users-update',
      component: AdminUserUpdate,
    },
  ],
})

router.beforeEach(async(to,from,next)=>{
  const accountStore = uesAccountStore()
  await accountStore.checkAuth()
  if (to.name.includes('admin') && !accountStore.isAdmin){
    next({name:'home'})
  } else if(to.name === 'login' && accountStore.isAdmin){
    next({name:'admin-dashboard'})
  } else {
  next()
  }
})

export default router
