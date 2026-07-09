<script setup>
import { carts } from '@/stores/carts'
import backBtn from '@/components/backBtn.vue'
import router from '@/router'
import removeCrtBtn from '@/components/removeCrtBtn.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const cart = carts()
const search = ref('')
const sortby = ref('default')
import { useToast } from 'vue-toastification'

const toast = useToast()
let timer = null

function debounceSearch(event) {
  const keyword = event.target.value
  console.log(keyword)
  clearTimeout(timer)
  timer = setTimeout(() => {
    //console.log(keyword,'1')
    search.value = keyword
  }, 4000);
}


function back() {
  router.push('/productapi')
}

const sortedproducts = computed(() => {
  const product = [...filteredProducts.value]
  if (sortby.value == 'low') {
    product.sort((a, b) => a.price - b.price)
  } else if (sortby.value == 'high') {
    product.sort((a, b) => b.price - a.price)
  }
  return product
})

const filteredProducts = computed(() => {
  return cart.cartItems.filter((prod) =>
    prod.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

import apicall from '@/services/server'









const orderConfirmModal = ref(false)

function askOrder() {
  if (cart.cartItems.length === 0) {
    toast.warning('Cart is empty, cannot place order!')
    return
  }

  orderConfirmModal.value = true
}

function cancelOrder() {
  orderConfirmModal.value = false
}

async function confirmOrder() {
  const order = {
    userId: auth.currentUser.id,
    user: auth.currentUser,
    items: cart.cartItems,
    totalItems: cart.totalitems,
    totalPrice: cart.totalprice,
    orderDate: new Date().toLocaleString(),
  }

  try {
    await apicall.placeOrder(order)

    orderConfirmModal.value = false

    cart.clearcart()

    toast.success('Order placed successfully!')
  } catch (error) {
    console.error(error)
    toast.error('Failed to place order')
  }
}




const deleteModal = ref(false)
const productDelete = ref(null)


function askDelete(id) {
  productDelete.value = id
  deleteModal.value = true
}
function confirmDelete() {
  cart.delcart(productDelete.value)
  deleteModal.value = false
  productDelete.value = null
}
function cancelDelete() {
  deleteModal.value = false
  productDelete.value = null
}


</script>

<template>

  <div class="cart-container">
    <backBtn @back="back" />
    <div class="search-container">
      <h2>
        <input type="text" @input="debounceSearch" placeholder="Search products" class="search-box" />
      </h2>
    </div>
    <div class="sort-container">
      <select v-model="sortby" class="sort-box">
        <option value="default">default</option>
        <option value="low">low->high</option>
        <option value="high">high->low</option>
      </select>
    </div>

    <!-- Added (prod, index) to access the array index for deletion -->
    <div class="products">
      <div v-for="(prod) in sortedproducts" :key="prod.id" class="card">
        <div class="image">
          <img :src="prod.image" :alt="prod.name" class="product-image" />
        </div>

        <table>
          <tr>
            <th>Product ID</th>
            <td>{{ prod.id }}</td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td>{{ prod.name }}</td>
          </tr>
          <tr>
            <th>Product Price per unit</th>
            <td class="price">{{ $formatPrice(prod.price )}}</td>
          </tr>
          <tr>
            <th>Product quantity</th>
            <td class="price">
              <span>{{ prod.quantity }}</span>
            </td>
          </tr>
          <tr>
            <th>Total price</th>
            <td class="price">{{ $formatPrice(prod.price * prod.quantity) }}</td>
          </tr>

          <tr>
            <th><button @click="cart.increasequantity(prod.id)">increase</button></th>
            <th><button @click="cart.decreasequantity(prod.id)">decrease</button></th>
          </tr>
          <tr>
            <td colspan="2" class="action-cell">
              <removeCrtBtn @delete="askDelete(prod.id)" />




              <v-dialog v-model="deleteModal" max-width="450">
                <v-card rounded="xl">
                  <v-card-title>remove Product</v-card-title>
                  <v-card-text>are you sure Do you want to remove the product</v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="red" variant="outlined" @click="cancelDelete">No</v-btn>
                    <v-btn color="green" variant="outlined" @click="confirmDelete">yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </table>
      </div>
      <h3>total amount :  {{ $formatPrice(cart.totalprice) }}</h3>
      <h3>total quantity : {{ cart.totalitems }}</h3>
      <button @click="askOrder" v-if="cart.cartItems.length >= 1">
        Place Order
      </button>


      <v-dialog v-model="orderConfirmModal" max-width="450">
        <v-card rounded="xl">
          <v-card-title class="text-center"> Order place</v-card-title>
          <v-card-text class="text-center">Do you want to place order</v-card-text>
          <v-card-actions>
            <v-btn color="green" variant="flat" @click="confirmOrder">Yes</v-btn>
            <v-btn color="red" variant="flat" @click="cancelOrder">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style scoped>
.sort-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.sort-box {
  width: 220px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.sort-box:hover {
  border-color: #0d6efd;
}

.sort-box:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
}

.sort-box option {
  padding: 10px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.search-box {
  width: 350px;
  padding: 12px 18px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;
}

.search-box:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
}

/* Page Layout Wrapper */
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* Grid Layout for Cards */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

/* Polished White Card */
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Image Container */
.image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
  margin-bottom: 16px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Table Information styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 0;
  font-size: 14px;
  text-align: left;
}

th {
  color: #64748b;
  font-weight: 500;
  width: 45%;
}

td {
  color: #1e293b;
  font-weight: 600;
}

/* Highlights the price field */
.price {
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
}

/* Centers the delete button cell */
.action-cell {
  padding-top: 16px;
  text-align: center;
}
</style>
