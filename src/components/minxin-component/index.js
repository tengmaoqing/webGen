import Menu from './context-menu'
// import Vuetify from 'vuetify'
import Vue from 'vue'

const startMenu = () => {
  if (startMenu.$instance) {
    startMenu.$instance.show = true
    return
  }

  const div = document.createElement('div')
  const vueComponent = Vue.extend(Menu)
  const menuVm = new vueComponent()

  startMenu.$instance = menuVm
  menuVm.show = true
  document.body.append(div)
  menuVm.$mount(div)
}

export const minxinObj = {
  beforeDestroy () {
    this.$el.removeEventListener('contextmenu', this.contextListener)
    this.$el.removeEventListener('mouseenter', this.mouseEnterListener)
    this.$el.removeEventListener('mouseout', this.mouseOutListener)
  },
  mounted () {
    this.mouseEnterListener = this.$el.addEventListener('mouseenter', (ev) => {
      this.$el.classList.add('minxin-$-hover')
      ev.stopPropagation()
      return false
    })
    this.mouseOutListener = this.$el.addEventListener('mouseout', (ev) => {
      this.$el.classList.remove('minxin-$-hover')
      ev.stopPropagation()
      return false
    })
    this.contextListener = this.$el.addEventListener('contextmenu', (ev) => {
      startMenu()
      ev.preventDefault()
      ev.stopPropagation()
      return false
    })
  },
}

// export const minxinComponent = (Component) => {
//   if (Component.minxins) {
//     Component.minxins.push(mC)
//   } else {
//     Component.minxins = [mC]
//   }
//   Vue.extend(Component)
// }
