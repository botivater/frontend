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
      <div class="relative flex flex-col w-full h-screen justify-between">
        <LoadingFull :loaded="loaded" />
        <div class="container mx-auto overflow-y-auto">
          <div class="max-w-6xl mx-auto p-4">
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
                      <option v-for="guild in getGuilds()" :key="guild.id">
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
                        v-for="guildChannel in getGuildChannelsText()"
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
                  class="bg-blue-600 px-8 py-2 rounded-md shadow-md"
                >
                  Speak!
                </button>
              </div>
            </form>
          </div>
        </div>
        <FooterBlock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import SideBar from '@/components/SideBar.vue';
import FooterBlock from '@/components/FooterBlock.vue';
import TextInput from '@/components/forms/TextInput.vue';
import LoadingFull from '@/components/LoadingFull.vue';

type Guild = {
  id: string;
  name: string;
};

type Channel = {
  id: string;
  name: string;
};

export default defineComponent({
  name: 'SpeakPage',
  components: {
    SideBar,
    FooterBlock,
    TextInput,
    LoadingFull,
  },
  data() {
    return {
      loaded: false,
      guildName: '',
      channelName: '',
      speakText: '',
    };
  },
  async created() {
    await this.fetchAllGuilds();

    this.loaded = true;
  },
  methods: {
    ...mapActions(['fetchAllGuilds', 'fetchGuildChannelsText']),
    async loadChannels() {
      try {
        this.loaded = false;

        const guilds: Guild[] = this.getGuilds();
        const guild = guilds.find((elem) => elem.name === this.guildName);

        if (!guild) throw new Error('Guild not found.');

        await this.fetchGuildChannelsText(guild.id);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e);
      } finally {
        this.loaded = true;
      }
    },
    async speak(event: Event) {
      event.preventDefault();
      try {
        const channels: Channel[] = this.getGuildChannelsText();
        const channel = channels.find((elem) => elem.name === this.channelName);

        if (!channel) throw new Error('Channel not found.');

        const apiUrl = 'http://192.168.178.66:3000/api/mira/speak';
        const opts = {
          method: 'POST',
          body: JSON.stringify({
            channelId: channel.id,
            message: this.speakText,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(apiUrl, opts).then((res) => res.json());

        console.log(response);

        // eslint-disable-next-line no-alert
        alert('Mira has spoken!');
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e);
      }
    },
  },
  computed: {
    ...mapGetters(['getGuilds', 'getGuildChannelsText']),
  },
});
</script>
