<template>
  <q-layout view="hhh LpR lFf">
    <q-header elevated style="background-color:#009574">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Proyecto Kanban
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menú
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="centrado">
      <router-view style="overflow:auto;" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

import EssentialLink from 'components/EssentialLink.vue'
import '../css/estilos.css'

const linksData = [
  {
    title: 'Proyecto',
    icon: 'folder',
    link: '/'
  },
  {
    title: 'Scrum Team',
    icon: 'group',
    link: '/scrumTeam'
  },
  {
    title: 'Product Backlog',
    icon: 'category',
    link: '/productBacklog'
  },
  {
    title: 'Tablero Kanban',
    icon: 'view_compact',
    link: '/index'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
