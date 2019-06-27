<template>
  <div class="big-container">
    <div class="container">
      <section
        class="section__1"
        v-bind:style="{ backgroundImage: 'url(' + step.background__1 + ')' }"
      >
        <div class="container__text">
          <h1 class="texte__title__left " v-if="$route.params.id">{{step.title}}</h1>
          <h2 v-if="$route.params.id">{{step.profession}}</h2>
          <p class="big__texte " v-if="$route.params.id">{{step.texte__1}}</p>
          <p class="big__texte " v-if="$route.params.id">{{step.texte__2}}</p>
          <p class="big__texte " v-if="$route.params.id">{{step.texte__3}}</p>
        </div>
      </section>
      <section class="section__2">
        <video class="video" autoplay muted loop>
          <source v-bind:src="step.video__1">
        </video>
      </section>
      <section
        class="section__3"
        v-bind:style="{ backgroundImage: 'url(' + step.background__2 + ')' }"
      >
        <div class="container__text">
          <h1 class="texte__title__right " v-if="$route.params.id">{{step.sentence__1}}</h1>
          <p  v-if="$route.params.id">{{step.sentence__2}}</p>
          <p  v-if="$route.params.id">
            <span>{{step.sentence__3}}</span>
            {{step.sentence__4}}
          </p>
          <p  v-if="$route.params.id">{{step.sentence__5}}</p>
        </div>
      </section>
      <section
        class="section__4"
        v-bind:style="{ backgroundImage: 'url(' + step.background__slider + ')' }"
      >
        <carousel-3d style="margin-top: 90px;" :width="1200" :height="800">
          <slide :index="0">
            <img class="image__slider" v-bind:src="step.image__slider">
          </slide>
          <slide :index="1">
            <img class="image__slider" v-bind:src="step.image__slider__2">
          </slide>
          <slide :index="2">
            <img class="image__slider" v-bind:src="step.image__slider__3">
          </slide>
          <slide :index="3">
            <img class="image__slider" v-bind:src="step.image__slider__4">
          </slide>
          <slide :index="4">
            <img class="image__slider" v-bind:src="step.image__slider__5">
          </slide>
        </carousel-3d>
      </section>
      <section
        class="section__5"
        v-bind:style="{ backgroundImage: 'url(' + step.background__3 + ')' }"
      >
        <div class="container__text">
          <p class="big__texte " v-if="$route.params.id">{{step.sentence__6}}</p>
          <p class="big__texte " v-if="$route.params.id">{{step.sentence__7}}</p>
        </div>
      </section>
      <section class="section__6">
        <video class="video" autoplay loop>
          <source v-bind:src="step.video__2">
        </video>
        <div class="buttons">
          <router-link class="button" to="/map">Map</router-link>
          <router-link class="button" to="/map">Map</router-link>
          <router-link class="button" to="/map">Map</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import game from "../data.js";

export default {
  data() {
    return {
      step: this.getStep()
    };
  },
  watch: {
    "$route.params.id"(to, from) {
      this.step = this.getStep();
    }
  },
  methods: {
    getStep() {
      return game.steps.find(step => {
        return step.id === parseInt(this.$route.params.id, 10);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.big-container {
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(100vh);
  overflow-y: scroll;
  height: 100vh;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .section__1 {
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .container__text {
      display: flex;
      flex-direction: column;
      margin-left: 150px;
      margin-top: 100px;
      margin-right: 780px;
      .texte__title__left {
        color: #a50104;
        font-size: 64px;
        font-weight: bold;
        letter-spacing: 0.05em;
        margin: 20px;
      }
      h2 {
        margin: 20px;
        color: white;
        font-size: 30px;
        letter-spacing: 0.05em;
        font-weight: bold;
      }
      .big__texte {
        font-size: 22px;
        line-height: 29px;
        color: white;
        letter-spacing: 0.05em;
        margin: 20px;
      }
    }
  }
  .section__2 {
    height: 100vh;
    width: 100vw;
    background-color: black;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .video {
      width: 100vw;
      height: 100vh;
    }
  }
  .section__3 {
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .container__text {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin-right: 75px;
      margin-top: 180px;
      margin-left: 780px;
      .texte__title__right {
        color: #a50104;
        font-size: 22px;
        letter-spacing: 0.05em;
        margin: 30px;
      }
      p {
        margin: 30px;
        color: white;
        font-size: 22px;
        letter-spacing: 0.05em;
        span {
          font-weight: bold;
          font-style: italic;
        }
      }
    }
  }
  .section__4 {
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .image__slider {
      height: 100%;
      width: 100%;
    }
    .carousel-3d-container {
      .carousel-3d-slide {
        padding: 10px;
      }
    }
  }
  .section__5 {
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .container__text {
      display: flex;
      flex-direction: column;
      margin-left: 150px;
      margin-top: 250px;
      margin-right: 790px;
      .big__texte {
        color: white;
        letter-spacing: 0.05em;
        margin: 20px;
        font-size: 22px;
        line-height: 29px;
      }
    }
  }
  .section__6 {
    height: 100vh;
    width: 100vw;
    background-color: black;
    position: sticky;
    top: 0px;
    scroll-snap-align: center;
    .video {
      width: 100vw;
      height: 100vh;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .button {
        margin: 20px;
      }
    }
  }
}
</style>

