import axios from "axios";

let productsCache = null
const api = axios.create({
  baseURL: 'http://localhost:8080'
}
)
api.interceptors.request.use((config) => {
  console.log("------request interceptor------")
  console.log("method : ", config.method)
  console.log("Url : ", config.url)

  return config
}, (error) => {
  return Promise.reject(error)
}
)



api.interceptors.response.use((response) => {
  console.log("------response interceptor------")
  console.log("Status : ", response.status)


  return response
}, (error) => {
  return Promise.reject(error)
}
)

const apicall = {

  async searchProducts(search) {
    const response = await api.get('/products')


    return response.data.filter((prod)=>prod.name.toLowerCase().includes(search.toLowerCase()))
  },
  async getproducts() {
    if (productsCache){
      console.log(`cache memory's data`)
      return productsCache
    }else{
    const data = await api.get('/products')
    console.log(`api's data and data is now stored in cache memory !!`)
      productsCache=data.data
    return data.data}
  },
  async getproduct(id) {
    const data = await api.get(`/products/${id}`)
    return data.data
  },
  async delproduct(id) {
    const data = await api.delete(`/products/${id}`)
    return data.data
  },
  async addproduct(product) {
    const data = await api.post('/products', product)
    productsCache=null
    return data.data
  },
  async updateproduct(id, product) {
    const data = await api.put(`/products/${id}`, product)
    productsCache=null
    return data.data
  },




  //carts
  async getCart() {
    const res = await api.get("/carts");
    return res.data;
  },

  async addCart(product) {
    const res = await api.post("/carts", product);
    return res.data;
  },

  async updateCart(id, product) {
    const res = await api.put(`/carts/${id}`, product);
    return res.data;
  },

  async deleteCart(id) {
    const res = await api.delete(`/carts/${id}`);
    productsCache=null
    return res.data;
  },

  //orders
  async placeOrder(order) {
    const res = await api.post("/orders", order);
    return res.data;
  },

  async getOrders() {
    const res = await api.get("/orders");
    return res.data;
  },
  async delOrder(id) {
    const res = await api.delete(`/orders/${id}`)
    return res.data
  },


  //useraccount

  async adduser(user) {
    const data = await api.post('/users', user)
    return data.data

  },

  async getusers() {
    const data = await api.get('/users')
    return data.data
  }
  ,
  async getUserByName(username) {
    const res = await api.get(`/users?username=${username}`);
    return res.data;
  }



}

export default apicall;
