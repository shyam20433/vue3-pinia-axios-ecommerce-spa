import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import cartsView from '@/views/cartsView.vue'
import { carts } from '@/stores/carts.js'
import { useAuthStore } from '@/stores/auth.js'
import productApi from '@/views/productApi.vue'
import ordersView from '@/views/ordersView.vue'
import { useToast } from 'vue-toastification'
import userView from '@/views/userView.vue'
import profileView from '@/views/profileView.vue'

const toast = useToast()


import manageProductView from '@/views/manageProductView.vue'
import MyOrders from '@/views/myOrders.vue'
import apicall from '@/services/server.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products',
      component: ProductView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/carts',
      name: 'carts',
      component: cartsView,
    },
    {
      path: '/manage',
      name: 'manage',
      component: manageProductView,
    },
    {
      path: '/orders',
      name: 'order',
      component: ordersView,
    },
    {
      path: '/users',
      name: 'users',
      component: userView
    },
    {
      path: '/profile',
      name: 'profile',
      component: profileView
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/myorders',
      name: 'myorders',
      component: MyOrders
    },
    {
      path: '/productapi',
      name: 'productapi',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: productApi,
    }
  ],
})

router.beforeEach(async (to) => {


  const cart = carts()

  if (to.path === "/carts" && cart.cartItems.length === 0) {

    toast.warning("Please add a items to the cart first!")

    return { path: "/productapi" }
  }

  const auth = useAuthStore()
  if ((to.path === '/manage' || to.path === '/orders' || to.path === '/users') && !auth.isAdmin) {
    console.log(`manage checking`)
    toast.warning(`you arent admin !!!`)
    return { path: "/" }
  }


  if (to.path === "/myorders") {
    if (!auth.currentUser) {
      toast.info("Please login first!")
      return { path: "/" }
    }
    const orders = await apicall.getOrders()
    const myOrders = orders.filter(order => order.user?.id === auth.currentUser.id)
    if (myOrders.length === 0) {
      toast.warning("No orders have made so far ")
      return { path: "/productapi" }
    }
  }
})
export default router
