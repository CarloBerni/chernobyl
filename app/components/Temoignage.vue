<template>
  <div class="big-container" id="app">
    <h1>{{info}}</h1>
    <br />
    <router-link class="button" to="/choix">suivant</router-link>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  el: '#app',
  data() {
    return {
      info: 'null',
      loading: true,
      errored: false
    }
  },
  mounted() {
    axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then( response => (this.info = response.data.bpi))
    .catch(error => console.log(error))
  }
};
</script>
