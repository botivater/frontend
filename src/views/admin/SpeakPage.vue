<template>
  <div class="mb-2">
              <h1 class="text-2xl font-semibold">Speak</h1>
              <p class="text-gray-400">Let Mira say something in Discord</p>
            </div>
            <form action="#" @submit="speak">
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
                      v-model="guildName"
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
                      v-model="channelName"
                      class="
                        rounded-md
                        shadow-md
                        bg-gray-800
                        text-white
                        h-10
                        p-2
                        placeholder:text-gray-500
                        w-full
                      "
                    />
                    <datalist id="guildChannelDatalist">
                      <option
                        v-for="guildChannel in channels"
                        :key="guildChannel.id"
                      >
                        {{ guildChannel.name }}
                      </option>
                    </datalist>
                  </label>
                  <small class="block">Select the guild channel here.</small>
                </div>
                <TextInput
                  class="col-span-full"
                  v-model="speakText"
                  name="speakText"
                  label="Speak text"
                  placeholder="Goodmorning everyone!"
                  description="Enter a text to let Mira say here."
                />
              </div>
              <div class="mt-3">
                <button
                  type="submit"
                  class="
                    bg-blue-600
                    px-8
                    py-2
                    rounded-md
                    shadow-md
                    disabled:bg-gray-600
                  "
                  :disabled="sendingMessage"
                  :class="{ 'animate-pulse': sendingMessage }"
                >
                  Speak!
                </button>
              </div>
            </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextInput from '@/components/forms/TextInput.vue';
import DiscordData, { GuildChannels, Guilds } from '@/services/DiscordData';
import MiraData from '@/services/MiraData';
import { showToast } from '@/common';

type Data = {
  loaded: boolean;
  sendingMessage: boolean;
  guilds: Guilds;
  channels: GuildChannels;
  guildName: string;
  channelName: string;
  speakText: string;
};

export default defineComponent({
  name: 'SpeakPage',
  components: {
    TextInput,
  },
  data(): Data {
    return {
      loaded: false,
      sendingMessage: false,
      guilds: [],
      channels: [],
      guildName: '',
      channelName: '',
      speakText: '',
    };
  },
  async created() {
    await this.retrieveGuilds();

    this.loaded = true;
  },
  methods: {
    async retrieveGuilds() {
      try {
        this.guilds = await DiscordData.getAllGuilds();
        this.loaded = true;
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
    },

    async loadChannels() {
      try {
        this.loaded = false;

        const guild = this.guilds.find((elem) => elem.name === this.guildName);

        if (!guild) throw new Error('Guild not found.');

        this.channels = await DiscordData.getAllGuildTextChannels(guild.id);
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
        this.loaded = true;
      }
    },
    async speak(event: Event) {
      event.preventDefault();
      try {
        this.sendingMessage = true;
        const { channels } = this;
        const channel = channels.find((elem) => elem.name === this.channelName);

        if (!channel) throw new Error('Channel not found.');

        await MiraData.speak(channel.id, this.speakText);

        showToast({
          name: 'Success!',
          description: 'Mira has sent the message.',
          time: 3000,
          color: 'green',
        });
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
        this.sendingMessage = false;
      }
    },
  },
  computed: {},
});
</script>
