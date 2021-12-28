<template>
  <div class="bg-gray-800 text-white p-4 w-60 flex flex-col justify-between">
    <div class="flex flex-col">
      <h1 class="text-xl font-semibold mb-2">Mira on Web</h1>
      <router-link
        v-for="navbarLink in topLinks"
        :key="navbarLink.name"
        :to="navbarLink.path"
        ><font-awesome-icon :icon="navbarLink.icon" /><span class="ml-2">{{
          navbarLink.name
        }}</span></router-link
      >
    </div>
    <div class="flex flex-col">
      <router-link
        v-for="navbarLink in bottomLinks"
        :key="navbarLink.name"
        :to="navbarLink.path"
        ><font-awesome-icon :icon="navbarLink.icon" /><span class="ml-2">{{
          navbarLink.name
        }}</span></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const topLinks = [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: ['fa', 'tachometer-alt'],
      },
    ];
    const bottomLinks = [
      {
        name: 'Home',
        path: '/',
        icon: ['fa', 'home'],
      },
    ];

    return {
      topLinks,
      bottomLinks,
    };
  },
});
</script>
