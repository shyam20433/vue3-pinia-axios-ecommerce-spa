import { defineStore } from "pinia";

export const carts = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem("cart"))||[]
  }),
  getters: {

  },
  actions: {
    addtocart(products) {
      this.cartItems.push(products)
      localStorage.setItem("cart",JSON.stringify(this.cartItems))
      alert(`${products.name} added`)
    },

    delcart(index){
      this.cartItems.splice(index,1)
      localStorage.setItem("cart",JSON.stringify(this.cartItems))
      alert(`product removed from the cart`)
    },
    clearcart(){
      this.cartItems=[]
      localStorage.removeItem("cart")
    }
  }
})
