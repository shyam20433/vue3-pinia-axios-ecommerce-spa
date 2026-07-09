<script setup>
const emit=defineEmits(['remove'])
</script>

<template>
  <button @click="emit('remove')">remove</button>

</template>
