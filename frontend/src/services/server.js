import axios from "axios";
// 1. Swap useToast out for the standalone toast interface creator
import { createToastInterface } from "vue-toastification";

// Initialize the toast interface globally for this JS file
const toast = createToastInterface();

let productsCache = null
const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
})

api.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      config.headers['user-id'] = currentUser.id
    }

    const adminToken = localStorage.getItem('adminToken')
    console.log('TOKEN:', adminToken)

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`
    }

    console.log('------request interceptor------')
    console.log('method : ', config.method)
    console.log('Url : ', config.url)
    console.log('user-id:', config.headers['user-id'])

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    console.log('------response interceptor------')
    console.log('Status:', response.status)

    if (response.config && response.config.url && response.config.url.endsWith('/admin/login')) {
      if (response.data && response.data.token) {
        console.log('SUCCESS: Interceptor caught the new JWT token! Saving to storage...')
        localStorage.setItem('adminToken', response.data.token)
      }
    }
    return response
  },

  async (error) => {
    const status = error.response?.status
    const config = error.config

    // 2. Fix the missing declaration! Define the backend message safely here:
    const backendMessage = error.response?.data?.message

    if (status === 500 && !config.retried) {
      config.retried = true
      console.log(`server error -retrying once !`)
      await new Promise((resolve) => {
        setTimeout(resolve, 10000)
      })
      return api(config)
    }

    if (status === 401) {
      console.log('Unauthorized - Login required');
      // 3. Fire the toast globally using our standalone builder
      toast.error(backendMessage || 'Session expired or invalid token. Please login again.');
    }

    else if (status === 403) {
      console.log('Forbidden - Admin access required');
      toast.error(backendMessage || 'Access denied. Admin privileges required.');
    }

    else if (status === 404) {
      console.log('Resource not found');
    }

    else if (status === 409) {
      console.log('Conflict - Data was already modified');
    }

    else if (status === 500) {
      console.log('Internal server error');
      toast.error('Internal server error occurred.');
    }

    return Promise.reject(error);
  }
)

const apicall = {
  async searchProducts(search) {
    const response = await api.get('/products')
    return response.data.filter((prod) => prod.name.toLowerCase().includes(search.toLowerCase()))
  },
  async getproducts() {
    if (productsCache) {
      console.log(`cache memory's data`)
      return productsCache
    } else {
      const data = await api.get('/products')
      console.log(`api's data and data is now stored in cache memory !!`)
      productsCache = data.data
      return data.data
    }
  },
  async getproduct(id) {
    const data = await api.get(`/products/${id}`)
    return data.data
  },
  async addproduct(product) {
    const data = await api.post('/products', product)
    productsCache = null
    return data.data
  },
  async updateproduct(id, product) {
    const data = await api.put(`/products/${id}`, product)
    productsCache = null
    return data.data
  },
  async delproduct(id) {
    const data = await api.delete(`/products/${id}`)
    productsCache = null
    return data.data
  },
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
    productsCache = null
    return res.data;
  },
  async placeOrder(order) {
    const res = await api.post("/orders", order);
    return res.data;
  },
  async getOrders() {
    const res = await api.get("/orders");
    return res.data;
  },
  async deleteOrder(id) {
    console.log('API deleting:', id)
    const response = await api.delete(`/orders/${id}`)
    return response.data
  },
  async updateOrderStatus(id, status) {
    const response = await api.put(`/orders/${id}/status`, { status: status })
    return response.data
  },
  async adduser(user) {
    const data = await api.post('/users', user)
    return data.data
  },
  async getusers() {
    const data = await api.get('/users')
    return data.data
  },
  async getUserByName(username) {
    const res = await api.get(`/users?username=${username}`);
    return res.data;
  },
  async updateUser(id, user) {
    const response = await api.put(`/users/${id}`, user)
    return response.data
  },
  async deleteUser(id){
    const response=await api.delete(`/users/${id}`)
    return response.data
  },
  async adminLogin(credentials) {
    const response = await api.post('/admin/login', credentials)
    return response.data
  }
}

export default apicall;
