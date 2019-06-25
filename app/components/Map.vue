<template>
  <div class="big-container">
    <h1>{{message}}</h1>
    <br />
    <router-link class="button" to="/temoignage/1">suivant</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: 'map'

    }
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
}


</style>

