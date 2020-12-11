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
      <h5 class="title">Product Backlog</h5>
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
              {{ props.row.clave }}
            </q-td>
            <q-td>
              {{ props.row.funcionalidad }}
            </q-td>
            <q-td>
              <div v-if="props.row.prioridad.prioridad === 'Alta'">
                <q-badge color="red">
                  {{ props.row.prioridad.prioridad }}
                </q-badge>
              </div>
              <div v-else-if="props.row.prioridad.prioridad === 'Media'">
                <q-badge color="yellow">
                  {{ props.row.prioridad.prioridad }}
                </q-badge>
              </div>
              <div v-else-if="props.row.prioridad.prioridad === 'Baja'">
                <q-badge color="green">
                  {{ props.row.prioridad.prioridad }}
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
                <q-badge color="yellow">
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
              {{ props.row.miembro.nombre }} {{ props.row.miembro.primerApellido }} {{ props.row.miembro.segundoApellido }}
            </q-td>
            <q-td>
              <q-btn unelevated size="sm" color="primary" @click.native="rellenarFormulario(props.row)"><font-awesome-icon icon="edit" /></q-btn>
            </q-td>
            <q-td>
              <q-btn unelevated size="sm" style="background-color:red; color:white" @click.native="eliminarProduct(props.row)"><font-awesome-icon icon="trash" /></q-btn>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>

  <q-dialog v-model="modalRegistrarProduct">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registrar Product Backlog</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="nuevoProductBacklog.clave"
        label="Clave"
        hint="Clave"
      />
      <q-input
        filled
        v-model="nuevoProductBacklog.funcionalidad"
        label="Funcionalidad"
        hint="Funcionalidad"
      />
      <q-select filled v-model="nuevoProductBacklog.prioridad.idPrioridad" map-options emit-value option-value="idPrioridad" option-label="prioridad" :options="prioridades" label="Prioridad" />
      <q-select filled v-model="nuevoProductBacklog.miembro.clave" map-options emit-value option-value="clave" option-label="nombre" :options="desarrolladores" label="Desarollador" />
      <!--<q-select filled v-model="nuevoProductBacklog.status.idStatus" map-options emit-value option-value="idStatus" option-label="status" :options="status" label="Status" />-->
    </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="registrarProduct()" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" v-close-popup />        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="modalActualizarProduct">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Actualizar Product Backlog</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="modificarProductBacklog.funcionalidad"
        label="Funcionalidad"
        hint="Nombre del proyecto"
      />
      <q-select filled v-model="modificarProductBacklog.prioridad.idPrioridad" map-options emit-value option-value="idPrioridad" option-label="prioridad" :options="prioridades" label="Prioridad" />
      <q-select filled v-model="modificarProductBacklog.miembro.clave" map-options emit-value option-value="clave" option-label="nombre" :options="desarrolladores" label="Desarollador" />
      <q-select filled v-model="modificarProductBacklog.status.idStatus" map-options emit-value option-value="idStatus" option-label="status" :options="statusModificar" label="Status" />
    </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="modificarProduct()" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" v-close-popup />        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pa-md col-12">
      <q-btn label="Registrar" type="submit" color="primary" style="margin:10px" @click="modalRegistrarProduct = true" />
    </div>

  </div>
</template>
<script>
import api from '../util/api'
export default {
  mounted () { this.consulta() },
  data () {
    return {
      proyectoSeleccionado: JSON.parse(localStorage.getItem('ProyectoSeleccionado')),
      modalRegistrarProduct: false,
      modalActualizarProduct: false,
      nuevoProductBacklog: {
        clave: null,
        funcionalidad: null,
        miembro: {
          clave: null
        },
        prioridad: {
          idPrioridad: null
        },
        status: {
          idStatus: '2'
        }
      },
      modificarProductBacklog: {
        clave: null,
        funcionalidad: null,
        miembro: {
          clave: null
        },
        prioridad: {
          idPrioridad: null
        },
        status: {
          idStatus: null
        }
      },
      data: [],
      desarrolladores: [],
      status: [],
      statusModificar: [],
      prioridades: [],
      columns: [
        {
          name: 'backlog',
          label: 'Clave',
          align: 'left',
          field: 'Clave',
          sortable: true
        },
        {
          name: 'funcionalidad',
          label: 'Funcionalidad',
          align: 'left',
          field: 'Funcionalidad',
          sortable: true
        },
        {
          name: 'Prioridades',
          align: 'left',
          label: 'Prioridades',
          field: 'prioridades',
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
          name: 'Development',
          align: 'left',
          label: 'Development',
          field: 'development',
          sortable: true
        },
        {
          name: 'Editar',
          align: 'left',
          label: 'Editar',
          field: 'editar'
        },
        {
          name: 'Eliminar',
          align: 'left',
          label: 'Eliminar',
          field: 'eliminar'
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
      api.getOne('/kanban/proyecto/one/' + this.proyectoSeleccionado.clave).then(response => {
        api.getAll('/kanban/prioridad/consulta/').then(response2 => {
          api.getAll('/kanban/status/consulta/').then(response3 => {
            response.data.members.forEach(element => {
              if (element.rol.nombreRol !== 'Product Owner' && element.rol.nombreRol !== 'Scrum Master') {
                this.desarrolladores.push(element)
              }
            })
            this.prioridades = response2.data
            this.status = response3.data
            this.data = response.data.productBacklog
            this.cambiarDatosHeader(response.data)
          })
        })
      })
    },
    registrarProduct () {
      if (this.proyectoSeleccionado.productBacklog.length === 0) {
        this.proyectoSeleccionado.status.idStatus = '2'
        this.proyectoSeleccionado.status.status = 'Seleccionado'
      }
      api.crear('/kanban/product/guardar', this.nuevoProductBacklog).then(response => {
        console.log(response)
        this.proyectoSeleccionado.productBacklog.push(this.nuevoProductBacklog)
        this.modificarStatusProyecto(this.proyectoSeleccionado)
        this.modalRegistrarProduct = false
        this.$swal.fire(
          'Registro exitoso',
          'El Product Backlog se ha registrado correctamente',
          'success'
        )
        this.consulta()
      }).catch(error => {
        console.log(error)
      })
    },
    rellenarFormulario (modificarProductBacklog) {
      this.statusModificar = this.status
      if (modificarProductBacklog.status.idStatus === '2') {
        this.statusModificar = [{ idStatus: '2', status: 'Seleccionado' }, { idStatus: '3', status: 'Proceso' }, { idStatus: '4', status: 'Terminado' }]
      } else if (modificarProductBacklog.status.idStatus === '3') {
        this.statusModificar = [{ idStatus: '3', status: 'Proceso' }, { idStatus: '4', status: 'Terminado' }]
      } else if (modificarProductBacklog.status.idStatus === '4') {
        this.statusModificar = [{ idStatus: '4', status: 'Terminado' }]
      }
      this.modalActualizarProduct = true
      this.modificarProductBacklog = modificarProductBacklog
      console.log(this.modificarProductBacklog)
    },
    modificarProduct () {
      api.crear('/kanban/product/guardar', this.modificarProductBacklog).then(response => {
        api.getOne('/kanban/proyecto/one/' + this.proyectoSeleccionado.clave).then(response => {
          this.proyectoSeleccionado = response.data
          this.modificarStatusProyecto(this.proyectoSeleccionado)
          this.modalActualizarProduct = false
          this.$swal.fire(
            'Modificación exitosa',
            'El Product Backlog se ha modificado correctamente',
            'success'
          )
          this.consulta()
        })
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarProduct (productBacklogEliminar) {
      this.$swal.fire({
        title: '¿Seguro que desea eliminar el Product Backlog?',
        text: 'No podrá revertir estos cambios',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          var index = 0
          this.proyectoSeleccionado.productBacklog.forEach(element => {
            if (element.clave === productBacklogEliminar.clave) {
              index = this.proyectoSeleccionado.productBacklog.indexOf(element)
              if (index > -1) {
                this.proyectoSeleccionado.productBacklog.splice(index, 1)
              }
            }
          })
          if (this.proyectoSeleccionado.productBacklog.length === 0) {
            this.proyectoSeleccionado.status.idStatus = '1'
            this.proyectoSeleccionado.status.status = 'Pendiente'
          }
          localStorage.clear()
          localStorage.setItem('ProyectoSeleccionado', JSON.stringify(this.proyectoSeleccionado))
          api.crear('/kanban/proyecto/guardar', this.proyectoSeleccionado).then(response => {
            api.eliminarObj('/kanban/product/eliminar', productBacklogEliminar).then(response => {
              console.log(response)
              this.$swal.fire(
                'Eliminado',
                'El Product Backlog se ha eliminado correctamente',
                'success'
              )
              this.consulta()
              this.onResetModificar()
            }).catch(error => {
              console.log(error)
            })
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    modificarStatusProyecto (proyecto) {
      var terminados = 0
      proyecto.productBacklog.forEach(element => {
        if (element.status.idStatus === '4') {
          terminados++
        }
      })
      if (proyecto.productBacklog.length === terminados) {
        proyecto.status.idStatus = '4'
        proyecto.status.status = 'Terminado'
      } else if (terminados === 1) {
        proyecto.status.idStatus = '3'
        proyecto.status.status = '1'
      }
      localStorage.clear()
      localStorage.setItem('ProyectoSeleccionado', JSON.stringify(proyecto))
      api.crear('/kanban/proyecto/guardar', proyecto).then(response => {
        this.modalActualizarProduct = false
        this.consulta()
      }).catch(error => {
        console.log(error)
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
      this.nuevoProductBacklog.clave = null
      this.nuevoProductBacklog.funcionalidad = null
      this.nuevoProductBacklog.prioridad.idPrioridad = null
      this.nuevoProductBacklog.miembro.clave = null
      this.nuevoProductBacklog.accept = false
    },
    onResetModificar () {
      this.modificarProductBacklog.clave = null
      this.modificarProductBacklog.funcionalidad = null
      this.modificarProductBacklog.prioridad.idPrioridad = null
      this.modificarProductBacklog.miembro.clave = null
      this.nuevoProductBmodificarProductBacklogacklog.status.idStatus = null
      this.modificarProductBacklog.accept = false
    },
    onSubmit () {
      this.proyecto = null
      this.clave = null
      this.prioridad = null
      this.desarrollador = null
      this.status = null
      this.accept = false
    }
  }
}
</script>
