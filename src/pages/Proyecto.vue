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
            <q-btn unelevated size="md" color="primary" @click.native="rellenarModal(props.row)"><font-awesome-icon icon="edit" /></q-btn>
          </q-td>
          <q-td>
            <q-btn unelevated size="md" style="background-color:red; color:white" @click.native="eliminarProyecto(props.row)"><font-awesome-icon icon="trash" /></q-btn>
          </q-td>
          <q-td>
            <q-btn unelevated size="md" color="secondary" @click.native="seleccionarProyecto(props.row)"><font-awesome-icon icon="mouse-pointer" /></q-btn>
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

<q-dialog v-model="modalRegistrarProyecto">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registrar Proyecto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="registrarProyecto" class="q-gutter-md centrado">
            <q-input
              filled
              v-model="nuevoProyecto.nombreProyeto"
              label="Nombre del proyecto"
              hint="Nombre del proyecto"
            />
            <q-input
              filled
              v-model="nuevoProyecto.clave"
              label="Clave"
              hint="Clave"
            />
            <q-date
            v-model="nuevoProyecto.fechaInicio"
            landscape mask="YYYY-MM-DD"
            />
            <q-date
            v-model="nuevoProyecto.fechaFin"
            landscape mask="YYYY-MM-DD" :options="limitesReg"
            />
          </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="registrarProyecto" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalActualizarProyecto">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Actualizar Proyecto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="actualizarProyecto" class="q-gutter-md centrado">
            <q-input
              filled
              v-model='editProyecto.nombreProyeto'
              label="Nombre del proyecto"
              hint="Nombre del proyecto"
            />
            <q-date
            v-model="editProyecto.fechaInicio"
            landscape mask="YYYY-MM-DD"
            />
            <q-date
            v-model="editProyecto.fechaFin"
            landscape mask="YYYY-MM-DD" :options="limitesAct"
            />
          </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Actualizar" type="submit" color="primary" @click.native="actualizarProyecto()" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" v-close-popup />        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import api from '../util/api'
export default {
  name: 'PageIndex',
  mounted () { this.consulta() },
  data () {
    return {
      nuevoProyecto: {
        clave: null,
        nombreProyeto: null,
        fechaInicio: null,
        fechaFin: null,
        fechaStatus: new Date(),
        status: {
          idStatus: '1'
        },
        members: [],
        productBacklog: []
      },
      modalActualizarProyecto: false,
      editProyecto: {
        clave: null,
        nombreProyeto: null,
        fechaInicio: null,
        fechaFin: null,
        fechaStatus: null,
        status: {
          idStatus: '1'
        },
        members: [],
        productBacklog: []
      },
      modalRegistrarProyecto: false,
      tproyecto: 'Sistema Academico',
      tclave: 'SISA',
      tscrum: 'Fernanda',
      tproduct: 'Carlos',
      tstatus: 'Pendiente',
      tfechastatus: '18/08/2020',
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
          name: 'Editar',
          align: 'left',
          label: 'Editar',
          field: 'editar',
          sortable: false
        },
        {
          name: 'Eliminar',
          align: 'left',
          label: 'Eliminar',
          field: 'eliminar',
          sortable: false
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
    limitesReg (fechaFin) {
      return fechaFin >= this.nuevoProyecto.fechaInicio + 1
    },
    limitesAct (fechaFin) {
      return fechaFin >= this.editProyecto.fechaInicio + 1
    },
    consulta () {
      api.getAll('/kanban/proyecto/consulta').then(response => {
        this.data = response.data
        console.log(this.data)
      })
    },
    registrarProyecto () {
      api.crear('/kanban/proyecto/guardar', this.nuevoProyecto).then(response => {
        console.log(this.nuevoProyecto)
        this.consulta()
        this.modalRegistrarProyecto = 'false'
        this.$swal.fire(
          'Registro exitoso',
          'El proyecto se ha registrado correctamente',
          'success'
        )
      }).catch(error => {
        console.log(error)
        console.log(this.nuevoProyecto)
      })
    },
    rellenarModal (proyectoActualizar) {
      this.modalActualizarProyecto = true
      this.editProyecto = proyectoActualizar
    },
    actualizarProyecto () {
      api.crear('/kanban/proyecto/guardar', this.editProyecto).then(response => {
        console.log(response)
        this.$swal.fire(
          'Modificado',
          'El proyecto se ha modificado correctamente',
          'success'
        )
        this.consulta()
        this.modalActualizarProyecto = false
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarProyecto (proyectoEliminar) {
      this.$swal.fire({
        title: '¿Seguro que desea eliminar el proyecto?',
        text: 'No podrá revertir estos cambios',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          api.eliminar('/kanban/proyecto/eliminar/' + proyectoEliminar.clave).then(response => {
            console.log(response)
            this.$swal.fire(
              'Eliminado',
              'El proyecto se ha eliminado correctamente',
              'success'
            )
            this.consulta()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    seleccionarProyecto (proyecto) {
      localStorage.clear()
      localStorage.setItem('ProyectoSeleccionado', JSON.stringify(proyecto))
      this.$router.push({ path: '/proyecto/' + proyecto.clave })
    }
  }
}
</script>
