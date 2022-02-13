<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Create reaction flow</h1>
    <p class="text-gray-400">Use emoticons as a trigger for actions.</p>
  </div>
  <form action="#" @submit="submitForm">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label for="guildName">
          <span class="block">Guild:</span>
          <input
            type="text"
            name="guildName"
            id="guildName"
            placeholder="Happy server"
            list="guildDatalist"
            v-model="formData.guildName"
            @change="loadChannels"
            class="
              rounded-md
              shadow-md
              bg-gray-800
              text-white
              h-10
              p-2
              placeholder:text-gray-500
              w-full
              disabled:bg-gray-900 disabled:placeholder:text-gray-700
            "
          />
          <datalist id="guildDatalist">
            <option v-for="guild in guilds" :key="guild.id">
              {{ guild.name }}
            </option>
          </datalist>
        </label>
        <small class="block">Select the guild here.</small>
      </div>
      <div>
        <label for="channelName">
          <span class="block">Channel:</span>
          <input
            type="text"
            name="channelName"
            id="channelName"
            placeholder="Welcome"
            list="guildChannelDatalist"
            v-model="formData.channelName"
            class="
              rounded-md
              shadow-md
              bg-gray-800
              text-white
              h-10
              p-2
              placeholder:text-gray-500
              w-full
              disabled:bg-gray-900 disabled:placeholder:text-gray-700
            "
            :disabled="guildChannels.length === 0"
          />
          <datalist id="guildChannelDatalist">
            <option
              v-for="guildChannel in guildChannels"
              :key="guildChannel.id"
            >
              {{ guildChannel.name }}
            </option>
          </datalist>
        </label>
        <small class="block">Select the guild channel here.</small>
      </div>
      <TextInput
        v-model="formData.name"
        name="name"
        label="Name"
        placeholder="Country selector"
        description="Enter a name for the reaction flow here."
      />
      <TextInput
        v-model="formData.description"
        name="description"
        label="Description"
        placeholder="The country selector gives a role based on the emoticon."
        description="Enter a description for the reaction flow here."
      />
      <div class="col-span-full">
        <label for="messageText">
          <span class="block">Message text:</span>
          <textarea
            name="messageText"
            id="messageText"
            placeholder="A message to explain the options..."
            v-model="formData.messageText"
            rows="10"
            class="
              rounded-md
              shadow-md
              bg-gray-800
              text-white
              p-2
              placeholder:text-gray-500
              w-full
            "
          ></textarea>
        </label>
        <small class="block"
          >Enter a message here. This message will be sent by the bot in the
          channel of your choice.</small
        >
      </div>
      <div class="col-span-full">
        <label for="reactionsList">
          <span class="block">Reactions list:</span>
          <textarea
            name="reactionsList"
            id="reactionsList"
            placeholder=""
            v-model="formData.reactions"
            rows="10"
            class="
              rounded-md
              shadow-md
              bg-gray-800
              text-white
              p-2
              placeholder:text-gray-500
              w-full
            "
          ></textarea>
        </label>
        <small class="block"
          >Enter all the possible emojis here. Seperate them with a new
          line.</small
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
        Create
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  Ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TextInput from '@/components/forms/TextInput.vue';
import { showToast } from '@/common';
import DiscordData, { GuildChannels, Guilds } from '@/services/DiscordData';

export type ReactionFlowCreateFormData = {
  guildName: string;
  channelName: string;
  name: string;
  description: string;
  messageText: string;
  reactions: string;
};

export default defineComponent({
  name: 'ReactionFlowsCreatePage',
  components: {
    TextInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const guilds: Ref<Guilds> = ref([]);
    const guildChannels: Ref<GuildChannels> = ref([]);
    const formData: Ref<ReactionFlowCreateFormData> = ref({
      guildName: '',
      channelName: '',
      name: '',
      description: '',
      messageText: '',
      reactions: '',
    });

    const submitting: Ref<boolean> = ref(false);

    store.commit('setLoading', true);

    const retrieveGuilds = async () => {
      try {
        guilds.value = await DiscordData.getAllGuilds();
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: 'Error!',
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      }
    };

    const loadChannels = async () => {
      try {
        store.commit('setLoading', true);

        const guild = guilds.value.find(
          (elem) => elem.name === formData.value.guildName,
        );

        if (!guild) throw new Error('Guild not found.');

        guildChannels.value = await DiscordData.getAllGuildTextChannels(
          guild.id,
        );
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: 'Error!',
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
      await retrieveGuilds();
      store.commit('setLoading', false);
    });

    const submitForm = async (event: Event) => {
      try {
        event.preventDefault();
        showToast({
          name: 'Creating...',
          description: 'Creating the reaction flow...',
        });
        submitting.value = true;

        const {
          guildName,
          channelName,
          name,
          description,
          messageText,
          reactions,
        } = formData.value;

        const guild = guilds.value.find((elem) => elem.name === guildName);
        if (!guild) throw new Error('Guild not found');

        const channel = guildChannels.value.find(
          (elem) => elem.name === channelName,
        );
        if (!channel) throw new Error('Channel not found');

        const reactionsList = reactions.split(/\r|\n/);

        const success = await DiscordData.createReactionCollector(
          1,
          guild.id,
          channel.id,
          name,
          description,
          messageText,
          reactionsList,
        );

        if (success) {
          showToast({
            name: 'Done!',
            description: 'Created the reaction flow!',
            color: 'green',
          });

          router.push('/admin/flows');
        }
      } catch (e) {
        if (e instanceof Error) {
          showToast({
            name: 'Error!',
            description: e.message,
            time: 5000,
            color: 'red',
          });
        }
      } finally {
        submitting.value = false;
      }
    };

    return {
      guilds,
      guildChannels,
      formData,
      loadChannels,
      submitForm,
    };
  },
});
</script>
