<template>
  <div class="big-container">
    <div class="container__button">
      <video class="video" autoplay loop>
        <source src="../assets/images/Intro.mp4">
      </video>
      <router-link class="button" to="/intro">Commencer</router-link>
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
  video {
    width: 100%;
    height: 100%;
  }
}

</style>

