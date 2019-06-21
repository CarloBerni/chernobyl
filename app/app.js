import Vue from 'vue';
import router from './router';
import './assets/scss/styles.scss';
import VueFullPage from 'vue-fullpage.js'

new Vue({ router: router }).$mount('#root');

Vue.use(VueFullPage);

new Vue({
  render: h => h(App)
});



