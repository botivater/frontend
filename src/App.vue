<template>
  <div class="min-h-screen h-full w-full flex flex-col scroll-smooth">
    <div
      class="bg-transparent text-white z-10 absolute top-0 w-full"
      v-if="showNavBar()"
    >
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto flex justify-between p-4 items-center">
          <div class="flex items-center h-full space-x-2">
            <span class="font-semibold">Mira on Web</span>
          </div>
          <div class="flex space-x-3 items-center">
            <template v-for="navbarLink in navbarLinks" :key="navbarLink.name">
              <router-link
                v-if="!navbarLink.external"
                :to="navbarLink.path"
                :class="{
                  'font-semibold': isActive(navbarLink.name),
                  'py-2 px-4 bg-white text-black rounded-full':
                    navbarLink.button,
                }"
                >{{ navbarLink.name }}</router-link
              >
              <a
                v-if="navbarLink.external"
                :href="navbarLink.path"
                @click="navbarLink.action"
                :class="{
                  'font-semibold': isActive(navbarLink.name),
                  'py-2 px-4 bg-white text-black rounded-full':
                    navbarLink.button,
                  'cursor-pointer': navbarLink.action,
                }"
                >{{ navbarLink.name }}</a
              >
            </template>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="isFrontendPage()" />
    <BackendLayout v-if="isAdminPage()">
      <router-view />
    </BackendLayout>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, Ref, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import auth from './auth/index';
import BackendLayout from './components/BackendLayout.vue';
import { LinkList } from './types/LinkList';

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();

    const isAuthenticated = computed(() => store.state.authenticated);

    const navbarLinks: Ref<LinkList> = ref([
      {
        name: 'Home',
        path: '/',
        button: false,
        external: false,
      },
    ]);

    const login = async () => {
      await auth.login();
    };

    const logout = async () => {
      await auth.logout();
    };

    const isActive = (name: string): boolean => {
      const routeName = route.name || '';
      return routeName === name;
    };

    const isFrontendPage = (
      routeName = route.name?.toString() || '',
    ): boolean => ['Home', 'Auth'].includes(routeName);

    const showNavBar = (routeName = route.name?.toString() || ''): boolean => ['Home'].includes(routeName);

    const isAdminPage = (routeName = route.name?.toString() || ''): boolean => !isFrontendPage(routeName);

    const handleNavBarLinks = () => {
      navbarLinks.value = [
        {
          name: 'Home',
          path: '/',
          button: false,
          external: false,
        },
      ];

      if (isAuthenticated.value) {
        navbarLinks.value.push({
          name: 'Dashboard',
          path: '/admin/dashboard',
          button: true,
          external: false,
        });
        navbarLinks.value.push({
          name: 'Logout',
          action: logout,
          button: true,
          external: true,
        });
      } else {
        navbarLinks.value.push({
          name: 'Login',
          action: login,
          button: true,
          external: true,
        });
      }
    };

    onMounted(handleNavBarLinks);
    watch(isAuthenticated, handleNavBarLinks);

    return {
      navbarLinks,
      isFrontendPage,
      showNavBar,
      isAdminPage,
      isActive,
    };
  },
  components: { BackendLayout },
});
</script>
