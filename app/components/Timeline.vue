<template>
  <div class="big-container">
    <h1>{{message}} </h1>
    <br />
    <router-link class="button" to="/">suivant</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: 'timeline'

    }
  }
};
</script>
