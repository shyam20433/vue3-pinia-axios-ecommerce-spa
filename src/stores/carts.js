import { defineStore } from "pinia";
import { useAuthStore } from "./auth";


export const carts = defineStore('cart', {
  state: () => ({
    cartItems:[]
  }),
  getters: {

    totalprice:(state)=>{
      return state.cartItems.reduce((total,item)=>{
        return total+(item.price*item.quantity)
      },0);
    },
    totalitems:(state)=>{
      return state.cartItems.reduce((total,item)=>{
        return total+(item.quantity)
      },0);
    }
  },
  actions: {




    getcartkey(){
      const auth=useAuthStore();
      if(!auth.currentUser){
        return null;
      }
      return `cart_${auth.currentUser.id}`;
    },
    loadcart(){
      const key=this.getcartkey();
      if(!key){
        this.cartItems=[];
        return;
      }
      this.cartItems=JSON.parse(localStorage.getItem(key))||[];
    },
    /* savecart(){
      const key=this.getcartkey()
      if(key){
        localStorage.setItem(key,JSON.stringify(this.cartItems))
      }
    }, */



    addtocart(products) {

      const exits=this.cartItems.find(
        item=>item.id===products.id
      );
      if (exits){
        exits.quantity++;
        alert(`${products.name}'s qunatity is increased to ${exits.quantity}`)
      }
      else{
      this.cartItems.push({...products,quantity:1})
      localStorage.setItem("cart",JSON.stringify(this.cartItems))
      alert(`${products.name} added`)
    }
  //this.savecart()
},

    delcart(index){
      this.cartItems.splice(index,1)
      localStorage.setItem("cart",JSON.stringify(this.cartItems))
      alert(`product removed from the cart`)
      //this.savecart()
    },
    clearcart(){
      const key=this.getcartkey()
      this.cartItems=[]
      if(key){
      localStorage.removeItem(key)}
    },
    increasequantity(id){
      const exits=this.cartItems.find(
        item=>item.id===id
      )
      if (exits){
        exits.quantity++;
      }
      localStorage.setItem("carts",JSON.stringify(this.cartItems))
      //this.savecart()

    },
    decreasequantity(id){
      const exits=this.cartItems.find(
        item=>item.id==id
      )
      if (exits){
        if (exits.quantity >0){
          exits.quantity--
        }
        if (exits.quantity==0){
          this.cartItems.splice(id.index,1)
        }
      }
      //this.savecart()
    },
    resetcart(){
      this.cartItems=[];
    }
  }
})
