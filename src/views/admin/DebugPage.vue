<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Debug</h1>
    <p class="text-gray-400">"What's inside?"</p>
  </div>
  <div>
    <h2>Authentication session details</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div>
        <p>Access token</p>
        <pre
          class="
            bg-gray-800
            p-4
            rounded-lg
            shadow-inner
            break-all
            whitespace-pre-wrap
          "
          >{{ token }}</pre
        >
      </div>
      <div>
        <p>User</p>
        <pre
          class="
            bg-gray-800
            p-4
            rounded-lg
            shadow-inner
            break-all
            whitespace-pre-wrap
          "
          >{{ user }}</pre
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { User } from '@auth0/auth0-spa-js';
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import auth from '@/auth';

export default defineComponent({
  name: 'DebugPage',
  components: {},
  setup() {
    const token: Ref<string | undefined> = ref(undefined);
    const user: Ref<User | undefined> = ref(undefined);

    onMounted(async () => {
      const auth0 = await auth.getAuth0();
      token.value = await auth0.getTokenSilently();
      user.value = await auth0.getUser();
    });

    return {
      token,
      user,
    };
  },
});
</script>
