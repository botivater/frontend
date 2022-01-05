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
    :class="{ 'w-16': sidebar }"
  >
    <div class="flex flex-col space-y-1">
      <button
        @click="toggleSidebar"
        class="bg-gray-900 transition-colors duration-200 py-2 px-4"
        :class="{ 'h-16 flex justify-center items-center p-0': sidebar }"
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
          'h-16 flex justify-center items-center p-0': sidebar,
        }"
        ><font-awesome-icon :icon="navbarLink.icon" /><span
          class="ml-2"
          :class="{
            'font-semibold': navbarLink.path === $route.path,
            hidden: sidebar,
          }"
          >{{ navbarLink.name }}</span
        ></router-link
      >
    </div>
    <div class="flex flex-col space-y-1">
      <template v-for="navbarLink in bottomLinks" :key="navbarLink.name">
        <router-link
          v-if="!navbarLink.external"
          :to="navbarLink.path"
          class="bg-gray-900 transition-colors duration-200 py-2 px-4"
          :class="{
            'bg-blue-800': navbarLink.path === $route.path,
            'h-16 flex justify-center items-center p-0': sidebar,
          }"
          ><font-awesome-icon
            v-if="navbarLink.icon"
            :icon="navbarLink.icon"
          /><span
            class="ml-2"
            :class="{
              'font-semibold': navbarLink.path === $route.path,
              hidden: sidebar,
            }"
            >{{ navbarLink.name }}</span
          ></router-link
        >
        <a
          v-if="navbarLink.external"
          :href="navbarLink.path"
          @click="navbarLink.action"
          class="bg-gray-900 transition-colors duration-200 py-2 px-4"
          :class="{
            'bg-blue-800': navbarLink.path === $route.path,
            'h-16 flex justify-center items-center p-0': sidebar,
            'cursor-pointer': navbarLink.action
          }"
          ><font-awesome-icon
            v-if="navbarLink.icon"
            :icon="navbarLink.icon"
          /><span
            class="ml-2"
            :class="{
              'font-semibold': navbarLink.path === $route.path,
              hidden: sidebar,
            }"
            >{{ navbarLink.name }}</span
          ></a
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, Ref,
} from 'vue';
import { useStore } from 'vuex';
import { LinkList } from '@/types/LinkList';
import auth from '@/auth';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.state.sidebar);

    const toggleSidebar = () => {
      store.commit('toggleSidebar');
    };

    const logout = async () => {
      await auth.logout();
    };

    const topLinks: Ref<LinkList> = ref([
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: ['fa', 'tachometer-alt'],
        external: false,
      },
      {
        name: 'Speak',
        path: '/admin/speak',
        icon: ['fa', 'headset'],
        external: false,
      },
      {
        name: 'Commands',
        path: '/admin/commands',
        icon: ['fa', 'terminal'],
        external: false,
      },
      {
        name: 'Statistics',
        path: '/admin/statistics',
        icon: ['fa', 'chart-line'],
        external: false,
      },
    ]);

    const bottomLinks: Ref<LinkList> = ref([
      {
        name: 'Home',
        path: '/',
        icon: ['fa', 'home'],
        external: false,
      },
      {
        name: 'Debug',
        path: '/admin/debug',
        icon: ['fa', 'eye'],
        external: false,
      },
      {
        name: 'Logout',
        action: logout,
        icon: ['fa', 'sign-out-alt'],
        external: true,
      },
    ]);

    return {
      topLinks,
      bottomLinks,
      toggleSidebar,
      sidebar,
    };
  },
});
</script>
