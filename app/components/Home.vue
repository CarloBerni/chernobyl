<template>
  <div class="big-container video__container">
    <div class="container__button">
      <video class="video" autoplay loop>
        <source src="../assets/images/Intro.mp4">
      </video>
      <router-link class="button button--home" to="/intro">Commencer</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.big-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  .video {
    width: 100%;
    height: 100%;
  }
}

.video__container {
  background-color: black;

}

.button--home {
  position: absolute;
  top: 65vh;
  width: 98px;
  left: calc(50vw - 69px);
}

.container__button {
  background-color: black;
}

</style>

