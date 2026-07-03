<script setup>
import apicall from '@/services/server'
//import router from '@/router';
import { ref } from 'vue'
import { onMounted } from 'vue'
import { carts } from '@/stores/carts'
import { useAuthStore } from '@/stores/auth'
import apiAdminControlBtn from '@/components/apiAdminControlBtn.vue'
onMounted(() => {
  get()
})

const cart = carts()
const auth = useAuthStore()

const products = ref({})
const product = ref([])
const id = ref('')
const name = ref('')
const price = ref('')
const image = ref('')

async function addproduct() {
  const product = {
    name: name.value,
    price: price.value,
    image: image.value,
  }
  await apicall.addproduct(product)
  alert(`added !!`)
  get()
}

async function updateproduct() {
  const product = {
    name: name.value,
    price: price.value,
    image: image.value,
  }
  await apicall.updateproduct(id.value, product)
  alert(`updated successfully!`)
  get()
}

function editProduct(prod){
  id.value = prod.id;
  name.value = prod.name;
  price.value = prod.price;
  image.value = prod.image;
}
async function deleteProduct(id) {
  await apicall.delproduct(id);
  alert("Deleted Successfully");
  get();
}

async function get() {
  products.value = await apicall.getproducts()
}

async function fetchid() {
  product.value = await apicall.getproduct(id.value)
}
async function delproduct() {
  await apicall.delproduct(id.value)
  alert(`deleted !!`)
  get()
}

function addtocart(prod) {
  if (!auth.isLoggedIn) {
    alert(`login to add carts !!`)
  } else {
    cart.addtocart(prod)
  }
}
</script>
<!--
<template>
<input type="number" v-model="id" placeholder="id ">
<input type="text" v-model="name" placeholder="name">
<input type="number" v-model="price" placeholder="price">
<input type="text" v-model="image" placeholder="image url">
<button @click="addproduct()">add</button>
<button @click="get">fetch all</button>
<button @click="fetchid()">id get</button>
<button @click="delproduct()">delete id</button>
<button @click="updateproduct">update</button>
  <h2>selected items</h2>
  <img :src="product.image" :alt="product.name" class="product-image" />
  <table>
  <tr>
    <th>id</th>
    <th><h3>{{product.id}}</h3></th>
  </tr>
 <tr>
  <th>Name</th>
  <th> <h3>{{product.name}}</h3></th>
 </tr>
  <tr>
    <th>price</th>
    <th><h3>{{product.price}}</h3></th>
  </tr>
  </table>





  <div v-for="product in products" :key="product.id" >
    <img :src="product.image" :alt="product.name" class="product-image" />
    <table>
    <tr>
      <th><label for="">Id</label></th>
      <th><h3>{{ product.id }}</h3></th>
</tr>
    <tr>
      <th><label for="">name</label></th>
      <th><h3>{{ product.name }}</h3></th>
</tr>
    <tr>
      <th><label for="">price</label></th>
      <th><h3>₹{{ product.price }}</h3></th>
</tr>

  </table>
  </div>

</template>

 -->
<template>
  <div class="container">
    <h1 class="title">Product Management</h1>

    <div class="form-container">
      <input type="number" v-model="id" placeholder="Product ID" class="input-box" />
      <input
        v-if="auth.isAdmin"
        type="text"
        v-model="name"
        placeholder="Product Name"
        class="input-box"
      />
      <input
        v-if="auth.isAdmin"
        type="number"
        v-model="price"
        placeholder="Price"
        class="input-box"
      />
      <input
        v-if="auth.isAdmin"
        type="text"
        v-model="image"
        placeholder="Image URL"
        class="input-box"
      />

      <div class="btn-group">
        <button @click="addproduct()" v-if="auth.isAdmin" placeholder="search by id">Add</button>
        <!--  <button @click="get">Fetch All</button> -->
        <button @click="fetchid()">Get</button>
        <button @click="delproduct()" v-if="auth.isAdmin">Delete</button>
        <button @click="updateproduct" v-if="auth.isAdmin">Update</button>
      </div>
    </div>

    <div class="selected-card" v-if="auth.isLoggedIn  && product.id">
      <h2>Selected Product</h2>

      <img :src="product.image" :alt="product.name" class="product-image" />

      <table>
        <tr>
          <th>ID</th>
          <td>{{ product.id }}</td>
        </tr>

        <tr>
          <th>Name</th>
          <td>{{ product.name }}</td>
        </tr>

        <tr>
          <th>Price</th>
          <td>₹{{ product.price }}</td>
        </tr>
      </table>
    </div>

    <div class="products">
      <div class="card" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" class="product-image" />

        <table>
          <tr>
            <th>ID</th>
            <td>{{ product.id }}</td>
          </tr>

          <tr>
            <th>Name</th>
            <td>{{ product.name }}</td>
          </tr>

          <tr>
            <th>Price</th>
            <td>₹{{ product.price }}</td>
          </tr>
          <tr>
            <button
              v-if="auth.isLoggedIn && !auth.isAdmin"
              class="cart-btn"
              @click="addtocart(product)"
            >
              Add To Cart
            </button>
          </tr>
        </table>
        <apiAdminControlBtn
          v-if="auth.isAdmin"
          @edit="editProduct(product)"
          @delete="deleteProduct(product.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1300px;
  margin: auto;
  padding: 30px;
  background: #f5f7fb;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #1f2937;
}
.cart-btn {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.cart-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.form-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.input-box {
  width: 260px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: 0.3s;
}

.input-box:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.3);
}

.btn-group {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
}

.btn-group button {
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
}

.btn-group button:nth-child(1) {
  background: #10b981;
}

.btn-group button:nth-child(2) {
  background: #2563eb;
}

.btn-group button:nth-child(3) {
  background: #8b5cf6;
}

.btn-group button:nth-child(4) {
  background: #ef4444;
}

.btn-group button:nth-child(5) {
  background: #f59e0b;
}

.btn-group button:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

.selected-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 35px;
  text-align: center;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-6px);
}

.product-image {
  width: 200px;
  height: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  margin: 0 auto 15px;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  width: 35%;
  color: #6b7280;
}

td {
  font-weight: bold;
  color: #111827;
}

.selected-card table {
  width: 350px;
  margin: auto;
}
</style>
