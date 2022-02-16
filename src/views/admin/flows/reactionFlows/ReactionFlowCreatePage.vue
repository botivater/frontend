<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold">Create reaction flow</h1>
    <p class="text-gray-400">Use emoticons as a trigger for actions.</p>
  </div>
  <form action="#" @submit="submitForm">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="col-span-full">
        <h2 class="text-xl font-semibold">Basic information</h2>
      </div>
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
            @change="loadGuildData"
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
    <div class="mt-3 grid grid-cols-1 gap-3">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">Actions</h2>
        </div>
        <button
          @click="addAction"
          type="button"
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

      <div
        v-for="(action, index) in actions"
        :key="index"
        class="
          border border-gray-800
          p-4
          rounded-lg
          shadow-md
          grid grid-cols-1
          sm:grid-cols-2
          gap-3
        "
      >
        <div class="col-span-full flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold">Action #{{ index + 1 }}</h3>
          </div>
          <button
            @click="removeAction(action)"
            type="button"
            class="
              bg-red-600
              px-8
              py-2
              rounded-md
              shadow-md
              disabled:bg-gray-600
            "
            :disabled="false"
            :class="{ 'animate-pulse': false }"
          >
            Delete
          </button>
        </div>
        <div>
          <label :for="`onType${index}`">
            <span class="block">On:</span>
            <select
              :name="`onType${index}`"
              :id="`onType${index}`"
              v-model="action.onType"
              class="
                rounded-md
                shadow-md
                bg-gray-800
                text-white
                h-10
                p-2
                w-full
              "
            >
              <option :value="OnType.NONE">None</option>
              <option :value="OnType.REACTION_ADD">Reaction added</option>
              <option :value="OnType.REACTION_REMOVE">Reaction removed</option>
            </select>
          </label>
          <small class="block">Select the on type of this action here.</small>
        </div>
        <div>
          <label :for="`buildingBlockType${index}`">
            <span class="block">Building block:</span>
            <select
              :name="`buildingBlockType${index}`"
              :id="`buildingBlockType${index}`"
              v-model="action.buildingBlockType"
              class="
                rounded-md
                shadow-md
                bg-gray-800
                text-white
                h-10
                p-2
                w-full
              "
            >
              <option :value="BuildingBlockType.NONE">None</option>
              <option :value="BuildingBlockType.SEND_MESSAGE">
                Send message
              </option>
              <option :value="BuildingBlockType.ADD_ROLE">Add role</option>
              <option :value="BuildingBlockType.REMOVE_ROLE">
                Remove role
              </option>
            </select>
          </label>
          <small class="block"
            >Select the building block of this action here.</small
          >
        </div>
        <div class="col-span-full">
          <fieldset class="border border-gray-800 p-2">
            <legend class="px-2">Options:</legend>
            <div class="px-2 pb-2">
              <div v-if="!action.buildingBlockType">
                <p>There are no options for this building block.</p>
              </div>

              <div
                v-if="
                  action.buildingBlockType === BuildingBlockType.SEND_MESSAGE
                "
                class="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div>
                  <label :for="`toType${index}`">
                    <span class="block">To:</span>
                    <select
                      :name="`toType${index}`"
                      :id="`toType${index}`"
                      v-model="action.options.toType"
                      class="
                        rounded-md
                        shadow-md
                        bg-gray-800
                        text-white
                        h-10
                        p-2
                        w-full
                      "
                    >
                      <option :value="SendMessageTo.SENDER">Sender</option>
                      <option :value="SendMessageTo.USER">User</option>
                      <option :value="SendMessageTo.CHANNEL">Channel</option>
                    </select>
                  </label>
                  <small class="block"
                    >Select the to type of this action here.</small
                  >
                </div>
                <div v-if="action.options.toType === 1">
                  <label :for="`sendMessageMemberId${index}`">
                    <span class="block">User:</span>
                    <input
                      type="text"
                      :name="`sendMessageMemberId${index}`"
                      :id="`sendMessageMemberId${index}`"
                      list="sendMessageMemberList"
                      v-model="action.options.to"
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
                  </label>
                  <small class="block">Select the guild member here.</small>
                </div>
                <div v-if="action.options.toType === 2">
                  <label :for="`sendMessageChannelId${index}`">
                    <span class="block">Channel:</span>
                    <input
                      type="text"
                      :name="`sendMessageChannelId${index}`"
                      :id="`sendMessageChannelId${index}`"
                      list="sendMessageChannelList"
                      v-model="action.options.to"
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
                  </label>
                  <small class="block">Select the guild channel here.</small>
                </div>
                <div class="col-span-full">
                  <label :for="`messageFormat${index}`">
                    <span class="block">Message format:</span>
                    <textarea
                      :name="`messageFormat${index}`"
                      :id="`messageFormat${index}`"
                      placeholder=""
                      v-model="action.options.messageFormat"
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
                    >Enter the format of the message to send here. You can find
                    available variables below.</small
                  >
                  <ul>
                    <li>
                      <strong>guild</strong>: This contains information about
                      the guild.
                    </li>
                    <li>
                      <strong>guildMember</strong>: This contains information
                      about the member that reacted.
                    </li>
                    <li>
                      <strong>user</strong>: This contains information about the
                      user that reacted.
                    </li>
                    <li>
                      <strong>reaction</strong>: This contains information about
                      the reaction that was given.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                v-if="action.buildingBlockType === 2"
                class="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div>
                  <label :for="`addRoleId${index}`">
                    <span class="block">Role:</span>
                    <input
                      type="text"
                      :name="`addRoleId${index}`"
                      :id="`addRoleId${index}`"
                      list="roleList"
                      v-model="action.options.roleId"
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
                  </label>
                  <small class="block">Select the role here.</small>
                </div>
              </div>
              <div
                v-if="action.buildingBlockType === 3"
                class="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div>
                  <label :for="`removeRoleId${index}`">
                    <span class="block">Role:</span>
                    <input
                      type="text"
                      :name="`removeRoleId${index}`"
                      :id="`removeRoleId${index}`"
                      list="roleList"
                      v-model="action.options.roleId"
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
                  </label>
                  <small class="block">Select the role here.</small>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div>
          <label :for="`checkType${index}`">
            <span class="block">Check type:</span>
            <select
              :name="`checkType${index}`"
              :id="`checkType${index}`"
              v-model="action.checkType"
              class="
                rounded-md
                shadow-md
                bg-gray-800
                text-white
                h-10
                p-2
                w-full
              "
            >
              <option :value="CheckType.NONE">None</option>
              <option :value="CheckType.REACTION_EMOJI">Reaction emoji</option>
            </select>
          </label>
          <small class="block"
            >Select the check type of this action here.</small
          >
        </div>
        <div v-if="action.checkType">
          <label :for="`checkValue${index}`">
            <span class="block">Check value:</span>
            <input
              type="text"
              :name="`checkValue${index}`"
              :id="`checkValue${index}`"
              v-model="action.checkValue"
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
          </label>
          <small class="block">Enter the value to check for here.</small>
        </div>
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

    <datalist id="sendMessageChannelList">
      <option v-for="guildChannel in guildChannels" :key="guildChannel.id">
        {{ guildChannel.name }}
      </option>
    </datalist>
    <datalist id="sendMessageMemberList">
      <option v-for="guildMember in guildMembers" :key="guildMember.userId">
        {{ guildMember.displayName }}
      </option>
    </datalist>
    <datalist id="roleList">
      <option v-for="guildRole in guildRoles" :key="guildRole.id">
        {{ guildRole.name }}
      </option>
    </datalist>
  </form>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TextInput from '@/components/forms/TextInput.vue';
import { showToast } from '@/common';
import DiscordData, {
  GuildChannels,
  GuildMembers,
  Guilds,
  Roles,
} from '@/services/DiscordData';
import BuildingBlockType from '@/types/BuildingBlockType';
import OnType from '@/types/OnType';
import CheckType from '@/types/CheckType';
import SendMessageTo from '@/types/SendMessageTo';

export type ReactionFlowCreateFormData = {
  guildName: string;
  channelName: string;
  name: string;
  description: string;
  messageText: string;
  reactions: string;
};

export type CommandFlowEntityCreateFormData = {
  // onType: number;
  // buildingBlockType: number;
  // options: string;
  // order: number;
  // checkType: number;
  // checkValue: string;
  onType: OnType;
  buildingBlockType: BuildingBlockType;
  options: {
    toType?: number;
    to?: string;
    messageFormat?: string;
    roleId?: string;
  };
  checkType?: CheckType;
  checkValue?: string;
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
    const guildMembers: Ref<GuildMembers> = ref([]);
    const guildRoles: Ref<Roles> = ref([]);
    const formData: Ref<ReactionFlowCreateFormData> = ref({
      guildName: '',
      channelName: '',
      name: '',
      description: '',
      messageText: '',
      reactions: '',
    });

    const actions: Ref<CommandFlowEntityCreateFormData[]> = ref([]);

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
      }
    };

    const loadMembers = async () => {
      try {
        const guild = guilds.value.find(
          (elem) => elem.name === formData.value.guildName,
        );

        if (!guild) throw new Error('Guild not found.');

        guildMembers.value = await DiscordData.getAllGuildMembers(guild.id);
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

    const loadRoles = async () => {
      try {
        const guild = guilds.value.find(
          (elem) => elem.name === formData.value.guildName,
        );

        if (!guild) throw new Error('Guild not found.');

        guildRoles.value = await DiscordData.getAllGuildRoles(guild.id);
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

    const loadGuildData = async () => {
      store.commit('setLoading', true);
      await Promise.all([loadChannels(), loadMembers(), loadRoles()]);
      store.commit('setLoading', false);
    };

    onMounted(async () => {
      await retrieveGuilds();
      store.commit('setLoading', false);
    });

    const addAction = () => {
      actions.value.push({
        onType: OnType.NONE,
        buildingBlockType: BuildingBlockType.NONE,
        options: {},
      });
    };

    const removeAction = (action: CommandFlowEntityCreateFormData) => {
      actions.value = actions.value.filter((elem) => elem !== action);
    };

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

        const actionBody: unknown[] = [];

        let actionIndex = 0;
        actions.value.forEach((action) => {
          const body = {
            onType: action.onType,
            buildingBlockType: action.buildingBlockType,
            options: action.options,
            order: actionIndex,
            checkType: action.checkType,
            checkValue: action.checkValue,
          };

          // Send message
          if (action.buildingBlockType === BuildingBlockType.SEND_MESSAGE) {
            if (action.options.toType === SendMessageTo.USER) {
              const messageUser = guildMembers.value.find(
                (elem) => elem.displayName === action.options.to,
              );

              if (!messageUser) throw new Error('User not found');
              body.options.to = messageUser.userId;
            }

            if (action.options.toType === SendMessageTo.CHANNEL) {
              const messageChannel = guildChannels.value.find(
                (elem) => elem.name === action.options.to,
              );

              if (!messageChannel) throw new Error('Channel not found');
              body.options.to = messageChannel.id;
            }
          }

          // Add/remove role
          if (
            action.buildingBlockType === BuildingBlockType.ADD_ROLE
            || action.buildingBlockType === BuildingBlockType.REMOVE_ROLE
          ) {
            const role = guildRoles.value.find(
              (elem) => elem.name === action.options.roleId,
            );

            if (!role) throw new Error('Role not found');
            body.options.roleId = role.id;
          }

          actionBody.push(body);
          actionIndex += 1;
        });

        const success = await DiscordData.createReactionCollector(
          1,
          guild.id,
          channel.id,
          name,
          description,
          messageText,
          reactionsList,
          actionBody,
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
      OnType,
      BuildingBlockType,
      CheckType,
      SendMessageTo,
      guilds,
      guildChannels,
      guildMembers,
      guildRoles,
      formData,
      actions,
      addAction,
      removeAction,
      loadGuildData,
      submitForm,
    };
  },
});
</script>
