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

        <div class="q-pa-md col-6">
      <q-form class="q-gutter-md">
            <div class="row" style="justify-content: space-around;">
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tproyecto"
              label="Proyecto"
            />
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tclave"
              label="Clave"
            />
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tproduct"
              label="Product Owner"
            />
            </div>
            <div class="row" style="justify-content: space-around;">
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tscrum"
              label="Scrum Master"
            />
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tstatus"
              label="Status"
            />
            <q-input
              rounded outlined disable bg-color="white"
              v-model="tfechastatus"
              label="Fecha status"
            />
            </div>
          </q-form>
    </div>
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
    icon: 'school',
    link: '/proyecto'
  },
  {
    title: 'Scrum Team',
    icon: 'code',
    link: '/scrumTeam'
  },
  {
    title: 'Product Backlog',
    icon: 'chat',
    link: '/productBacklog'
  },
  {
    title: 'Tablero Kanban',
    icon: 'record_voice_over',
    link: '/index'
  },
  {
    title: 'Informes',
    icon: 'rss_feed',
    link: '/informes'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  mounted () { this.consulta() },
  data () {
    return {
      tproyecto: 'SISA',
      tclave: 'SISA',
      tscrum: 'Sin asignar',
      tproduct: 'Sin asignar',
      tstatus: 'Pendiente',
      tfechastatus: '18/08/2020',
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    async consulta () {
      var proyecto = await JSON.parse(localStorage.getItem('ProyectoSeleccionado'))
      console.log('Proyecto: ' + proyecto)
      this.tproyecto = proyecto.nombreProyeto
      this.tclave = proyecto.clave
      this.tstatus = proyecto.status.status
      this.tfechastatus = proyecto.fechaStatus
    }
  }
}
</script>
