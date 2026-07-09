<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import router from '@/router'
import apicall from '@/services/server'
const auth = useAuthStore()
import backBtn from '@/components/backBtn.vue'




const myorders = ref([])

function back(){
  return router.push('/productapi')
}
async function getmyorders() {
  const orders = await apicall.getOrders()
  myorders.value = orders.filter((order) => order.user.id === auth.currentUser.id)
}

onMounted(() => {
  getmyorders()
})


</script>
<template>
  <backBtn @back="back"/>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold text-center mb-8">My Orders</h1>


    <v-alert
      v-if="myorders.length === 0"
      type="info"
      variant="tonal"
      class="mx-auto"
      max-width="600"
    >
      You have no orders
    </v-alert>

    <v-card v-for="order in myorders" :key="order.id" class="mb-8" elevation="3" rounded="lg">

      <v-card-title class="d-flex justify-space-between align-center">
        <span class="font-weight-bold"> Order #{{ order.id }} </span>

        <v-chip color="success" variant="tonal"> {{order.status}} </v-chip>
      </v-card-title>

      <v-card-subtitle class="pb-4">
        {{ $formatDate(order.order_date) }}
      </v-card-subtitle>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col v-for="item in order.items" :key="item.id" cols="12" sm="6" md="4">
            <v-card variant="outlined" rounded="lg" height="100%">
              <v-img
                :src="item.image"
                :alt="item.name"
                height="180"
                contain
                class="bg-grey-lighten-4"
              />

              <v-card-title class="text-h6">
                {{ item.name }}
              </v-card-title>

              <v-card-text>
                <div class="d-flex justify-space-between mb-2">
                  <span>Price</span>

                  <strong> {{ $formatPrice(item.price) }} </strong>
                </div>

                <div class="d-flex justify-space-between mb-2">
                  <span>Quantity</span>

                  <strong>
                    {{ item.quantity }}
                  </strong>
                </div>

                <v-divider class="my-3" />

                <div class="d-flex justify-space-between">
                  <span class="font-weight-bold"> Total </span>

                  <span class="text-primary font-weight-bold">
                    {{ $formatPrice(item.quantity * item.price) }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text class="bg-grey-lighten-4">
        <div class="d-flex justify-space-between mb-2">
          <span> Total Items </span>

          <strong>
            {{ order.total_items }}
          </strong>
        </div>

        <div class="d-flex justify-space-between">
          <span class="text-h6 font-weight-bold"> Order Total </span>

          <span class="text-h6 text-primary font-weight-bold"> {{ $formatPrice(order.total_price) }} </span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
