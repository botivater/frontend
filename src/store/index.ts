/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      sidebar: true,
      guilds: [],
      guildChannels: [],
      guildChannelsText: [],
      guildMembers: [],
    };
  },
  getters: {
    // @ts-ignore
    getSidebar: (state) => () => state.sidebar,
    // @ts-ignore
    getGuilds: (state) => () => state.guilds,
    // @ts-ignore
    getGuildChannels: (state) => () => state.guildChannels,
    // @ts-ignore
    getGuildChannelsText: (state) => () => state.guildChannelsText,
    // @ts-ignore
    getGuildMembers: (state) => () => state.guildMembers,
  },
  mutations: {
    toggleSidebar(state) {
      // @ts-ignore
      state.sidebar = !state.sidebar;
    },
    setGuilds(state, guilds) {
      // @ts-ignore
      state.guilds = guilds;
    },
    setGuildChannels(state, guildChannels) {
      // @ts-ignore
      state.guildChannels = guildChannels;
    },
    setGuildChannelsText(state, guildChannelsText) {
      // @ts-ignore
      state.guildChannelsText = guildChannelsText;
    },
    setGuildMembers(state, guildMembers) {
      // @ts-ignore
      state.guildMembers = guildMembers;
    },
  },
  actions: {
    async fetchAllGuilds({ commit }) {
      const response = await fetch('http://192.168.178.66:3000/api/discord/guilds').then((res) => res.json());
      commit('setGuilds', response.data);
    },
    async fetchGuildChannels({ commit }, id) {
      const response = await fetch(`http://192.168.178.66:3000/api/discord/guilds/${id}/channels`).then((res) => res.json());
      commit('setGuildChannels', response.data);
    },
    async fetchGuildChannelsText({ commit }, id) {
      const response = await fetch(`http://192.168.178.66:3000/api/discord/guilds/${id}/channels?type=text`).then((res) => res.json());
      commit('setGuildChannelsText', response.data);
    },
    async fetchGuildMembers({ commit }, id) {
      const response = await fetch(`http://192.168.178.66:3000/api/discord/guilds/${id}/members`).then((res) => res.json());
      commit('setGuildMembers', response.data);
    },
  },
});
