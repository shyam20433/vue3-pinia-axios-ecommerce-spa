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
      <p class="description">
        {{ prod.description }}
      </p>

      <p>
        <strong>Product ID:</strong>
        {{ prod.id }}
      </p>

      <p>
        <strong>Brand:</strong>
        {{ prod.brand }}
      </p>

      <p>
        <strong>Category:</strong>
        {{ prod.category }}
      </p>

      <p class="price">
        ₹{{ prod.price }}
      </p>
    </v-card-text>

    <v-card-actions>
      <slot name="button"></slot>
    </v-card-actions>

  </v-card>
</template>
