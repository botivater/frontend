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
      <template v-for="navbarLink in bottomLinks" :key="navbarLink.name">
        <router-link
          v-if="!navbarLink.external"
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
        <a
          v-if="navbarLink.external"
          :href="navbarLink.path"
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
          ></a
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import store from '@/store';
import { getSession, ory } from '@/auth/ory';

type LinkItem = {
  name: string;
  path: string;
  icon: string[];
  external: boolean;
};

type LinkList = LinkItem[];

type Data = {
  topLinks: LinkList;
  bottomLinks: LinkList;

  logoutUrl: string | undefined;
};

export default defineComponent({
  name: 'SideBar',
  data(): Data {
    const topLinks = [
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
    ];
    const bottomLinks = [
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
    ];

    return {
      topLinks,
      bottomLinks,
      logoutUrl: undefined,
    };
  },
  async created() {
    await this.getLogoutUrl();
  },
  methods: {
    toggleSidebar() {
      store.commit('toggleSidebar');
    },
    async getLogoutUrl() {
      try {
        const session = await getSession();
        if (!session) return;

        const responseLogoutUrl = await ory.createSelfServiceLogoutFlowUrlForBrowsers();
        this.logoutUrl = responseLogoutUrl.data.logout_url;

        this.bottomLinks.push({
          name: 'Logout',
          path: this.logoutUrl,
          icon: ['fa', 'sign-out-alt'],
          external: true,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapGetters(['getSidebar']),
  },
});
</script>
