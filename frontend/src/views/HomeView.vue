<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import apicall from '@/services/server'
import { useToast } from 'vue-toastification'

const toast = useToast()

const auth = useAuthStore()
const name = ref('')
const password = ref('')
const formRef = ref(null)

const rules = {
  required: (value) => !!value || 'This field is required',
  username: (value) => {
    if (!value) return 'Username is required'
    if (value.length < 3) return 'Username must be at least 3 characters'
    return true
  },
  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
    return true
  }
}


/*
function addadmin(adminValue) {
  auth.login({
    username: adminValue,
    role: 'admin'
  })
}

function adduser(userValue) {
  auth.login({
    username: userValue,
    role: 'user'
  })
} */

async function adduser() {
  if(!formRef.value){
    toast.error(`Form not found !`)
    return
  }
  const { valid } = await formRef.value.validate()
  if (!valid) { return }

  try {

    const existingUser = await apicall.getUserByName(
      name.value.trim()
    )

    if (existingUser) {
      auth.login(existingUser)

      toast.success('Logged in successfully')
      name.value = ''
      password.value = ''
      formRef.value.resetValidation()
    } else {
      const newUser = {
        username: name.value.trim(),
        role: 'user',
      }
      const createdUser = await apicall.adduser(newUser)
      auth.login(createdUser)
      toast.success('Signup Successfully')
      name.value = ''
      password.value = ''
      formRef.value.resetValidation()
    }
  }
  catch (error) {
    toast.error(`Something went Wrong`)
    console.log(error)
  }
}
async function addadmin() {
   if (!formRef.value) {
    toast.error('Form not found')
    return
  }
  const { valid } = await formRef.value.validate()
  if (!valid) { return }
  if (!name.value.trim()) {
    toast('Enter username')
    return
  }

  try {
    const data = await apicall.adminLogin({
      username: name.value.trim(),
      password: password.value
    })
    console.log('ORIGINAL TOKEN:', data.token.token)

    localStorage.setItem('adminToken', data.token.token)
    localStorage.setItem('currentUser', JSON.stringify(data.user))
    auth.login(data.user)
    toast.success(`Admin logged in successfully`)
    name.value = ''
    password.value = ''
    formRef.value.resetValidation()
  } catch (error) {
    console.log('FULL ERROR:', error)
    console.log('STATUS:', error.response?.status)
    console.log('BACKEND RESPONSE:', error.response?.data)
    toast.error((error.response?.data?.message || "Admin login Failed"))
  }





}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-card class="pa-6" max-width="400" width="100%" elevation="3">
      <v-card-title class="text-center text-h5 font-weight-bold mb-4">
        Login
      </v-card-title>

      <v-form ref="formRef">

      <v-text-field v-model="name" label="Username" placeholder="Enter your name" variant="outlined"
        :rules="[rules.username]" validate-on="blur" prepend-inner-icon="mdi-account" class="mb-2" />


      <v-text-field v-model="password" label="Password" placeholder="Enter admin password" variant="outlined"
        :rules="[rules.password]" validate-on="blur" type="password" prepend-inner-icon="mdi-lock" class="mb-4" />


      <v-label class="text-subtitle-2 font-weight-medium mb-2 d-block">
        Select  role
      </v-label>

      <div class="d-flex ga-3">
        <v-btn color="success" variant="flat"  @click="adduser" size="large">
          User
        </v-btn>

        <v-btn color="error" variant="flat"  @click="addadmin" size="large">
          Admin
        </v-btn>
      </div>
      </v-form>
    </v-card>
  </v-container>
</template>
