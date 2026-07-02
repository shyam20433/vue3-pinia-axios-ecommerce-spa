<script setup>
const emit = defineEmits(['addtocarts'])
</script>

<template>
  <button class="btn-add-to-cart" @click="emit('addtocarts')">
    Add to Cart
  </button>
</template>

<style scoped>
.btn-add-to-cart {
  width: 100%;
  padding: 12px 24px;
  background-color: #3b82f6; /* Beautiful Blue Accent matching your theme */
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

/* Hover state: slight darkening for physical feedback */
.btn-add-to-cart:hover {
  background-color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* Active click state: physically depresses downward slightly */
.btn-add-to-cart:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(59, 130, 246, 0.1);
}

/* Focused layout outline for accessibility */
.btn-add-to-cart:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
