<script setup>
const emit = defineEmits(['back'])
</script>

<template>
  <button class="back-btn" @click="emit('back')">
    ← Back
  </button>
</template>

<style scoped>
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #f1f5f9; /* Soft slate white backdrop */
  color: #475569; /* Polished deep slate text */
  border: 1px solid #e2e8f0; /* Crisp theme outline borders */
  border-radius: 6px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

/* Hover state: lifts up cleanly and darkens slightly */
.back-btn:hover {
  background-color: #e2e8f0;
  color: #1e293b;
  transform: translateX(-2px); /* Subtle physical shift leftwards */
}

/* Active click state: depresses downwards */
.back-btn:active {
  transform: scale(0.97) translateX(-2px);
}

/* Focus configurations for accessibility boundaries */
.back-btn:focus-visible {
  outline: 2px solid #cbd5e1;
  outline-offset: 2px;
}
</style>
