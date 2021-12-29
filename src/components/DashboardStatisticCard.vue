<template>
  <div
    v-if="loaded"
    class="
      bg-gradient-to-br
      from-gray-800
      to-gray-900
      shadow-lg
      p-4
      rounded-xl
      flex
      justify-between
      items-center
      h-16
    "
  >
    <p class="text-lg font-bold">{{ name }}</p>
    <p class="text-lg font-semibold">{{ value }}</p>
  </div>
  <div
    v-if="!loaded"
    class="
      bg-gradient-to-br
      from-gray-800
      to-gray-900
      shadow-lg
      p-4
      rounded-xl
      h-16
    "
  >
    <div
      class="
        animate-pulse
        flex
        space-x-3
        justify-between
        items-center
        h-full
        w-full
      "
    >
      <div class="h-5 w-3/4 bg-gray-600 rounded-md flex"></div>
      <div class="h-5 w-1/4 bg-gray-600 rounded-md flex"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardStatisticCard',
  props: ['name', 'value', 'loaded'],
});
</script>
