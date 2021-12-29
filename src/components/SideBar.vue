<template>
  <div
    class="
      bg-gray-800
      text-white
      shadow-lg
      h-screen
      w-60
      flex flex-col
      space-y-1
      justify-between
      border-r border-gray-800
      overflow-y-auto
    "
    :class="{ 'w-16': getSidebar() }"
  >
    <div class="flex flex-col space-y-1">
      <button
        @click="toggleSidebar"
        class="bg-gray-900 transition-colors duration-200 py-2 px-4"
        :class="{ 'h-16 flex justify-center items-center p-0': getSidebar() }"
      >
        <font-awesome-icon :icon="['fa', 'bars']" />
      </button>
      <router-link
        v-for="navbarLink in topLinks"
        :key="navbarLink.name"
        :to="navbarLink.path"
        class="bg-gray-900 transition-colors duration-200 py-2 px-4"
        :class="{
          'bg-blue-800': navbarLink.path === $route.path,
          'h-16 flex justify-center items-center p-0': getSidebar(),
        }"
        ><font-awesome-icon :icon="navbarLink.icon" /><span
          class="ml-2"
          :class="{
            'font-semibold': navbarLink.path === $route.path,
            hidden: getSidebar(),
          }"
          >{{ navbarLink.name }}</span
        ></router-link
      >
    </div>
    <div class="flex flex-col space-y-1">
      <router-link
        v-for="navbarLink in bottomLinks"
        :key="navbarLink.name"
        :to="navbarLink.path"
        class="bg-gray-900 transition-colors duration-200 py-2 px-4"
        :class="{
          'bg-blue-800': navbarLink.path === $route.path,
          'h-16 flex justify-center items-center p-0': getSidebar(),
        }"
        ><font-awesome-icon :icon="navbarLink.icon" /><span
          class="ml-2"
          :class="{
            'font-semibold': navbarLink.path === $route.path,
            hidden: getSidebar(),
          }"
          >{{ navbarLink.name }}</span
        ></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import store from '@/store';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const topLinks = [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: ['fa', 'tachometer-alt'],
      },
      {
        name: 'Speak',
        path: '/admin/speak',
        icon: ['fa', 'headset'],
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
  methods: {
    toggleSidebar() {
      store.commit('toggleSidebar');
      console.log(this.getSidebar());
    },
  },
  computed: {
    ...mapGetters(['getSidebar']),
  },
});
</script>
