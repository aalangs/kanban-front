<template>
  <div class="row">
    <div class="col-2 offset-xs-5">
      <h5 class="title">Informe Proyecto</h5>
    </div>
    <div class="q-pa-md col-12">
    <q-table
      class="my-sticky-column-table"
      color="primary"
      card-class="bg-teal-1 text-dark"
      table-class="text-grey-10"
      table-header-class="bg-teal-9 text-white"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              {{ props.row.clave }}
            </q-td>
            <q-td>
              {{ props.row.productBacklog.length }}
            </q-td>
            <q-td>
               <div v-if="props.row.status.status === 'Pendiente'">
                <q-badge color="black">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Seleccionado'">
                <q-badge color="red">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Proceso'">
                <q-badge color="yellow-9">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Terminado'">
                <q-badge color="green">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
            </q-td>
            <q-td>
              {{ porcentaje(props.row.productBacklog) }}
            </q-td>
            <q-td>
              <div v-if="props.row.members.length > 0">
                {{ getProductOwner(props.row.members) }}
              </div>
              <div v-else>
                {{ 'Sin asignar' }}
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.members.length > 0">
                {{ getScrumMaster(props.row.members) }}
              </div>
              <div v-else>
                {{ 'Sin asignar' }}
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.members.length > 0">
                {{ numDesarroladores(props.row.members) }}
              </div>
              <div v-else>
                {{ '0' }}
              </div>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>
  <div class="col-3 offset-xs-5">
      <h5 class="title">Informe Tablero KANVAN</h5>
    </div>
    <div class="q-pa-md col-12">
    <q-table
      class="my-sticky-column-table"
      color="primary"
      card-class="bg-teal-1 text-dark"
      table-class="text-grey-10"
      table-header-class="bg-teal-9 text-white"
      :data="dataK"
      :columns="columnsK"
      row-key="name"
    >
    <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              {{ props.row.clave }}
            </q-td>
            <q-td>
              {{ props.row.funcionalidad }}
            </q-td>
            <q-td>
              <!--<div v-if="props.row.productBacklog.prioridad.prioridad === 'Alta'">
                <q-badge color="red">
                  {{ props.row.productBacklog.prioridad.prioridad }}
                </q-badge>
              </div>
              <div v-else-if="props.row.productBacklog.prioridad.prioridad === 'Media'">
                <q-badge color="yellow-9">
                  {{ props.row.productBacklog.prioridad.prioridad }}
                </q-badge>
              </div>
              <div v-else-if="props.row.productBacklog.prioridad.prioridad === 'Baja'">
                <q-badge color="green">
                  {{ props.row.productBacklog.prioridad.prioridad }}
                </q-badge>
              </div>-->
            </q-td>
            <q-td>
              <div v-if="props.row.status.status === 'Pendiente'">
                <q-badge color="black">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Seleccionado'">
                <q-badge color="red">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Proceso'">
                <q-badge color="yellow-9">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Terminado'">
                <q-badge color="green">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.status.status === 'Pendiente'">
                <q-badge color="black">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Seleccionado'">
                <q-badge color="red">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Proceso'">
                <q-badge color="yellow-9">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
              <div v-else-if="props.row.status.status === 'Terminado'">
                <q-badge color="green">
                  {{ props.row.status.status }}
                </q-badge>
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.status.status === 'pk'">
                {{ props.row.productBacklog.miembro.nombre }}
              </div>
              <div v-else>
                {{ '' }}
              </div>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>
  </div>
</template>

<script>
import api from '../util/api'
export default {
  name: 'PageIndex',
  mounted () { this.consulta() },
  data () {
    return {
      proyecto: JSON.parse(localStorage.getItem('ProyectoSeleccionado')),
      columns: [
        {
          name: 'proyecto',
          label: 'Proyecto',
          align: 'left',
          field: row => row.proyecto,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productBacklog',
          align: 'left',
          label: 'Product Backlog',
          field: 'productBacklog',
          sortable: true
        },
        {
          name: 'Status',
          align: 'left',
          label: 'Status',
          field: 'status',
          sortable: true
        },
        {
          name: 'porcentaje',
          align: 'left',
          label: 'Porcentaje',
          field: 'porcentaje',
          sortable: true
        },
        {
          name: 'productOwner',
          align: 'left',
          label: 'Product Owner',
          field: 'productOwner',
          sortable: true
        },
        {
          name: 'scrumMaster',
          align: 'left',
          label: 'Scrum Master',
          field: 'scrumMaster',
          sortable: true
        },
        {
          name: 'development',
          align: 'left',
          label: 'Development',
          field: 'development',
          sortable: true
        }
      ],
      data: [],
      columnsK: [
        {
          name: 'num',
          label: '#',
          align: 'left',
          field: row => row.num,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'proyecto',
          align: 'left',
          label: 'Proyecto',
          field: 'proyecto',
          sortable: true
        },
        {
          name: 'productBacklog',
          align: 'left',
          label: 'Product Backlog',
          field: 'productBacklog',
          sortable: true
        },
        {
          name: 'prioridad',
          align: 'left',
          label: 'Prioridad',
          field: 'prioridad',
          sortable: true
        },
        {
          name: 'status',
          align: 'left',
          label: 'Status',
          field: 'status',
          sortable: true
        },
        {
          name: 'avance',
          align: 'left',
          label: 'Avance',
          field: 'avance',
          sortable: true
        }
      ],
      dataK: []
    }
  },
  methods: {
    consulta () {
      api.getAll('/kanban/proyecto/consulta').then(response => {
        console.log(response.data)
        this.data = response.data
        this.dataK = response.data
      })
    },
    porcentaje (productBacklog) {
      var terminados = 0
      productBacklog.forEach(element => {
        if (element.status.status === 'Terminado') {
          terminados++
        }
      })
      return parseFloat(100 / productBacklog.length * terminados).toFixed(2) !== 'NaN' ? parseFloat(100 / productBacklog.length * terminados).toFixed(2) : 0
    },
    numDesarroladores (members) {
      var desarolladores = 0
      members.forEach(element => {
        if (element.rol.nombreRol === 'Development') {
          desarolladores++
        }
      })
      return desarolladores
    },
    getProductOwner (members) {
      var productOwner = 'Sin Asignar'
      members.forEach(element => {
        if (element.rol.nombreRol === 'Product Owner') {
          productOwner = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        }
      })
      return productOwner
    },
    getScrumMaster (members) {
      var scrumMaster = 'Sin Asignar'
      members.forEach(element => {
        if (element.rol.nombreRol === 'Scrum Master') {
          scrumMaster = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        }
      })
      return scrumMaster
    }
  }
}
</script>
