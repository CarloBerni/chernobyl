import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Intro from './components/Intro.vue';
import Map from './components/Map.vue';
import Temoignage from './components/Temoignage.vue';



Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    },
    {
      path: '/temoignage/:id',
      name: 'temoignage',
      component: Temoignage,
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
