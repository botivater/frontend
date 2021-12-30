import store, { Toast } from './store';

export type ToastInput = {
  name: string;
  description?: string;
  time?: number;
  color?: string;
}

export const showToast = ({
  name, description, time, color,
}: ToastInput) => {
  const toast: Toast = {
    name,
    description,
    time: time || 3000,
    hide: false,
    color: color || 'blue',
  };
  store.commit('addToast', toast);
};

export default {
  showToast,
};
