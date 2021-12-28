<template>
  <div>
    <div
      class="min-h-screen h-full w-full text-white overflow-y-hidden"
      id="landing"
    >
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto px-4">
          <div
            class="
              h-screen
              flex flex-col
              sm:flex-row-reverse
              space-y-10
              sm:space-x-reverse sm:space-x-10 sm:space-y-0
              lg:space-x-reverse lg:space-x-20
              justify-center
              items-center
              py-4
            "
          >
            <div class="flex flex-col text-center sm:text-left items-center">
              <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold">
                Mira on Web
              </h1>
              <p class="text-xl md:text-2xl lg:text-3xl italic">
                Administration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterBlock></FooterBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FooterBlock from '@/components/FooterBlock.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    FooterBlock,
  },
});
</script>

<style scoped>
/* Credits to heropatterns.com for the background pattern */
#landing {
  background-color: #3b82f6;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.11' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
