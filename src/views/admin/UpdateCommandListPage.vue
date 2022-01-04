<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Update command list</h1>
    <p class="text-gray-400">No habbel Espagnol!</p>
  </div>
  <form action="#" @submit="submitForm">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <TextInput
        v-model="name"
        name="name"
        label="Name"
        placeholder="snoepje"
        description="Enter a name for the command here. Do NOT include the /."
      />
      <TextInput
        v-model="description"
        name="description"
        label="Description"
        placeholder="Geef Mira een snoepje!"
        description="Enter a description for the command here."
      />
      <TextInput
        class="col-span-full"
        v-model="options"
        name="options"
        label="Options"
        placeholder="Njam!;Dankjewel!;Yummie!;Oeeeeeeh!!;"
        description="Enter all the options for the command here.
        Important! Seperate them with a ';'!"
      />
      <div class="col-span-full">
        <p>Recognized options:</p>
        <p>Total: {{ recognizedOptions.length }}</p>
        <pre
          class="
            bg-gray-800
            p-4
            rounded-lg
            shadow-inner
            break-all
            whitespace-pre-wrap
          "
          >{{ recognizedOptions.join('\n') }}</pre
        >
      </div>
    </div>
    <div class="mt-3">
      <button
        type="submit"
        class="bg-blue-600 px-8 py-2 rounded-md shadow-md disabled:bg-gray-600"
        :disabled="false"
        :class="{ 'animate-pulse': false }"
      >
        Update
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import TextInput from '@/components/forms/TextInput.vue';
import { showToast } from '@/common';
import CommandData from '@/services/CommandData';

export default defineComponent({
  name: 'SpeakPage',
  components: {
    TextInput,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const submitting: Ref<boolean> = ref(false);
    const name: Ref<string> = ref('');
    const description: Ref<string> = ref('');
    const options: Ref<string> = ref('');
    const recognizedOptions: Ref<string[]> = ref([]);

    store.commit('setLoading', true);

    onMounted(async () => {
      const commandList = await CommandData.getCommandList(Number(route.params.id));

      name.value = commandList.name;
      description.value = commandList.description;
      options.value = commandList.options.join(';');

      store.commit('setLoading', false);
    });

    const filterOptions = () => options.value.split(';').filter((opt) => opt !== '');

    watch(options, () => {
      recognizedOptions.value = [];
      filterOptions().forEach((opt) => recognizedOptions.value.push(opt));
    });

    const submitForm = async (event: Event) => {
      event.preventDefault();
      showToast({
        name: 'Updating...',
        description: 'Updating the command list...',
      });
      submitting.value = true;

      const opts = filterOptions();
      const success = await CommandData.updateCommandList(
        Number(route.params.id),
        name.value,
        description.value,
        opts,
      );

      submitting.value = false;

      showToast({
        name: 'Done!',
        description: 'Updated the command list!',
        color: 'green',
      });

      if (success) {
        router.push('/admin/commands');
      }
    };

    return {
      name,
      description,
      options,
      recognizedOptions,
      submitForm,
    };
  },
});
</script>
