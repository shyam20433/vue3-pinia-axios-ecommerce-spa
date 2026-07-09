<script setup>
import { useProductStore } from '@/stores/products'
import backBtn from '@/components/backBtn.vue'
import router from '@/router'
import productCard from '@/components/productCard.vue'
import apiAdminControlBtn from '@/components/apiAdminControlBtn.vue'
import { ref } from 'vue'

const product = useProductStore()

const id = ref('')
const name = ref('')
const price = ref('')
const image = ref('')
const editIndex = ref(-1)

function back() {
  router.push('/products')
}

function resetForm() {
  id.value = ''
  name.value = ''
  price.value = ''
  image.value = ''
  editIndex.value = -1
}

function addProd() {
  const prod = {
    id: Number(id.value),
    name: name.value,
    price: Number(price.value),
    image: image.value,
  }

  if (editIndex.value === -1) {
    product.addProduct(prod)
  } else {
    product.products.splice(editIndex.value, 1, prod)
  }
  resetForm()
}

function editProd(index) {
  editIndex.value = index
  id.value = product.products[editIndex.value].id
  name.value = product.products[editIndex.value].name
  image.value = product.products[editIndex.value].image
  price.value = product.products[editIndex.value].price
}

function delProd(index) {
  product.delProduct(index)
  if (editIndex.value === index) {
    resetForm()
  }
}

function clear() {
  product.products = []
  resetForm()
}
</script>

<template>
  <div class="admin-container">
    <backBtn @back="back" />

    <!-- Form Section -->
    <form @submit.prevent="addProd" class="admin-form">
      <h3>{{ editIndex === -1 ? 'Add New Product' : 'Edit Product' }}</h3>
      <div class="form-group">
        <label for="prod-id">Product ID</label>
        <input id="prod-id" type="number" v-model="id" required />
      </div>

      <div class="form-group">
        <label for="prod-name">Product Name</label>
        <input id="prod-name" type="text" required v-model="name" />
      </div>

      <div class="form-group">
        <label for="prod-price">Price (₹)</label>
        <input id="prod-price" type="number" required v-model="price" />
      </div>

      <div class="form-group">
        <label for="prod-img">Image URL</label>
        <input id="prod-img" type="text" v-model="image" placeholder="https://example.com" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit">
          {{ editIndex === -1 ? 'Add Product' : 'Update Product' }}
        </button>
        <button type="button" class="btn-clear" @click="clear">Clear All</button>
      </div>
    </form>

    <div class="products">
  <productCard
    v-for="(prod, index) in product.products"
    :key="prod.id"
    :prod="prod"
  >
    <template #button>
      <apiAdminControlBtn
        @edit="editProd(index)"
        @delete="delProd(index)"
      />
    </template>
  </productCard>
</div>
  </div>
</template>

<style scoped>
/* Main Layout wrapper matching the theme */
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* Polished Management Form Card */
.admin-form {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  margin: 24px auto 40px auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.admin-form h3 {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Form Buttons Setup */
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-submit,
.btn-clear {
  flex: 1;
  padding: 11px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit {
  background-color: #3b82f6;
  color: white;
}

.btn-clear {
  background-color: #ef4444;
  color: white;
}

.btn-submit:hover,
.btn-clear:hover {
  opacity: 0.9;
}

/* Grid Layout matching the product cards grid */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Card layout wrapper rules */
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
  height: 180px;
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
