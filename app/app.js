import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
import router from './router';
import './assets/scss/styles.scss';


Vue.use(Carousel3d);

new Vue({ router: router }).$mount('#root');





var tl = new TimelineLite();
var lines = $('.lines');
for(var i =0; i < 10; i++) {
var fromY = (i%1==0) ? +50 :50;
tl.from(lines[i],1,{y:fromY, autoAlpha:0,ease:Power3.easeOut}, i*1)
};






