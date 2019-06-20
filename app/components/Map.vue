<template>
  <div class="big-container">
    <h1>{{message}} {{ count }}</h1>
    <br />
    <router-link class="button" to="/temoignage/:id">suivant</router-link>
  </div>
</template>

<script>
import countService from '../services/countService';

export default {
  data() {
    return {
      count: countService.value(),
      message: 'map'

    }
  }
};
</script>
