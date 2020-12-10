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
          <q-tr :props="props" style="text-align: center">
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
              {{ porcentaje(props.row.productBacklog) + '%' }}
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
      <h5 class="title">Informe Tablero KANBAN</h5>
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
          <q-tr :props="props" style="text-align: center">
            <q-td>
              {{ props.row.clave }}
            </q-td>
            <q-td>
              {{ props.row.productBacklog.length }}
            </q-td>
            <q-td>
              <div v-if="props.row.productBacklog.length > 0">
                <q-btn dense color="red" round class="q-ml-sm" title="Alta">
                  {{ getPrioridades(props.row.productBacklog)[0] }}
                </q-btn>
                <q-btn dense color="yellow-14" round class="q-ml-sm" title="Media">
                  {{ getPrioridades(props.row.productBacklog)[1] }}
                </q-btn>
                <q-btn dense color="green" round class="q-ml-sm" title="Baja">
                  {{ getPrioridades(props.row.productBacklog)[2] }}
                </q-btn>
              </div>
              <div v-else>
                <q-btn dense color="red" round class="q-ml-sm" title="Alta">
                  {{ 0 }}
                </q-btn>
                <q-btn dense color="yellow-14" round class="q-ml-sm" title="Media">
                  {{ 0 }}
                </q-btn>
                <q-btn dense color="green" round class="q-ml-sm" title="Baja">
                  {{ 0 }}
                </q-btn>
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.productBacklog.length > 0">
                <q-btn dense color="black" round class="q-ml-sm" title="Pendiente">
                  {{ getStatus(props.row.productBacklog)[0] }}
                </q-btn>
                <q-btn dense color="red" round class="q-ml-sm" title="Seleccionado">
                  {{ getStatus(props.row.productBacklog)[1] }}
                </q-btn>
                <q-btn dense color="yellow-14" round class="q-ml-sm" title="Proceso">
                  {{ getStatus(props.row.productBacklog)[2] }}
                </q-btn>
                <q-btn dense color="green" round class="q-ml-sm" title="Terminado">
                  {{ getStatus(props.row.productBacklog)[3] }}
                </q-btn>
              </div>
              <div v-else>
                <q-btn dense color="black" round class="q-ml-sm" title="Pendiente">
                  {{ 0 }}
                </q-btn>
                <q-btn dense color="red" round class="q-ml-sm" title="Seleccionado">
                  {{ 0 }}
                </q-btn>
                <q-btn dense color="yellow-14" round class="q-ml-sm" title="Proceso">
                  {{ 0 }}
                </q-btn>
                <q-btn dense color="green" round class="q-ml-sm" title="Terminado">
                  {{ 0 }}
                </q-btn>
              </div>
            </q-td>
            <q-td>
              {{ porcentaje(props.row.productBacklog) + '%' }}
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
          align: 'center',
          field: row => row.proyecto,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productBacklog',
          align: 'center',
          label: 'Product Backlog',
          field: 'productBacklog',
          sortable: true
        },
        {
          name: 'Status',
          align: 'center',
          label: 'Status',
          field: 'status',
          sortable: true
        },
        {
          name: 'porcentaje',
          align: 'center',
          label: 'Porcentaje',
          field: 'porcentaje',
          sortable: true
        },
        {
          name: 'productOwner',
          align: 'center',
          label: 'Product Owner',
          field: 'productOwner',
          sortable: true
        },
        {
          name: 'scrumMaster',
          align: 'center',
          label: 'Scrum Master',
          field: 'scrumMaster',
          sortable: true
        },
        {
          name: 'development',
          align: 'center',
          label: 'Development',
          field: 'development',
          sortable: true
        }
      ],
      data: [],
      columnsK: [
        {
          name: 'proyecto',
          align: 'center',
          label: 'Proyecto',
          field: 'proyecto',
          sortable: true
        },
        {
          name: 'productBacklog',
          align: 'center',
          label: 'Product Backlog',
          field: 'productBacklog',
          sortable: true
        },
        {
          name: 'prioridad',
          align: 'center',
          label: 'Prioridad',
          field: 'prioridad',
          sortable: true
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'status',
          sortable: true
        },
        {
          name: 'avance',
          align: 'center',
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
    },
    getPrioridades (productBacklog) {
      var altas = 0
      var medias = 0
      var bajas = 0
      productBacklog.forEach(element => {
        if (element.prioridad.idPrioridad === '1') {
          altas++
        } else if (element.prioridad.idPrioridad === '2') {
          medias++
        } else if (element.prioridad.idPrioridad === '3') {
          bajas++
        }
      })
      return Array.from([altas, medias, bajas])
    },
    getStatus (productBacklog) {
      var pendientes = 0
      var seleccionados = 0
      var procesos = 0
      var terminados = 0
      productBacklog.forEach(element => {
        if (element.status.idStatus === '1') {
          pendientes++
        } else if (element.status.idStatus === '2') {
          seleccionados++
        } else if (element.status.idStatus === '3') {
          procesos++
        } else if (element.status.idStatus === '4') {
          terminados++
        }
      })
      return Array.from([pendientes, seleccionados, procesos, terminados])
    }
  }
}
</script>
