<template>
  <div class="bg-gray-800 text-white">
    <div class="container mx-auto">
      <div class="max-w-6xl mx-auto p-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="font-semibold text-left">Mira on Web</p>
          </div>
          <div>
            <p class="text-right">&copy; Copyright {{ "2021" }} - Jonas Claes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterBlock',
});
</script>
