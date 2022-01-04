<template>
  <div class="mb-2 flex flex-col sm:flex-row justify-between items-start">
    <div>
      <h1 class="text-2xl font-semibold">Commands</h1>
      <p class="text-gray-400">Smart stuff at the hand of a command!</p>
    </div>
    <div>
      <button
        @click="reloadBot"
        class="bg-blue-600 px-8 py-2 rounded-md shadow-md disabled:bg-gray-600"
        :disabled="reloading"
        :class="{ 'animate-pulse': reloading }"
      >
        Reload Discord Bot Commands
      </button>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-3 divide-x-2">
    <div>
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl font-semibold">Lists</h2>
        <button
          @click="createCommandList"
          class="
            bg-blue-600
            px-8
            py-2
            rounded-md
            shadow-md
            disabled:bg-gray-600
          "
          :disabled="false"
          :class="{ 'animate-pulse': false }"
        >
          New
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div
          v-for="list in lists"
          :key="list.name"
          class="bg-gray-800 rounded-md p-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <p>Command:</p>
              <p class="font-semibold">/{{ list.name }}</p>
              <p>{{ list.description }}</p>
            </div>
            <button
              @click="deleteCommandList(list.id)"
              class="bg-red-600 rounded-md shadow-md p-3 disabled:bg-gray-600"
              :disabled="false"
              :class="{ 'animate-pulse': false }"
            >
              <font-awesome-icon class="w-3 h-3s" :icon="['fa', 'trash']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { showToast } from '@/common';
import { CommandListEntities } from '@/types/api/CommandListEntities';
import DiscordBotData from '@/services/DiscordBotData';
import CommandData from '@/services/CommandData';

export default defineComponent({
  name: 'SpeakPage',
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();

    store.commit('setLoading', true);

    const lists: Ref<CommandListEntities> = ref([]);
    const reloading: Ref<boolean> = ref(false);

    const loadData = async () => {
      lists.value = await CommandData.getAllCommandLists();
    };

    const createCommandList = () => {
      router.push('/admin/commands/lists/create');
    };

    const reloadBot = async () => {
      reloading.value = true;

      showToast({
        name: 'Busy...',
        description: 'The Discord Bot is reloading the commands...',
      });

      await DiscordBotData.reloadCommands();

      reloading.value = false;

      showToast({
        name: 'Done!',
        description: 'The Discord Bot has reloaded the commands!',
        color: 'green',
      });
    };

    const deleteCommandList = async (id: number) => {
      store.commit('setLoading', true);

      showToast({
        name: 'Deleting...',
        description: 'Deleting the list...',
      });

      try {
        await CommandData.deleteCommandList(id);
        await loadData();

        showToast({
          name: 'Done!',
          description: 'Deleted the list!',
          color: 'green',
        });
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: e.name,
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      } finally {
        store.commit('setLoading', false);
      }
    };

    onMounted(async () => {
      loadData();
      store.commit('setLoading', false);
    });

    return {
      lists,
      reloading,
      reloadBot,
      createCommandList,
      deleteCommandList,
    };
  },
});
</script>
