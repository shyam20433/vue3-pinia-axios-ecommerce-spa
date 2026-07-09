<script setup>
defineProps({
  prod: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-card elevation="4" class="product-card">

    <v-img
      :src="prod.image"
      :alt="prod.name"
      height="200"
      cover
    />

    <v-card-title>
      {{ prod.name }}
    </v-card-title>

    <v-card-text>
      <p>
        <strong>ID:</strong>
        {{ prod.id }}
      </p>

      <p>
        <strong>Price:</strong>
        ₹{{ prod.price }}
      </p>
    </v-card-text>

    <v-card-actions>
      <slot name="button"></slot>
    </v-card-actions>

  </v-card>
</template>
