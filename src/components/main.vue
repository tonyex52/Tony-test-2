<template>
  <div>
    <div class="section">
      <div class="section-title">Word Creation</div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="123" v-model="wordCreation" placeholder="type single|multiple words which wanna be searched (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Wanna Search</div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="123" v-model="wannaSearch" placeholder="type single|multiple words you wanna search (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.use(require('../plugins/vue-default-value'))

export default {
  name: 'main',
  data () {
    return {
      wordCreation: '',
      wannaSearch: ''
    }
  },
  computed: {
    computedwordCreation () {
      return this.wordCreation.indexOf('\n') >= 0 ? this.wordCreation.split('\n').filter((value) => value.length) : [this.wordCreation]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/main.less";
</style>