<script setup>
import { ref, onMounted } from 'vue'
import apicall from '@/services/server'
import { useToast } from 'vue-toastification'
const toast=useToast()
const users = ref([])

async function fetch(){
  users.value=await apicall.getusers()
}

onMounted(async () => {
  fetch()
})


async function delUser(id){
try{
  await apicall.deleteUser(id)
  toast.success(`User removed successfully !!`)
  fetch()


}catch(error){
  toast.error(error.response?.data?.message || 'Failed to delete User ')
}
}
</script>

<template>
  <v-container>
    <h1>All Users</h1>

    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>
            <button @click="delUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
