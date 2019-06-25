<template>
  <div class="big-container">
    <div class="container__button">
      <h1>Tchernobyl</h1>
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
  background: url("../assets/images/Pripyat__bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  img {
    height: 20%;
    width: 90%;
  }
}
.container__button {
  text-align: center;
  h1 {
    text-transform: uppercase;
    color: #A50104;
    font-weight: 900;
    font-size: 10em;
    opacity: 0.8;
    letter-spacing: 20px;
    font-family: "Typingrad";

  }
}
</style>

