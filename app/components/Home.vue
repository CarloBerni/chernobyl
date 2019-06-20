<template>
  <div class="big-container">
    <img src="../assets/images/TCHERNOBYL 1.png" alt="titre tchernobyl">
    <router-link class="button" to="/intro">Continue</router-link>
  </div>
</template>

<script>
import countService from '../services/countService';

export default {
  data() {
    return {
    };
  },
  methods: {
    handleClick() {
      countService.increment();
    }
  }
};
</script>

<style lang="scss" scoped>

.big-container {
  background: url('../assets/images/Pripyat__bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  img {
    height: 20%;
    width: 90%;
  }
}
</style>

