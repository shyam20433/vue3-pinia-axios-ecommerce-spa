<script setup>
import { ref } from 'vue'
import apicall from '@/services/server'
import adminOrdersBtn from '@/components/adminOrdersBtn.vue'
const orders = ref([])

import { useToast } from 'vue-toastification'

const toast = useToast()
async function getOrders() {
  orders.value = await apicall.getOrders()
}
import { onMounted } from 'vue'
onMounted(() => {
  getOrders()
})



async function deleteOrder(id) {
  try {
    console.log('Deleting order ID:', id)

    const result = await apicall.deleteOrder(id)

    console.log('Delete response:', result)

    orders.value = orders.value.filter(
      (order) => order.id !== id
    )

    toast.success('Order deleted successfully')
  } catch (error) {
    console.log('DELETE ERROR:', error)
    console.log('STATUS:', error.response?.status)
    console.log('DATA:', error.response?.data)

    toast.error('Failed to delete order')
  }
}
</script>

<template>
  <div class="container">
    <div class="order-card" v-for="order in orders" :key="order.id">
      <h2>Order :{{ order.id }}</h2>
      <h2>username :{{ order.user.username }}</h2>
      <adminOrdersBtn @remove="deleteOrder(order.id)" @shipped="shipped(order.id)" />

      <div class="product-card" v-for="suborder in order.items" :key="suborder.id">
        <img :src="suborder.image" :alt="suborder.name" class="product-image" />

        <h3>{{ suborder.name }}</h3>

        <p><strong>Price :</strong> {{ $formatPrice(suborder.price) }}</p>

        <p><strong>Quantity :</strong> {{ suborder.quantity }}</p>

        <p><strong>Total :</strong> {{ $formatPrice(suborder.price * suborder.quantity) }}</p>
      </div>

      <div class="summary">
        <p><strong>Total Items :</strong> {{ order.total_items }}</p>

        <p><strong>Total Price :</strong> {{ $formatPrice(order.total_price) }}</p>

        <p><strong>Order Date :</strong> {{ $formatDate(order.order_date) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
  background: #f5f7fb;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

.fetch-btn {
  display: block;
  margin: 0 auto 30px;
  padding: 12px 30px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.fetch-btn:hover {
  background: #1d4ed8;
}

.order-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.order-card h2 {
  color: #2563eb;
  margin-bottom: 20px;
}

.product-card {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  transition: 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.product-card h3 {
  margin: 0;
  color: #111827;
}

.product-card p {
  margin: 5px 0;
  color: #4b5563;
}

.summary {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #e5e7eb;
}

.summary p {
  margin: 8px 0;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
    text-align: center;
  }

  .product-image {
    width: 180px;
    height: 180px;
  }
}
</style>
