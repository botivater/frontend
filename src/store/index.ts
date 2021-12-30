/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from 'vuex';

export type Toast = {
  name: string;
  description?: string;
  time: number;
  color: string;
  hide: boolean;
}

export type Toasts = Toast[];

export type State = {
  sidebar: boolean;
  toasts: Toasts;
}

export default createStore<State>({
  state(): State {
    return {
      sidebar: true,
      toasts: [],
    };
  },
  getters: {
    getSidebar: (state) => () => state.sidebar,
    getToasts: (state) => () => state.toasts,
  },
  mutations: {
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
  actions: {},
});
