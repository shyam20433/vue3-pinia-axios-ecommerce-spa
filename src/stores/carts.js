import { defineStore } from "pinia";

export const carts = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),
  getters: {

  },
  actions: {
    addtocart(products) {
      this.cartItems.push(products)
      alert(`${products.name} added`)
    }

  }
})
