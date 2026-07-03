<script setup>
const emit=defineEmits(['remove','shipped'])
</script>

<template>
  <button @click="emit('remove')">remove</button>
  <button @click="emit('shipped')">shipped</button>
</template>
