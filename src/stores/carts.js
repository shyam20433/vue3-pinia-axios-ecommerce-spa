import { defineStore } from "pinia";

export const carts = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem("cart"))||[]
  }),
  getters: {

    totalprice:(state)=>{
      return state.cartItems.reduce((total,item)=>{
        return total+(item.price*item.quantity)
      },0);
    }
  },
  actions: {
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
    }},

    delcart(index){
      this.cartItems.splice(index,1)
      localStorage.setItem("cart",JSON.stringify(this.cartItems))
      alert(`product removed from the cart`)
    },
    clearcart(){
      this.cartItems=[]
      localStorage.removeItem("cart")
    },
    increasequantity(id){
      const exits=this.cartItems.find(
        item=>item.id===id
      )
      if (exits){
        exits.quantity++;
      }
      localStorage.setItem("carts",JSON.stringify(this.cartItems))

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
    }
  }
})
