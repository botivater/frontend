<template>
  <div>
    <div
      class="
        min-h-screen
        h-full
        w-full
        flex
        text-white
        bg-gray-700
        overflow-y-hidden
        relative
      "
    >
      <SideBar></SideBar>
      <ToastList />
      <div class="flex flex-col w-full h-screen justify-between">
        <div class="container mx-auto overflow-y-auto">
          <div class="max-w-6xl mx-auto p-4">
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
          </div>
        </div>
        <FooterBlock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';
import DashboardStatisticCard from '@/components/DashboardStatisticCard.vue';
import FooterBlock from '@/components/FooterBlock.vue';
import DiscordData, { Guilds } from '@/services/DiscordData';
import { showToast } from '@/common';
import ToastList from '@/components/ToastList.vue';

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
    SideBar,
    DashboardStatisticCard,
    FooterBlock,
    ToastList,
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
