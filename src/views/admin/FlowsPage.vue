<template>
  <div class="mb-2 flex flex-col sm:flex-row justify-between items-start">
    <div>
      <h1 class="text-2xl font-semibold">Flows</h1>
      <p class="text-gray-400">Automate everything!</p>
    </div>
  </div>
  <div class="flex flex-col space-y-3">
    <div>
      <div class="flex justify-between items-center mb-3">
        <div>
          <h2 class="text-xl font-semibold">Reaction flows</h2>
          <p class="text-gray-400">
            Perform actions when an emoticon is clicked.
          </p>
        </div>
        <!-- <button
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
        </button> -->
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div
          v-for="reactionFlowGroup in reactionFlowGroups"
          :key="reactionFlowGroup.id"
          class="bg-gray-800 rounded-md p-4 grid grid-cols-1 gap-3"
        >
          <div>
            <p>
              <strong>{{ reactionFlowGroup.name }}</strong>
            </p>
            <p>{{ reactionFlowGroup.description }}</p>
            <p>Actions: {{ reactionFlowGroup.commandFlows.length }}</p>
          </div>
          <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <router-link
              :to="`/admin/commands/lists/${list.id}/update`"
              class="
                bg-blue-600
                rounded-md
                shadow-md
                p-3
                disabled:bg-gray-600
                flex
                items-center
                justify-center
              "
              :disabled="false"
              :class="{ 'animate-pulse': false }"
              ><font-awesome-icon
                class="w-4 h-4 mx-1"
                :icon="['fa', 'edit']"
              />Edit
            </router-link>
            <button
              @click="deleteCommandList(list.id)"
              class="bg-red-600 rounded-md shadow-md p-3 disabled:bg-gray-600"
              :disabled="false"
              :class="{ 'animate-pulse': false }"
            >
              <font-awesome-icon
                class="w-4 h-4 mx-1"
                :icon="['fa', 'trash']"
              />Delete
            </button>
          </div> -->
        </div>
      </div>
      <div v-if="reactionFlowGroups.length === 0">
        <p class="bg-gray-800 p-4 rounded-lg text-center">
          There are no reaction flows yet.
        </p>
      </div>
    </div>
    <div>
      <div class="flex justify-between items-center mb-3">
        <div>
          <h2 class="text-xl font-semibold">Message flows</h2>
          <p class="text-gray-400">
            Perform actions when an certain message is sent.
          </p>
        </div>
      </div>
      <div>
        <p class="bg-gray-800 p-4 rounded-lg text-center">
          This feature is not available yet.
        </p>
      </div>
    </div>
    <div>
      <div class="flex justify-between items-center mb-3">
        <div>
          <h2 class="text-xl font-semibold">Command flows</h2>
          <p class="text-gray-400">
            Perform actions when an certain command is used.
          </p>
        </div>
      </div>
      <div>
        <p class="bg-gray-800 p-4 rounded-lg text-center">
          This feature is not available yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
// import { showToast } from '@/common';
// import { CommandListEntities } from '@/types/api/CommandListEntities';
// import DiscordBotData from '@/services/DiscordBotData';
// import CommandData from '@/services/CommandData';
import { CommandFlowGroupEntities } from '@/types/api/CommandFlowGroupEntities';
import DiscordData from '@/services/DiscordData';

export default defineComponent({
  name: 'FlowsPage',
  components: {},
  setup() {
    const store = useStore();
    // const router = useRouter();

    store.commit('setLoading', true);

    const reactionFlowGroups: Ref<CommandFlowGroupEntities> = ref([]);
    // const reloading: Ref<boolean> = ref(false);

    const loadData = async () => {
      reactionFlowGroups.value = await DiscordData.getAllReactionCollectors();
      // lists.value = await CommandData.getAllCommandLists();
      // commandFlows.value = [
      //   {

      //     id: 1,
      //     name: 'BE/NL role',
      //     description: 'Voeg de rol "Belg" en/of "Nederlander" toe afhankelijk van de emoji.',
      //     commandFlowEntities: [],
      //     type: 1,
      //   },
      //   {
      //     id: 2,
      //     name: 'Gender role',
      //     description: 'Voeg de gender rol toe.',
      //     commandFlowEntities: [],
      //     type: 1,
      //   },
      // ];
    };

    // const createCommandList = () => {
    //   router.push('/admin/commands/lists/create');
    // };

    // const deleteCommandList = async (id: number) => {
    //   store.commit('setLoading', true);

    //   showToast({
    //     name: 'Deleting...',
    //     description: 'Deleting the list...',
    //   });

    //   try {
    //     await CommandData.deleteCommandList(id);
    //     await loadData();

    //     showToast({
    //       name: 'Done!',
    //       description: 'Deleted the list!',
    //       color: 'green',
    //     });
    //   } catch (e) {
    //     if (e instanceof Error) {
    //       showToast({
    //         name: e.name,
    //         description: e.message,
    //         time: 5000,
    //         color: 'red',
    //       });
    //     }
    //   } finally {
    //     store.commit('setLoading', false);
    //   }
    // };

    onMounted(async () => {
      await loadData();
      store.commit('setLoading', false);
    });

    return {
      // reloading,
      reactionFlowGroups,
      // reloadBot,
      // createCommandList,
      // deleteCommandList,
    };
  },
});
</script>
