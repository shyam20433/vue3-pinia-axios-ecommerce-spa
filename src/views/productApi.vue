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

const products = ref([])
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

function editProduct(prod) {
  id.value = prod.id
  name.value = prod.name
  price.value = prod.price
  image.value = prod.image
}
async function deleteProduct(id) {
  await apicall.delproduct(id)
  alert('Deleted Successfully')
  get()
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
<template>
  <v-container>
    <h1 class="text-h4 text-center mb-6">Product Management</h1>

    <v-card class="pa-6 mb-8" elevation="3">
      <v-row>
        <!-- PRODUCT ID -->

        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="id"
            label="Product ID"
            type="number"
            variant="outlined"
            hide-details
          />
        </v-col>

        <!-- PRODUCT NAME -->

        <v-col v-if="auth.isAdmin" cols="12" sm="6" md="3">
          <v-text-field v-model="name" label="Product Name" variant="outlined" hide-details />
        </v-col>

        <!-- PRODUCT PRICE -->

        <v-col v-if="auth.isAdmin" cols="12" sm="6" md="3">
          <v-text-field
            v-model="price"
            label="Product Price"
            type="number"
            prefix="₹"
            variant="outlined"
            hide-details
          />
        </v-col>

        <!-- IMAGE URL -->

        <v-col v-if="auth.isAdmin" cols="12" sm="6" md="3">
          <v-text-field v-model="image" label="Image URL" variant="outlined" hide-details />
        </v-col>
      </v-row>



      <div class="d-flex justify-center flex-wrap ga-3 mt-6">
        <v-btn v-if="auth.isAdmin" color="success" variant="flat" @click="addproduct"> Add </v-btn>

        <v-btn color="primary" variant="flat" @click="fetchid"> Get </v-btn>

        <v-btn v-if="auth.isAdmin" color="error" variant="flat" @click="delproduct"> Delete </v-btn>

        <v-btn v-if="auth.isAdmin" color="warning" variant="flat" @click="updateproduct">
          Update
        </v-btn>

        <v-btn color="secondary" variant="outlined" @click="clearForm"> Clear </v-btn>
      </div>
    </v-card>

   <!--  //selected product -->

    <v-card
      v-if="auth.isLoggedIn && product.length !== 0"
      class="pa-5 mb-8 mx-auto"
      max-width="500"
      elevation="4"
    >
      <v-card-title class="text-center"> Selected Product </v-card-title>

      <v-img :src="product.image" :alt="product.name" height="250" cover class="rounded-lg" />

      <v-card-text>
        <p class="mb-2">
          <strong>ID:</strong>

          {{ product.id }}
        </p>

        <p class="mb-2">
          <strong>Name:</strong>

          {{ product.name }}
        </p>

        <p>
          <strong>Price:</strong>

          ₹{{ product.price }}
        </p>
      </v-card-text>
    </v-card>

    <!-- //product list -->

    <v-row>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="4" lg="3">
        <v-card elevation="4" height="100%" class="d-flex flex-column">
          <!-- IMAGE -->

          <v-img :src="prod.image" :alt="prod.name" height="200" cover />

          <!-- NAME -->

          <v-card-title>
            {{ prod.name }}
          </v-card-title>

          <!-- PRODUCT DETAILS -->

          <v-card-text>
            <p class="mb-2">
              <strong>ID:</strong>

              {{ prod.id }}
            </p>

            <p class="text-h6">
              <strong>₹{{ prod.price }}</strong>
            </p>
          </v-card-text>

          <v-spacer />

          <!-- USER CART BUTTON -->

          <v-card-actions v-if="auth.isLoggedIn && !auth.isAdmin">
            <v-btn color="primary" variant="flat" block @click="addtocart(prod)">
              Add To Cart
            </v-btn>
          </v-card-actions>



          <div v-if="auth.isAdmin" class="pa-3">
            <apiAdminControlBtn @edit="editProduct(prod)" @delete="deleteProduct(prod.id)" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
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


<template>
  <div class="container">
    <h1 class="title">Product Management</h1>

    <div class="form-container">
      <v-text-field type="number" v-model="id" label="Product ID" variant="outlined" />
      <input
        v-if="auth.isAdmin"
        type="text"
        v-model="name"
        placeholder="Product Name"
        class="input-box"
      />
      <v-text-field
        v-if="auth.isAdmin"
        type="number"
        v-model="price"
        label="Product Price" variant="outlined"
      />
      <input
        v-if="auth.isAdmin"
        type="text"
        v-model="image"
        placeholder="Image URL"
        class="input-box"
      />

      <div class="btn-group">
        <v-btn @click="addproduct()" v-if="auth.isAdmin" placeholder="search by id" color="success" variant="flat">Add</v-btn>
        <button @click="get">Fetch All</button>
        <v-btn color="primary" variant="flat" @click="fetchid()">Get</v-btn>
        <v-btn color="error" variant="flat" @click="delproduct()" v-if="auth.isAdmin">Delete</v-btn>
        <v-btn color="warning" variant="flat" @click="updateproduct" v-if="auth.isAdmin">Update</v-btn>
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

    <v-container>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card elevation="4">

        <v-img
          :src="product.image"
          :alt="product.name"
          height="200"
          cover
        />

        <v-card-title>
          {{ product.name }}
        </v-card-title>

        <v-card-text>
          <p><strong>ID:</strong> {{ product.id }}</p>

          <p>
            <strong>Price:</strong>
            ₹{{ product.price }}
          </p>
        </v-card-text>

        <v-card-actions>

          <v-btn
            v-if="auth.isLoggedIn && !auth.isAdmin"
            color="primary"
            variant="flat"
            block
            @click="addtocart(product)"
          >
            Add To Cart
          </v-btn>

        </v-card-actions>

        <apiAdminControlBtn
          v-if="auth.isAdmin"
          @edit="editProduct(product)"
          @delete="deleteProduct(product.id)"
        />

      </v-card>
    </v-col>
  </v-row>
</v-container>
  </div>
</template> -->
<!--
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
 -->
