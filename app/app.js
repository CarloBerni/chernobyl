import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
import router from './router';
import './assets/scss/styles.scss';


Vue.use(Carousel3d);

new Vue({ router: router }).$mount('#root');












