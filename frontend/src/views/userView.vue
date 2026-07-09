<script setup>
import { ref, onMounted } from 'vue'
import apicall from '@/services/server'

const users = ref([])

onMounted(async () => {
  users.value = await apicall.getusers()
})
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
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
