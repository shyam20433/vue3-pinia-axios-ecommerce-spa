<script setup>
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="control-actions">
    <button class="btn-edit" @click="emit('edit')">Edit</button>
    <button class="btn-delete" @click="emit('delete')">Delete</button>
  </div>
</template>

<style scoped>
/* Inline layout wrapper layout rules */
.control-actions {
  display: flex;
  gap: 10px;
  width: 100%;
}

/* Base button specifications matching your theme standard */
button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.97);
}

/* Edit action configuration colors */
.btn-edit {
  background-color: #3b82f6; /* Accent theme blue */
  color: #ffffff;
}

/* Delete action configuration colors */
.btn-delete {
  background-color: #ef4444; /* Alert element red */
  color: #ffffff;
}

/* Focus configurations for accessible system interaction */
button:focus-visible {
  outline: 2px solid #94a3b8;
  outline-offset: 2px;
}
</style>
