<script setup>
const emit = defineEmits(['tocart'])
</script>

<template>
  <button class="btn-to-cart" @click="emit('tocart')">
    View Cart
  </button>
</template>

<style scoped>
.btn-to-cart {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: #1e293b; /* Deep slate background for secondary emphasis */
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 0.1px;
  transition: background-color 0.2s, transform 0.1s;
}

/* Hover state: interactive feedback */
.btn-to-cart:hover {
  background-color: #334155; /* Slightly lighter deep slate */
}

/* Active click state: physical mechanical depress */
.btn-to-cart:active {
  transform: scale(0.97);
}

/* Focus configurations for accessible routing */
.btn-to-cart:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
