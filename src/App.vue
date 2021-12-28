<template>
  <div class="min-h-screen h-full w-full flex flex-col">
    <div class="bg-transparent text-white z-10 absolute top-0 w-full">
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto flex justify-between p-4">
          <div class="flex items-center h-full space-x-2">
            <span class="font-semibold">Mira on Web</span>
          </div>
          <div class="hidden sm:flex space-x-3">
            <router-link
              v-for="navbarLink in navbarLinks"
              :key="navbarLink.name"
              :to="navbarLink.path"
              :class="{ 'font-semibold': navbarLink.path === $route.path }"
              >{{ navbarLink.name }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const navbarLinks = [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Projects',
        path: '/projects',
      },
    ];
    return {
      navbarLinks,
    };
  },
});
</script>
