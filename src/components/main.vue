<template>
  <div class="grid-container">
    <div class="word-creation">
      <div class="section-title">Context Map</div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'A B C E\nS F C S\nA D E E'" v-model="contextMap" placeholder="type single|multiple words which wanna be searched (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="wanna-search">
      <div class="section-title">What Word You Want To Search</div>
      <div class="section-checkbox">
        <label class="label-text"><input type="checkbox" name="case-sensitive" v-model="isCaseSensitive">Case Sensitive</label>
        <label class="label-text"><input type="checkbox" name="infinite-use" v-model="isInfiniteUse">Infinite Use</label>
      </div>
      <div class="section-content">
        <textarea class="type-area" v-default-value="'ASADB\nABCCED\nABCF'" v-model="wannaSearch" placeholder="type single|multiple words you wanna search (make sure that you use the LF between words)"></textarea>
      </div>
    </div>
    <div class="result">
      <div class="section-title">result
        <span>
          <div class="section-sub-title">Match: <span class="icon main-icon-ok icon-small"></span></div>
          <div class="section-sub-title">Overlap: <span class="icon main-icon-overlap icon-small"></span></div>
          <div class="section-sub-title">Fail: <span class="icon main-icon-fail icon-small"></span></div>
        </span>
      </div>
      <div class="section-content">
        <div class="flexbox">
          <span class="flex-1">Context</span>
          <span class="flex-1">Status</span>
        </div>
        <template v-for="item in resultArray">
          <div class="flexbox">
            <span class="flex-1">{{ item.searchItemName }}</span>
            <span class="flex-1">
              <span class="icon"
                :class="{
                  'main-icon-ok': item.status === 'OK',
                  'main-icon-overlap': item.status === 'OVERLAP',
                  'main-icon-fail': item.status === 'FAIL'
                }">
              </span>
            </span>
          </div>
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
      contextMap: '',
      wannaSearch: '',
      isCaseSensitive: false,
      isInfiniteUse: false
    }
  },
  computed: {
    contextMapArray () {
      return this.contextMap.indexOf(SPLIT_CHARACTER) >= 0 ? this.contextMap.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.contextMap]
    },
    contextMapArrayInCase () {
      return this.contextMapArray.map((value) => this.isCaseSensitive ? value : value.toLowerCase())
    },
    computedContextMap () {
      return this.contextMapArrayInCase.map((line) => {
        return line.split(' ')
      })
    },
    wannaSearchArray () {
      return this.wannaSearch.indexOf(SPLIT_CHARACTER) >= 0 ? this.wannaSearch.split(SPLIT_CHARACTER).filter((value) => value.length) : [this.wannaSearch]
    },
    wannaSearchArrayInCase () {
      return this.wannaSearchArray.map((value) => this.isCaseSensitive ? value : value.toLowerCase())
    },
    computedWannaSearch () {
      return this.wannaSearchArrayInCase.map((line) => {
        return line.split('')
      })
    },
    tranceArrayStructure () {
      let structure = []

      this.computedContextMap.forEach((line) => {
        structure.push(line.map(() => false))
      })
      return structure
    },
    resultArray () {
      let computedResultArray = []

      this.computedWannaSearch.forEach((searchItem, searchIndex) => {
        let startPosition = this._findFirstCharacter(searchItem[0])
        let status

        if (startPosition.length > 0) {
          startPosition.some((position) => {
            let statusTemp = this._isMatchWord(searchItem, position)

            if (statusTemp === 'OK') {
              status = statusTemp
              return true
            } else if (statusTemp === 'OVERLAP') {
              status = statusTemp
            } else if (status !== 'OVERLAP' && statusTemp === 'FAIL') {
              status = statusTemp
            }
          })

          computedResultArray.push({
            'searchItemName': this.wannaSearchArray[searchIndex],
            'status': status
          })
        } else {
          computedResultArray.push({
            'searchItemName': this.wannaSearchArray[searchIndex],
            'status': 'FAIL'
          })
        }
      })

      return computedResultArray
    }
  },
  methods: {
    _findFirstCharacter (firstCharacter) {
      let computed = []

      this.computedContextMap.forEach((line, lineIndex) => {
        line.forEach((character, characterIndex) => {
          if (character === firstCharacter) {
            computed.push({x: lineIndex, y: characterIndex})
          }
        })
      })

      return computed
    },
    _isMatchWord (searchItem, positionObj) {
      let status
      let searchItemLength = searchItem.length
      let traceArray = [].concat(this.tranceArrayStructure)

      /**
       * DFS
       * @param {Object} nowPosition 前一個match searchCharacter的MAP位置
       * @param {Number} searchIndex 要檢查searchCharacter的index
       * @param {[type]} traceArray  檢查重複
       */
      function DFS (nowPosition, searchIndex, traceArray) {
        let top = (nowPosition.x - 1) >= 0 ? {x: nowPosition.x - 1, y: nowPosition.y} : {}
        let right = (this.computedContextMap[(nowPosition.x)][nowPosition.y + 1] !== undefined) ? {x: nowPosition.x, y: nowPosition.y + 1} : {}
        let down = (this.computedContextMap[(nowPosition.x + 1)] !== undefined) ? {x: nowPosition.x + 1, y: nowPosition.y} : {}
        let left = (nowPosition.y - 1) >= 0 ? {x: nowPosition.x, y: nowPosition.y - 1} : {}

        if (Object.keys(top).length && this.computedContextMap[top.x][top.y] === searchItem[searchIndex]) {
          let traceArrayTemp = [].concat(traceArray)

          if (!this.isInfiniteUse) {
            if (traceArray[top.x][top.y]) {
              status = 'OVERLAP'
            } else {
              traceArrayTemp[top.x][top.y] = true
            }
          }
          if ((searchItemLength - 1) === searchIndex)
        }
      }

      DFS(positionObj, 1, traceArray)

      return status
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../less/reset.less";
  @import "../less/main.less";
</style>