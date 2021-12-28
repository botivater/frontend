<template>
  <div class="min-h-screen h-full w-full flex flex-col">
    <div
      class="bg-transparent text-white z-10 absolute top-0 w-full"
      v-if="navbarShownPaths.includes($route.path)"
    >
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto flex justify-between p-4 items-center">
          <div class="flex items-center h-full space-x-2">
            <span class="font-semibold">Mira on Web</span>
          </div>
          <div class="hidden sm:flex space-x-3 items-center">
            <router-link
              v-for="navbarLink in navbarLinks"
              :key="navbarLink.name"
              :to="navbarLink.path"
              :class="{
                'font-semibold': navbarLink.path === $route.path,
                'py-2 px-4 bg-white text-black rounded-full': navbarLink.button,
              }"
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
    const navbarShownPaths = ['/'];
    const navbarLinks = [
      {
        name: 'Home',
        path: '/',
        button: false,
      },
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        button: true,
      },
    ];
    return {
      navbarLinks,
      navbarShownPaths,
    };
  },
});
</script>
