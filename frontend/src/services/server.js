import axios from "axios";

let productsCache = null
const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
}
)
api.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
    )
    const adminToken = localStorage.getItem('adminToken')
    console.log("local token", adminToken)
    if (currentUser) {
      config.headers['user-id'] = currentUser.id
    }

    if (adminToken) {

      config.headers.Authorization = `${adminToken}`
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

    return response
  },

  async (error) => {
    const status = error.response?.status
    const config = error.config

    if (status === 500 && !config.retried) {
      config.retried = true
      console.log(`server error -retrying once !`)
      await new Promise((resolve) => {
        setTimeout(resolve, 10000)
      })
      return api(config)
    }

    if (status === 401) {
      console.log('Unauthorized - Login required')
    }

    else if (status === 403) {
      console.log('Forbidden - Admin access required')
    }

    else if (status === 404) {
      console.log('Resource not found')
    }

    else if (status === 409) {
      console.log('Conflict - Data was already modified')
    }

    else if (status === 500) {
      console.log('Internal server error')
    }

    else {
      console.log('Network or unknown error')
    }

    return Promise.reject(error)
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
    productsCache = null
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
  async deleteOrder(id) {
    console.log('API deleting:', id)

    const response = await api.delete(`/orders/${id}`)

    return response.data
  },
  async updateOrderStatus(id, status) {
    const response = await api.put(
      `/orders/${id}/status`,
      { status: status }
    )

    return response.data
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
  },



  //admin calling
  async adminLogin(credentials) {
    const response = await api.post('/admin/login', credentials)
    return response.data
  }
}

export default apicall;
