import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    currentUser: null
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
    },
    loginadmin(admin) {
      this.currentUser = admin;
      this.isLoggedIn = true;
    },

    logout() {
      this.currentUser = null;
      this.isLoggedIn = false;
    }
  }
});
