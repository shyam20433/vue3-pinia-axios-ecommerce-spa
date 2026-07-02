<script setup>
import { useProductStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import AddToCartBtn from '@/components/AddToCartBtn.vue'
import { carts } from '@/stores/carts'
import toCartBtn from '@/components/toCartBtn.vue'
import router from '@/router'
import { ref, computed } from 'vue'

const search = ref("")

const filteredProducts=computed(()=>{
  return product.products.filter((prod)=>{
    return prod.name.toLowerCase().includes(search.value.toLowerCase())
  }
  )
con
})

const product = useProductStore()
const cart = carts()
const auth = useAuthStore()

function addtocart(prod) {
  if (!auth.isLoggedIn) {
    alert(`login to add carts !!`)
  } else {
    cart.addtocart(prod)
  }
}

function viewcart() {
  if (!auth.isLoggedIn) {
    alert(`login to view/add carts`)
  } else {
    router.push('/carts')
  }
}
</script>

<template>
  <div class="store-container">
    <!-- Navigation layout bar so the Go to Cart button isn't repeated inside every card -->
    <div class="store-header">
      <h2>Product Catalog</h2>
      <div class="search-container">
      <h2><input type="text" v-model="search" placeholder="Search products" class="search-box" /></h2>
      </div>
      <toCartBtn @tocart="viewcart" />
    </div>

    <!-- Grid Products Section -->
    <div class="products">
      <div v-for="prod in filteredProducts" :key="prod.id" class="card">
        <div class="image">
          <img :src="prod.image" :alt="prod.name" class="product-image" />
        </div>

        <table>
          <tbody>
            <tr>
              <th>Product ID</th>
              <td>{{ prod.id }}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{{ prod.name }}</td>
            </tr>
            <tr>
              <th>Product Price</th>
              <td class="price">₹{{ prod.price }}</td>
            </tr>
            <tr>
              <td colspan="2" class="action-cell">
                <AddToCartBtn @addtocarts="addtocart(prod)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Layout wrapper matching the theme */
.store-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* Header Action Layout */
.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.store-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 24px;
  font-weight: 700;
}

/* Grid Layout matching the other views */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Polished White Card */
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
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

/* Restructured clean image styles */
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

/* Typography styles matching the main cards */
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
  transition: .3s;
}

.search-box:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 8px rgba(13,110,253,.3);
}

.price {
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
}

.action-cell {
  padding-top: 16px;
  text-align: center;
}
</style>
