<template>
  <div>
    <div class="section">
      <div class="section-title">Word Creation</div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'123'" v-model="wordCreation" placeholder="type single|multiple words which wanna be searched (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Wanna Search <label class="label-text"><input type="checkbox" name="case-sensitive" v-model="isCaseSensitive"> Case Sensitive</label></div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'123\n456\n789'" v-model="wannaSearch" placeholder="type single|multiple words you wanna search (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.use(require('../plugins/vue-default-value'))

const SPLIT_CHARACTER = '\n'

export default {
  name: 'main',
  data () {
    return {
      wordCreation: '',
      wannaSearch: '',
      isCaseSensitive: false
    }
  },
  computed: {
    computedWordCreation () {
      return this.wordCreation.indexOf(SPLIT_CHARACTER) >= 0 ? this.wordCreation.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wordCreation]
    },
    computedWannaSearch () {
      let wannaSearchArray = this.wannaSearch.indexOf(SPLIT_CHARACTER) >= 0 ? this.wannaSearch.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wannaSearch]

      return wannaSearchArray.map((value) => {
        return value.split('')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/main.less";
</style>