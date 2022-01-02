<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Debug</h1>
    <p class="text-gray-400">"What's inside?"</p>
  </div>
  <div>
    <h2>Session details</h2>
    <pre v-if="session" class="bg-gray-800 p-4 rounded-lg shadow-inner">{{ session }}</pre>
    <p v-else>No session found.</p>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { defineComponent } from 'vue';
import { Session } from '@ory/kratos-client';
import { getSession } from '@/auth/ory';

type Data = {
  session: Session | undefined;
};

export default defineComponent({
  name: 'DebugPage',
  components: {
  },
  data(): Data {
    return {
      session: undefined,
    };
  },
  async created() {
    this.getSession();
  },
  methods: {
    async getSession() {
      try {
        this.session = await getSession();
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>
