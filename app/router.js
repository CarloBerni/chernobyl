import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Intro from './components/Intro.vue';
import Map from './components/Map.vue';
import Temoignage from './components/Temoignage.vue';
import Timeline from './components/Timeline.vue';



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
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
