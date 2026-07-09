<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import apicall from '@/services/server'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const toast = useToast()

const username = ref(auth.currentUser.username)
const phone = ref(auth.currentUser.phone || '')
const address = ref(auth.currentUser.address || '')

async function updateProfile() {
  const data = {
    username: username.value,
    phone: phone.value,
    address: address.value,
  }
  console.log(data)

  const updatedUser = await apicall.updateUser(
    auth.currentUser.id,
    data
  )

  auth.currentUser = updatedUser

  localStorage.setItem(
    'currentUser',
    JSON.stringify(updatedUser)
  )

  toast.success('Profile updated successfully')
}
</script>

<template>
  <v-container max-width="600">

    <h1 class="mb-6">
      My Profile
    </h1>

    <v-card class="pa-6">

      <v-text-field
        v-model="username"
        label="Username"
      />

      <v-text-field
        v-model="phone"
        label="Phone Number"
      />

      <v-textarea
        v-model="address"
        label="Address"
      />

      <v-btn
        color="primary"
        block
        @click="updateProfile"
      >
        Update Profile
      </v-btn>

    </v-card>

  </v-container>
</template>
