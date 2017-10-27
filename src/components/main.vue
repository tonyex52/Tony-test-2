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
      usedWannaSearch: [],
      isCaseSensitive: false,
      isInfiniteUse: false,
      isCharacterOrderSearch: false
    }
  },
  computed: {
    computedWordCreation () {
      let wordCreationArray = this.wordCreation.indexOf(SPLIT_CHARACTER) >= 0 ? this.wordCreation.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wordCreation]

      return wordCreationArray.map((value) => {
        let splitArray = value.split('')
        let notOrderObject = {}

        if (this.isCharacterOrderSearch) {
          return splitArray
        } else {
          splitArray.forEach((character) => {
            let convertCharacter = this.isCaseSensitive ? character : character.toLowerCase()

            if (notOrderObject.hasOwnProperty(convertCharacter)) {
              notOrderObject[convertCharacter]++
            } else {
              notOrderObject[convertCharacter] = 1
            }
          })
          return notOrderObject
        }
      })
    },
    wannaSearchArray () {
      return this.wannaSearch.indexOf(SPLIT_CHARACTER) >= 0 ? this.wannaSearch.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wannaSearch]
    },
    computedWannaSearch () {
      return this.wannaSearchArray.map((value) => {
        let splitArray = value.split('')
        let notOrderObject = {}

        if (this.isCharacterOrderSearch) {
          return splitArray
        } else {
          splitArray.forEach((character) => {
            let convertCharacter = this.isCaseSensitive ? character : character.toLowerCase()

            if (notOrderObject.hasOwnProperty(convertCharacter)) {
              notOrderObject[convertCharacter]++
            } else {
              notOrderObject[convertCharacter] = 1
            }
          })
          return notOrderObject
        }
      })
    },
    resultArray () {
      let computedResultArray = []
      // let usedWannaSearch = []

      this.computedWordCreation.forEach((item) => {
        computedResultArray.push(this._isMatchWord(item))
      })

      return computedResultArray
    }
  },
  methods: {
    _isMatchWord (wordItem) {
      let isMatch = true
      let matchStatus = 'FAIL'
      if (this.isCharacterOrderSearch) {

      } else {
        this.computedWannaSearch.forEach((searchItem, searchIndex) => {
          let searchItemString = this.wannaSearchArray[searchIndex]

          Object.keys(searchItem).map((key) => {
            if (wordItem.hasOwnProperty(key)) {
              if (wordItem[key] < searchItem[key]) {
                isMatch = false
              }
            } else {
              isMatch = false
            }
          })

          if (isMatch && !this.isInfiniteUse) {
            if (this.usedWannaSearch.indexOf(searchItemString) < 0) {
              matchStatus = 'OK'
              this.usedWannaSearch.push(searchItemString)
              return false
            } else {
              matchStatus = 'OVERLAP'
              isMatch = false
            }
          } else if (isMatch && this.isInfiniteUse) {
            matchStatus = 'OK'
            return false
          }
        })
      }

      return {isMatch, matchStatus}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/main.less";
</style>