<script setup>
const emit = defineEmits(['delete'])
</script>

<template>
  <button class="btn-remove" @click="emit('delete')">
    Remove Item
  </button>
</template>

<style scoped>
.btn-remove {
  padding: 8px 16px;
  background-color: transparent;
  color: #64748b; /* Subtle slate gray text */
  border: 1px solid #cbd5e1; /* Light gray border */
  border-radius: 6px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

/* Hover state: changes to crisp red alert theme to signify destructive action */
.btn-remove:hover {
  background-color: #fef2f2; /* Soft red tint backdrop */
  border-color: #fca5a5;
  color: #ef4444; /* Clean alert red */
}

/* Active click state: physically depresses downward slightly */
.btn-remove:active {
  transform: scale(0.98);
}

/* Focused layout outline for accessibility routing */
.btn-remove:focus-visible {
  outline: 2px solid #fca5a5;
  outline-offset: 2px;
}
</style>
