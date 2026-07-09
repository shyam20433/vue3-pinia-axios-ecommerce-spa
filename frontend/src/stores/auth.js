import { defineStore } from 'pinia'
import { carts } from './carts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn:
      JSON.parse(localStorage.getItem('isLoggedIn')) || false,

    currentUser:
      JSON.parse(localStorage.getItem('currentUser')) || null,
  }),

  getters: {
    isAdmin: (state) => {
      return state.currentUser?.role === 'admin'
    },
  },

  actions: {
    login(user) {
      this.currentUser = user
      this.isLoggedIn = true

      localStorage.setItem(
        'currentUser',
        JSON.stringify(user),
      )

      localStorage.setItem(
        'isLoggedIn',
        JSON.stringify(true),
      )

      const cart = carts()


      cart.loadcart()
    },

    loginadmin(admin) {
      this.currentUser = admin
      this.isLoggedIn = true

      localStorage.setItem(
        'currentUser',
        JSON.stringify(this.currentUser),
      )

      localStorage.setItem(
        'isLoggedIn',
        JSON.stringify(true),
      )

      const cart = carts()

      cart.loadcart()
    },

    logout() {
      const cart = carts()

      cart.resetcart()

      this.currentUser = null
      this.isLoggedIn = false

      localStorage.removeItem('currentUser')
      localStorage.setItem(
        'isLoggedIn',
        JSON.stringify(false),
      )
    },
  },
})
