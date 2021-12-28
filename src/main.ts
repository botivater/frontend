import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/tailwind.css';

library.add(faHome, faTachometerAlt);

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
