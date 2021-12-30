<template>
  <div
    class="
      bg-gradient-to-br
      p-4
      rounded-lg
      shadow-lg
      transition-opacity
      delay-1000
    "
    :class="{
      'from-blue-700 to-cyan-600': color === 'blue',
      'from-red-700 to-pink-600': color === 'red',
      'from-green-700 to-emerald-600': color === 'green',
    }"
  >
    <p class="font-semibold text-lg">{{ name }}</p>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToastItem',
  props: ['name', 'description', 'color'],
});
</script>
