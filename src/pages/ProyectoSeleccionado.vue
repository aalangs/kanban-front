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
    <div class="col-2 offset-xs-5">
      <h5 class="title">Proyectos</h5>
    </div>

    <div class="q-pa-md col-12">
    <q-table
      class="my-sticky-column-table"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.row.nombreProyeto }}
          </q-td>
          <q-td>
            {{ props.row.clave }}
          </q-td>
          <q-td>
            {{ props.row.fechaInicio }}
          </q-td>
          <q-td>
            {{ props.row.fechaFin }}
          </q-td>
          <q-td>
            {{ props.row.fechaStatus }}
          </q-td>
          <q-td>
            {{ props.row.status.status }}
          </q-td>
          <q-td>
            <q-btn unelevated size="sm" color="secondary" @click.native="seleccionarProyecto(props.row)"><font-awesome-icon icon="mouse-pointer" /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>

    <div class="q-pa-md col-12">
      <!--<q-btn label="Registrar" type="submit" color="primary" style="margin:10px" @click="modalRegistrarProyecto = true" />-->
      <!--<q-btn label="Editar" type="submit" color="info" @click="modalActualizarProyecto = true" />
      <q-btn label="CONSULTAR" type="submit" color="primary" style="margin:10px" @click="consulta" />-->
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
          label: 'Nombre Proyecto',
          align: 'left',
          field: 'nombreProyeto',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'clave',
          align: 'left',
          label: 'Clave',
          field: 'clave',
          sortable: true
        },
        {
          name: 'fechaInicio',
          align: 'left',
          label: 'Fecha de Inicio',
          field: 'fechaInicio',
          sortable: true
        },
        {
          name: 'fechaFin',
          align: 'left',
          label: 'Fecha de Fin',
          field: 'fechaFin',
          sortable: true
        },
        {
          name: 'FechaStatus',
          align: 'left',
          label: 'FechaStatus',
          field: 'fechaStatus',
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
          name: 'Seleccionar',
          align: 'left',
          label: 'Seleccionar',
          field: 'seleccionar',
          sortable: false
        }
      ],
      data: [],
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
      api.getAll('/kanban/proyecto/consulta').then(response => {
        this.data = response.data
        console.log(this.data)
        this.cambiarDatosHeader(this.proyecto)
      })
    },
    cambiarDatosHeader (proyecto) {
      this.headerProduct = 'Sin asignar'
      this.headerScrum = 'Sin asignar'
      this.proyecto.members.forEach(element => {
        if (element.rol.idRol === '1') {
          this.headerProduct = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        } else if (element.rol.idRol === '2') {
          this.headerScrum = element.nombre + ' ' + element.primerApellido + ' ' + element.segundoApellido
        }
      })
      this.headerProyecto = this.proyecto.nombreProyeto
      this.headerClave = this.proyecto.clave
      this.headerStatus = this.proyecto.status.status
      this.headerFechaStatus = this.proyecto.fechaStatus
    },
    seleccionarProyecto (proyecto) {
      console.log(proyecto)
      this.proyecto = proyecto
      this.cambiarDatosHeader(proyecto)
      localStorage.clear()
      localStorage.setItem('ProyectoSeleccionado', JSON.stringify(proyecto))
      this.$router.push({ path: '/proyecto/' + proyecto.clave })
    }
  }
}
</script>
