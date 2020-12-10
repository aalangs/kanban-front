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
              outlined disable bg-color="white"
              v-model="tproyecto"
              label="Proyecto"
            />
            <q-input
              outlined disable bg-color="white"
              v-model="tclave"
              label="Clave"
            />
            <q-input
              outlined disable bg-color="white"
              v-model="tproduct"
              label="Product Owner"
            />
            </div>
            <div class="row" style="justify-content: space-around;">
            <q-input
              outlined disable bg-color="white"
              v-model="tscrum"
              label="Scrum Master"
            />
            <q-input
              outlined disable bg-color="white"
              v-model="tstatus"
              label="Status"
            />
            <q-input
              outlined disable bg-color="white"
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
  mounted () { this.consulta() },
  data () {
    return {
      tproyecto: '',
      tclave: '',
      tscrum: 'Sin asignar',
      tproduct: 'Sin asignar',
      tstatus: '',
      tfechastatus: '',
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    consulta () {
      var proyecto = JSON.parse(localStorage.getItem('ProyectoSeleccionado'))
      console.log('Proyecto: ' + proyecto)
      proyecto.members.forEach(element => {
        if (element.rol.idRol === '1') {
          this.tproduct = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        } else if (element.rol.idRol === '2') {
          this.tscrum = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        }
      })
      this.tproyecto = proyecto.nombreProyeto
      this.tclave = proyecto.clave
      this.tstatus = proyecto.status.status
      this.tfechastatus = proyecto.fechaStatus
    }
  }
}
</script>
