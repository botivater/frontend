<template>
  <div class="mb-2 flex flex-col sm:flex-row justify-between items-start">
    <div>
      <h1 class="text-2xl font-semibold">Statistics</h1>
      <p class="text-gray-400">How am I doing?</p>
    </div>
  </div>
  <div class="flex flex-col space-y-3">
    <div>
      <div class="mb-3">
        <h2 class="text-xl font-semibold">General</h2>
        <p class="text-gray-400">Some general doodads</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"></div>
    </div>
    <div>
      <div class="mb-3">
        <h2 class="text-xl font-semibold">Commands</h2>
        <p class="text-gray-400">Individual command statistics</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div v-for="usage in usages" :key="usage.commandName">
          <DashboardStatisticCard
            :name="`/${usage.commandName}`"
            :value="`${usage.invocations} ${
              usage.invocations > 1 ? 'times' : 'time'
            }`"
            :loaded="!loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref, Ref,
} from 'vue';
import { useStore } from 'vuex';
import { CommandUsageStatistics } from '@/types/api/CommandUsageStatistics';
import CommandUsageData from '@/services/CommandUsageData';
import DashboardStatisticCard from '@/components/DashboardStatisticCard.vue';

export default defineComponent({
  name: 'StatisticsPage',
  components: { DashboardStatisticCard },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.loading);

    store.commit('setLoading', true);

    // Data
    const usages: Ref<CommandUsageStatistics> = ref([]);

    const loadData = async () => {
      usages.value = await CommandUsageData.getAllUsage();
    };

    onMounted(async () => {
      await loadData();
      store.commit('setLoading', false);
    });

    return {
      usages,
      loading,
    };
  },
});
</script>
