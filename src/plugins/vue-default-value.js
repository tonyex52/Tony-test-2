module.exports = {
  install (Vue, options) {
    Vue.directive('default-value', {
      bind (el, binding, vnode, oldVnode) {
        var model = vnode.data.directives.filter(dir => dir.rawName === 'v-model' && dir.expression.length)
        if (!model.length) {
          console.error('[v-default-value warn] The element does not have v-model')
          return
        }
        vnode.context[model[0].expression] = binding.value
      }
    })
  }
}
