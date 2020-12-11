<template>
  <div class="row">
    <div class="q-pa-md col-12">
      <div class="row" style="justify-content: space-around;">
      <q-input
        readonly bg-color="white"
        v-model="headerProyecto"
        label="Proyecto"
        label-color="blue"
        title= "headerProyecto"
      />
      <q-input
        readonly bg-color="white"
        v-model="headerClave"
        label="Clave"
        label-color="blue"
      />
      <q-input
        readonly bg-color="white"
        v-model="headerProduct"
        label="Product Owner"
        label-color="blue"
      />
      <q-input
        readonly bg-color="white"
        v-model="headerScrum"
        label="Scrum Master"
        label-color="blue"
      />
      <q-input
        readonly bg-color="white"
        v-model="headerStatus"
        label="Status"
        label-color="blue"
      />
      <q-input
        readonly bg-color="white"
        v-model="headerFechaStatus"
        label="Fecha status"
        label-color="blue"
      />
      </div>
    </div>
      <div class="col-2 offset-xs-5" >
        <h5 class="title">Tablero Kanban</h5>
      </div>
      <div class="q-pa-md col-12">
        <q-table
        table-header-style="primary"
          class="my-sticky-column-table"
          :data="data"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                {{ props.rowIndex +=1 }}
              </q-td>
              <q-td>
                {{ props.row.funcionalidad }}
              </q-td>
              <q-td>
                <div v-if="props.row.prioridad.prioridad === 'Alta'">
                  <q-btn dense color="red" round class="q-ml-sm">
                  </q-btn>
                </div>
                <div v-else-if="props.row.prioridad.prioridad === 'Media'">
                  <q-btn dense color="yellow" round class="q-ml-sm">
                  </q-btn>
                </div>
                <div v-else-if="props.row.prioridad.prioridad === 'Baja'">
                  <q-btn dense color="green" round class="q-ml-sm">
                  </q-btn>
                </div>
              </q-td>
              <q-td>
                <div v-if="props.row.status.status === 'Pendiente'">
                  <q-btn dense color="black" round class="q-ml-sm">
                  </q-btn>
                </div>
                <div v-else-if="props.row.status.status === 'Seleccionado'">
                  <q-btn dense color="red" round class="q-ml-sm">
                  </q-btn>
                </div>
                <div v-else-if="props.row.status.status === 'Proceso'">
                  <q-btn dense color="yellow" round class="q-ml-sm">
                  </q-btn>
                </div>
                <div v-else-if="props.row.status.status === 'Terminado'">
                  <q-btn dense color="green" round class="q-ml-sm">
                  </q-btn>
                </div>
              </q-td>
              <q-td>
                {{ proyecto.fechaStatus }}
              </q-td>
              <q-td>
                {{ props.row.miembro.nombre }} {{ props.row.miembro.primerApellido }} {{ props.row.miembro.segundoApellido }}
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
  mounted () { this.consulta() },
  data () {
    return {
      proyecto: JSON.parse(localStorage.getItem('ProyectoSeleccionado')),
      data: [],
      columns: [
        {
          name: 'numero',
          label: '#',
          align: 'left',
          field: row => row.numero,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productBacklog',
          align: 'left',
          label: 'Product Backlog',
          field: 'product Backlog',
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
          name: 'fechaStatus',
          align: 'left',
          label: 'Fecha Status',
          field: 'fechaStatus',
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
      headerProyecto: '',
      headerClave: '',
      headerScrum: '',
      headerProduct: '',
      headerStatus: '',
      headerFechaStatus: ''
    }
  },
  methods: {
    consulta () {
      api.getOne('/kanban/proyecto/one/' + this.proyecto.clave).then(response => {
        this.data = response.data.productBacklog
        console.log(this.data)
        this.cambiarDatosHeader(response.data)
      })
    },
    cambiarDatosHeader (proyecto) {
      this.headerProduct = 'Sin asignar'
      this.headerScrum = 'Sin asignar'
      proyecto.members.forEach(element => {
        if (element.rol.idRol === '1') {
          this.headerProduct = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        } else if (element.rol.idRol === '2') {
          this.headerScrum = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        }
      })
      this.headerProyecto = proyecto.nombreProyeto
      this.headerClave = proyecto.clave
      this.headerStatus = proyecto.status.status
      this.headerFechaStatus = proyecto.fechaStatus
    },
    onReset () {
      this.proyecto = null
      this.clave = null
      this.fechaInicio = null
      this.fechaFin = null
      this.status = null
      this.accept = false
    },
    onSubmit () {
      this.proyecto = null
      this.clave = null
      this.fechaInicio = null
      this.fechaFin = null
      this.status = null
      this.accept = false
    }
  }
}
</script>
