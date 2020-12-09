<template>
  <div class="row">
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
            <q-btn unelevated size="sm" color="secondary" @click.native="seleccionarProyecto(props.row)">Seleccionar</q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>

    <div class="q-pa-md col-12">
      <q-btn label="Registrar" type="submit" color="primary" style="margin:10px" @click="modalRegistrarProyecto = true" />
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
      data: []
    }
  },
  methods: {
    consulta () {
      api.getAll('/kanban/proyecto/consulta').then(response => {
        this.data = response.data
        console.log(this.data)
      })
    },
    seleccionarProyecto (proyecto) {
      localStorage.removeItem('ProyectoSeleccionado')
      localStorage.setItem('ProyectoSeleccionado', JSON.stringify(proyecto))
      this.$router.push({ name: 'ProyectoSeleccionado' })
    }
  }
}
</script>
