<template>
  <div class="min-h-screen h-full w-full flex flex-col scroll-smooth">
    <div
      class="bg-transparent text-white z-10 absolute top-0 w-full"
      v-if="isFrontendPage()"
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
                :class="{
                  'font-semibold': isActive(navbarLink.name),
                  'py-2 px-4 bg-white text-black rounded-full':
                    navbarLink.button,
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
  defineComponent, onMounted, ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isAuthenticated, ORY_URLS } from './auth/ory';
import BackendLayout from './components/BackendLayout.vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navbarLinks = ref([
      {
        name: 'Home',
        path: '/',
        button: false,
        external: false,
      },
    ]);

    onMounted(async () => {
      const authenticated = await isAuthenticated();

      if (authenticated) {
        navbarLinks.value.push({
          name: 'Dashboard',
          path: '/admin/dashboard',
          button: true,
          external: false,
        });
      } else {
        navbarLinks.value.push({
          name: 'Login',
          path: ORY_URLS.LOGIN,
          button: true,
          external: true,
        });
      }
    });

    const isActive = (name: string): boolean => {
      const routeName = route.name || '';
      return routeName === name;
    };

    const isFrontendPage = (routeName = route.name?.toString() || ''): boolean => ['Home'].includes(routeName);

    const isAdminPage = (routeName = route.name?.toString() || ''): boolean => !isFrontendPage(routeName);

    return {
      navbarLinks,
      isFrontendPage,
      isAdminPage,
      isActive,
    };
  },
  components: { BackendLayout },
});
</script>
