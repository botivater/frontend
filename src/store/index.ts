/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from 'vuex';
import auth from '@/auth';

export type Toast = {
  name: string;
  description?: string;
  time: number;
  color: string;
  hide: boolean;
}

export type Toasts = Toast[];

export type State = {
  authenticated: boolean;
  loading: boolean;
  sidebar: boolean;
  toasts: Toasts;
}

export default createStore<State>({
  state(): State {
    return {
      authenticated: false,
      loading: false,
      sidebar: true,
      toasts: [],
    };
  },
  getters: {
    getAuthenticated: (state) => () => state.authenticated,
    getLoading: (state) => () => state.loading,
    getSidebar: (state) => () => state.sidebar,
    getToasts: (state) => () => state.toasts,
  },
  mutations: {
    setAuthenticated(state, value: boolean) {
      state.authenticated = value;
    },
    setLoading(state, value: boolean) {
      state.loading = value;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    addToast(state, toast: Toast) {
      state.toasts.push(toast);

      const hideToast = () => {
        // @ts-ignore
        this.commit('hideToast', toast);
      };

      setTimeout(hideToast.bind(this), toast.time);
    },
    hideToast(state, toast: Toast) {
      const index = state.toasts.indexOf(toast);
      state.toasts[index].hide = true;

      const removeToast = () => {
        // @ts-ignore
        this.commit('removeToast', toast);
      };

      setTimeout(removeToast.bind(this), 1000);
    },
    removeToast(state, toast: Toast) {
      const index = state.toasts.indexOf(toast);
      if (index > -1) {
        state.toasts.splice(index, 1);
      }
    },
  },
  actions: {
    async fetchAuthenticated({ commit }) {
      const authenticated = await auth.isAuthenticated();

      commit('setAuthenticated', authenticated);
    },
  },
});
