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
        <template v-for="item in resultArray">
          <p>
            {{ item.wordItemName }} {{ item.status }} {{ item.matchWhich }}
          </p>
        </template>
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
    wordCreationArray () {
      return this.wordCreation.indexOf(SPLIT_CHARACTER) >= 0 ? this.wordCreation.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wordCreation]
    },
    wordCreationArrayInCase () {
      return this.wordCreationArray.map((value) => this.isCaseSensitive ? value : value.toLowerCase())
    },
    computedWordCreation () {
      return this.wordCreationArrayInCase.map((value) => {
        let splitArray = value.split('')
        let notOrderObject = {}

        if (this.isCharacterOrderSearch) {
          return splitArray
        } else {
          splitArray.forEach((character) => {
            if (notOrderObject.hasOwnProperty(character)) {
              notOrderObject[character]++
            } else {
              notOrderObject[character] = 1
            }
          })
          return notOrderObject
        }
      })
    },
    wannaSearchArray () {
      return this.wannaSearch.indexOf(SPLIT_CHARACTER) >= 0 ? this.wannaSearch.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wannaSearch]
    },
    wannaSearchArrayInCase () {
      return this.wannaSearchArray.map((value) => this.isCaseSensitive ? value : value.toLowerCase())
    },
    computedWannaSearch () {
      return this.wannaSearchArrayInCase.map((value) => {
        let splitArray = value.split('')
        let notOrderObject = {}

        if (this.isCharacterOrderSearch) {
          return splitArray
        } else {
          splitArray.forEach((character) => {
            if (notOrderObject.hasOwnProperty(character)) {
              notOrderObject[character]++
            } else {
              notOrderObject[character] = 1
            }
          })
          return notOrderObject
        }
      })
    },
    resultArray () {
      let computedResultArray = []
      let remainSearchArray = [].concat(this.wannaSearchArray)

      this.computedWordCreation.forEach((wordItem, wordIndex) => {
        let wordItemName = this.wordCreationArray[wordIndex]
        let isMatch = false
        let status
        let matchWhich = ''

        this.computedWannaSearch.some((searchItem, searchIndex) => {
          if (this._isMatchWord(wordItem, searchItem)) {
            let searchItemName = this.wannaSearchArray[searchIndex]
            matchWhich = searchItemName

            if (this.isInfiniteUse) {
              isMatch = true
              status = 'OK'
              return true
            } else {
              let remainSearchIndex = remainSearchArray.indexOf(searchItemName)

              if (remainSearchIndex >= 0) {
                isMatch = true
                status = 'OK'
                remainSearchArray.splice(remainSearchIndex, 1)
                return true
              } else {
                isMatch = true
                status = 'OVERLAP'
              }
            }
          } else if (status !== 'OVERLAP') {
            isMatch = false
            status = 'FAIL'
            matchWhich = ''
          }
        })
        computedResultArray.push({wordItemName, isMatch, status, matchWhich})
      })

      return computedResultArray
    }
  },
  methods: {
    _isMatchWord (wordItem, searchItem) {
      let isMatch = true

      if (this.isCharacterOrderSearch) {

      } else {
        Object.keys(searchItem).map((key) => {
          if (wordItem.hasOwnProperty(key)) {
            if (wordItem[key] < searchItem[key]) {
              isMatch = false
              return false
            }
          } else {
            isMatch = false
            return false
          }
        })
      }

      return isMatch
    }
  },
  watch: {
    isInfiniteUse: {
      immediate: true,
      handler (val) {
        if (val) {
          this.usedWannaSearch = {}
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/reset.less";
  @import "../less/main.less";
</style>