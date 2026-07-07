import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useToast } from 'vue-toastification'

const toast = useToast()



export const carts = defineStore('cart', {
  state: () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const key = currentUser ? `cart_${currentUser.id}` : null;
    return {
      cartItems: key ? JSON.parse(localStorage.getItem(key)) || []
        : []
    }
  },
  getters: {

    totalprice: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0);
    },
    totalitems: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + (item.quantity)
      }, 0);
    }
  },
  actions: {
    getcartkey() {
      const auth = useAuthStore();
      if (!auth.currentUser) {
        return null;
      }
      return `cart_${auth.currentUser.id}`;
    },
    loadcart() {
      const key = this.getcartkey();
      if (!key) {
        this.cartItems = [];
        return;
      }
      this.cartItems = JSON.parse(localStorage.getItem(key)) || [];
    },
    /* savecart(){
      const key=this.getcartkey()
      if(key){
        localStorage.setItem(key,JSON.stringify(this.cartItems))
      }
    }, */


    addtocart(products) {


      const exists = this.cartItems.find(
        item => item.id === products.id
      )

      if (exists) {
        exists.quantity++

        toast.success(
          `${products.name}'s quantity is increased to ${exists.quantity}`,

        )
      } else {
        this.cartItems.push({
          ...products,
          quantity: 1
        })

        toast.success(
          `${products.name} added to cart`
        )
      }

      const key = this.getcartkey()

      localStorage.setItem(
        key,
        JSON.stringify(this.cartItems)
      )
    },

    delcart(id) {
      const index = this.cartItems.findIndex(
        item => item.id === id
      )

      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }

      const key = this.getcartkey()

      localStorage.setItem(
        key,
        JSON.stringify(this.cartItems)
      )
    },
    clearcart() {
      const key = this.getcartkey()
      this.cartItems = []
      if (key) {
        localStorage.removeItem(key)
      }
    },
    increasequantity(id) {
      const exits = this.cartItems.find(
        item => item.id === id
      )
      if (exits) {
        exits.quantity++;
      }
      const key = this.getcartkey()
      localStorage.setItem(key, JSON.stringify(this.cartItems))
      //this.savecart()

    },
    decreasequantity(id) {
      const index = this.cartItems.findIndex(
        item => item.id == id
      )
      if (index !== -1) {
        this.cartItems[index].quantity--

        if (this.cartItems[index].quantity === 0) {
          this.cartItems.splice(index, 1)
        }
        const key = this.getcartkey()
        localStorage.setItem(key, JSON.stringify(this.cartItems))
      }
      //this.savecart()
    },
    resetcart() {
      this.cartItems = [];
    }
  }
})
