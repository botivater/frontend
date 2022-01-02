<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <p class="text-gray-400">How is Mira doing?</p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <DashboardStatisticCard
      name="Total guilds"
      :value="totalGuilds"
      :loaded="!guildsLoading"
    />
    <DashboardStatisticCard
      name="Total channels"
      :value="totalChannels"
      :loaded="!channelsLoading"
    />
    <DashboardStatisticCard
      name="Total members"
      :value="totalMembers"
      :loaded="!membersLoading"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { defineComponent } from 'vue';
import DashboardStatisticCard from '@/components/DashboardStatisticCard.vue';
import DiscordData, { Guilds } from '@/services/DiscordData';
import { showToast } from '@/common';

type Data = {
  guildsLoading: boolean;
  guilds: Guilds;
  channelsLoading: boolean;
  totalChannels: number;
  membersLoading: boolean;
  totalMembers: number;
};

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardStatisticCard,
  },
  data(): Data {
    return {
      guildsLoading: true,
      guilds: [],
      channelsLoading: true,
      totalChannels: 0,
      membersLoading: true,
      totalMembers: 0,
    };
  },
  async created() {
    await this.retrieveGuilds();
    await Promise.all([
      this.calculateTotalChannels(),
      this.calculateTotalMembers(),
    ]);
  },
  methods: {
    async retrieveGuilds() {
      try {
        this.guilds = await DiscordData.getAllGuilds();
        this.guildsLoading = false;
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: e.name,
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      }
    },

    async calculateTotalChannels() {
      try {
        for (const guild of this.guilds) {
          const guildChannels = await DiscordData.getAllGuildChannels(guild.id);
          this.totalChannels += guildChannels.length;
        }

        this.channelsLoading = false;
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: e.name,
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      }
    },

    async calculateTotalMembers() {
      try {
        for (const guild of this.guilds) {
          const guildMembers = await DiscordData.getAllGuildMembers(guild.id);
          this.totalMembers += guildMembers.length;
        }

        this.membersLoading = false;
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: e.name,
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      }
    },
  },
  computed: {
    totalGuilds(): number {
      return this.guilds.length;
    },
  },
});
</script>
