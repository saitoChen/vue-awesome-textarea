<script>
import Vue from 'vue';
import VueAwesomeTextarea from '@/vue-awesome-textarea.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueAwesomeTextarea
  }
});
</script>

<template>
  <div id="app">
    <vue-awesome-textarea />
  </div>
</template>
