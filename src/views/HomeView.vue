<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import apicall from '@/services/server';


const auth = useAuthStore()
const name = ref('')
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

async function adduser(){

  if(!name.value.trim()){
    alert("Enter username")
    return
  }

  const users = await apicall.getUserByName(name.value)

  const exists = users[0]

  if(exists){

    auth.login(exists)

    alert("Logged in successfully")

  }else{

    const newUser = {
      username:name.value,
      role:"user"
    }

    await apicall.adduser(newUser)

    auth.login(newUser)

    alert("Signup Successfully")
  }

}
async function addadmin(){

  if(!name.value.trim()){
    alert("Enter username")
    return
  }

  const users = await apicall.getUserByName(name.value)

  const exists = users.find(user => user.role==="admin")

  if(exists){

      auth.login(exists)

      alert("Admin Logged In")

  }else{

      alert("Admin not found")

  }

}
</script>

<template>
  <div class="login-card">
    <label for="username">enter your name</label>
    <input id="username" type="text" v-model="name" placeholder="John Doe" required>

    <label>select your role</label>
    <div class="button-group">
      <button class="btn-user" @click="adduser">user</button>
      <button class="btn-admin" @click="addadmin">admin</button>
    </div>
  </div>
</template>

<style scoped>
/* Card Container */
.login-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 340px;
  margin: 60px auto;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

/* Labels */
label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-top: 6px;
  text-transform: capitalize;
}

/* Input Field */
input {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Button Layout Wrapper */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

/* Base Button Styles */
button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  transition: opacity 0.2s, transform 0.1s;
}

button:active {
  transform: scale(0.98);
}

button:hover {
  opacity: 0.9;
}

/* Role Styles */
.btn-user {
  background-color: #10b981;
  color: white;
}

.btn-admin {
  background-color: #ef4444;
  color: white;
}
</style>
