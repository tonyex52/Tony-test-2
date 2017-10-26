<template>
  <div class="grid-container">
    <div class="word-creation">
      <div class="section-title">Word Creation</div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'ASADB\nABCCED\nABCF'" v-model="wordCreation" placeholder="type single|multiple words which wanna be searched (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="wanna-search">
      <div class="section-title">Wanna Search</div>
      <div class="section-checkbox">
        <label class="label-text"><input type="checkbox" name="case-sensitive" v-model="isCaseSensitive">Case Sensitive</label>
        <label class="label-text"><input type="checkbox" name="infinite-use" v-model="isInfiniteUse">Infinite Use</label>
        <label class="label-text"><input type="checkbox" name="character-order-search" v-model="isCharacterOrderSearch">Character Order Search</label>
      </div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'ABCE\nSFCS\nADEE'" v-model="wannaSearch" placeholder="type single|multiple words you wanna search (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="result">
      <div class="section-title">result</div>
      <div class="section-content">

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
      isCaseSensitive: false,
      isInfiniteUse: false,
      isCharacterOrderSearch: false
    }
  },
  computed: {
    computedWordCreation () {
      let wordCreationArray = this.wordCreation.indexOf(SPLIT_CHARACTER) >= 0 ? this.wordCreation.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wordCreation]

      return this.isCharacterOrderSearch ? wordCreationArray.map((value) => {
        return value.split('')
      }) : wordCreationArray
    },
    computedWannaSearch () {
      let wannaSearchArray = this.wannaSearch.indexOf(SPLIT_CHARACTER) >= 0 ? this.wannaSearch.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wannaSearch]

      return this.isCharacterOrderSearch ? wannaSearchArray.map((value) => {
        return value.split('')
      }) : wannaSearchArray
    },
    resultArray () {
      // let computedResultArray = []
      // let usedWannaSearch = []

      this.computedWordCreation.forEach((value) => {
        // let computedWordItem = ''

        // if (!this.isCaseSensitive) computedWordItem = value.toLowerCase()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/main.less";
</style>