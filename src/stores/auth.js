import { defineStore } from "pinia";
import { carts } from "./carts";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null
  }),

  getters: {
    isAdmin: (state) => {
      return state.currentUser?.role === "admin";
    }
  },

  actions: {
    login(user) {
      this.currentUser = user;
      this.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))

      localStorage.setItem("isLoggedIn", JSON.stringify(this.isLoggedIn))


    },
    loginadmin(admin) {
      this.currentUser = admin;
      this.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
      localStorage.setItem("isLoggedIn", JSON.stringify(this.isLoggedIn))

    },

    logout() {
      const cart = carts()
      this.currentUser = null;
      this.isLoggedIn = false;
      //alert(`${this.currentUser} is logged out`)
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
      localStorage.setItem("isLoggedIn", JSON.stringify(this.isLoggedIn))
      cart.clearcart()


    }
  }
});
