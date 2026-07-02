import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import cartsView from '@/views/cartsView.vue'
import { carts } from '@/stores/carts.js'

import manageProductView from '@/views/manageProductView.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to) => {

  const cart = carts()

  if (to.path === "/carts" && cart.cartItems.length === 0) {

    alert("Please add a items to the cart first!")

    return { path: "/products" }
  }

})
export default router
