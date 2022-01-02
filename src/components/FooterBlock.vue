<template>
  <div class="bg-gray-700 text-white">
    <div class="container mx-auto">
      <div class="max-w-6xl mx-auto p-4">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold text-xs md:text-sm text-left">
              Mira on Web &mdash; Made with
              <font-awesome-icon :icon="['fa', 'heart']" class="text-red-500" />
              by Jonas Claes
            </p>
          </div>
          <div>
            <p class="font-semibold text-xs md:text-sm text-right">
              &copy; Copyright {{ year }}
            </p>
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
  setup() {
    const date = new Date();
    const year = date.getFullYear();

    return {
      year,
    };
  },
});
</script>
