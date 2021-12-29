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
                :loaded="totalGuilds"
              />
              <DashboardStatisticCard
                name="Total channels"
                :value="totalChannels"
                :loaded="totalChannels"
              />
              <DashboardStatisticCard
                name="Total members"
                :value="totalMembers"
                :loaded="totalMembers"
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
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import SideBar from '@/components/SideBar.vue';
import DashboardStatisticCard from '@/components/DashboardStatisticCard.vue';
import FooterBlock from '@/components/FooterBlock.vue';

type Data = {
  totalGuilds: number | null;
  totalChannels: number | null;
  totalMembers: number | null;
};

type Guild = {
  id: string;
};

export default defineComponent({
  name: 'DashboardPage',
  components: {
    SideBar,
    DashboardStatisticCard,
    FooterBlock,
  },
  data(): Data {
    return {
      totalGuilds: null,
      totalChannels: null,
      totalMembers: null,
    };
  },
  async created() {
    await this.fetchAllGuilds();

    const guilds: Guild[] = this.getGuilds();

    this.totalGuilds = guilds.length;

    for (const guild of guilds) {
      await Promise.all([
        this.fetchGuildChannels(guild.id),
        this.fetchGuildMembers(guild.id),
      ]);

      const channels = this.getGuildChannels();
      this.totalChannels += channels.length;

      const members = this.getGuildMembers();
      this.totalMembers += members.length;
    }
  },
  methods: {
    ...mapActions([
      'fetchAllGuilds',
      'fetchGuildChannels',
      'fetchGuildMembers',
    ]),
  },
  computed: {
    ...mapGetters(['getGuilds', 'getGuildChannels', 'getGuildMembers']),
  },
});
</script>
