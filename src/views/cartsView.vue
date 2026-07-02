<script setup>
import { carts } from '@/stores/carts';
import backBtn from '@/components/backBtn.vue';
import router from '@/router';
import removeCrtBtn from '@/components/removeCrtBtn.vue';
const cart = carts()

function del(index) {
  cart.delcart(index)
}
function back() {
  router.push('/products')
}
</script>

<template>
  <div class="cart-container">
    <backBtn @back="back" />

    <!-- Added (prod, index) to access the array index for deletion -->
    <div class="products">
      <div v-for="(prod, index) in cart.cartItems" :key="prod.id" class="card">
        <div class="image">
          <img :src="prod.image" :alt="prod.name" class="product-image">
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
            <td class="price">₹{{ prod.price }}</td>
          </tr>
          <tr>
            <th>Product quantity</th>
            <td class="price"><span>{{ prod.quantity }}</span></td>
          </tr>
          <tr>
            <th>Total price</th>
            <td class="price">₹{{ prod.price *prod.quantity }}</td>
          </tr>

          <tr>
            <th><button @click="cart.increasequantity(prod.id)">increase</button></th>
            <th><button @click="cart.decreasequantity(prod.id)">decrease</button></th>
          </tr>
          <tr>
            <td colspan="2" class="action-cell">
              <removeCrtBtn @delete="del(index)"/>
            </td>
          </tr>
        </table>
      </div>
      <h3>total amount : ₹ {{ cart.totalprice }}</h3>
      <h3>total quantity : {{ cart.totalitems }}</h3>
    </div>
  </div>
</template>

<style scoped>
/* Page Layout Wrapper */
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: system-ui, -apple-system, sans-serif;
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;
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

th, td {
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
