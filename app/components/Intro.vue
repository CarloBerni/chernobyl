<template>
  <div class="big-container">
    <h1>A travers ce web-documentaire vous allez pour retracer la première semaine de la catastrophe de tchernobyl à travers les différent témoignages des principaux acteurs qui ont oeuvrés a contenir la catastrophe.</h1>
    <br>
    <router-link class="button" to="/map">Se rendre à Pripyat</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: "intro"
    };
  }
};
</script>

<style lang="scss" scoped>
.big-container {
  background-color: black;
  h1 {
    color: white;
    font-size: 1.6em;
    margin-left: 200px;
    margin-right: 200px;
  }
}
</style>
