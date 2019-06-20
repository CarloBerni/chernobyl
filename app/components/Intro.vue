<template>
  <div class="big-header">
    <h1>{{message}} {{ count }}</h1>
    <br />
    <router-link class="button" to="/map">Go to Home</router-link>
  </div>
</template>

<script>
import countService from '../services/countService';

export default {
  data() {
    return {
      count: countService.value(),
      message: 'intro'
    }
  }
};
</script>
