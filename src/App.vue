<template>
<v-app>
  <v-navigation-drawer app>1</v-navigation-drawer>
  <v-toolbar app>2</v-toolbar>
  <v-content>
    <v-container fluid>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            color="primary"
            dark
            v-on="on"
          >
           <v-icon dark>add</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in ComponentList"
            :key="index"
          >
            <v-list-tile-title @click="addSub">{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- <router-view></router-view> -->
    </v-container>
  </v-content>
  <v-footer app>3</v-footer>
</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { minxinObj } from './components/minxin-component/index'
import Viewer from './components/Viewer'

const ComponentList = [
  {
    name: 'test',
    component: HelloWorld,
    props: {
      msg: 'ss'
    },
    slots: ['default'],
    events: ['click']
  }
]

HelloWorld.mixins = [minxinObj]
export default {
  name: 'app',
  data () {
    return {
      ComponentList
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    addSub () {
      
    }
  },
  mounted () {
  }
}
</script>
