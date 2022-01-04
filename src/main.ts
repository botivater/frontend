import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faEye,
  faHeadset,
  faHeart,
  faHome,
  faSignOutAlt,
  faTachometerAlt,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/tailwind.css';

library.add(faHome, faTachometerAlt, faHeadset, faBars, faHeart, faSignOutAlt, faEye, faTerminal);

createApp(App)
  .use(store)
  .use(router)
  .use(() => {
    document.title = process.env.VUE_APP_NAME;
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
