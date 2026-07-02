import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {

  state: () => ({
    products: [
      {
        "id": 1,
        "image": "https://i.pinimg.com/1200x/c7/2a/eb/c72aeb2719effad574365505f2f16e26.jpg",
        "name": "phone",
        "price": 23599
      },
      {
        "id": 2,
        "image": "https://i.pinimg.com/1200x/de/ad/e6/deade6c3f65c0c5d48914fab1e5a8ab4.jpg",
        "name": "laptop",
        "price": 150000
      },
      {
        "id": 3,
        "image": "https://i.pinimg.com/736x/20/69/0d/20690dd093157ed7a3786add6903ade5.jpg",
        "name": "powerbank",
        "price": 999
      },
      {
        "id": 4,
        "image": "https://i.pinimg.com/736x/ae/79/08/ae79083e5ae4dacaedfbc804fadd75c4.jpg",
        "name": "headphone",
        "price": 500
      },
      {
        "id": 5,
        "image": "https://i.pinimg.com/736x/0c/19/cc/0c19cc08514a0de5a5028b68bccb9003.jpg",
        "name": "charger",
        "price": 300
      },
      {
        "id": 6,
        "image": "https://i.pinimg.com/736x/a2/1d/84/a21d84942ac25117d51bf312bdb7f9a3.jpg",
        "name": "laptop bag",
        "price": 600
      },

    ]
  }),
  getters: {

  },
  actions: {
    addProduct(product){
      this.products.push(product)
    }

  }

})
