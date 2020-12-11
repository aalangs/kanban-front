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
      <h5 class="title">Scrum Team</h5>
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
            {{ proyecto.nombreProyeto }}
          </q-td>
          <q-td>
            {{ props.row.clave }}
          </q-td>
          <q-td>
            {{ props.row.nombre }}
          </q-td>
          <q-td>
            {{ props.row.primerApellido }}
          </q-td>
          <q-td>
            {{ props.row.segundoApellido }}
          </q-td>
          <q-td>
            {{ props.row.rol.nombreRol }}
          </q-td>
          <q-td>
            <q-btn unelevated size="sm" color="primary" @click.native="rellenarFormulario(props.row)"><font-awesome-icon icon="edit" /></q-btn>
          </q-td>
          <q-td>
            <q-btn unelevated size="sm" style="background-color:red; color:white" @click.native="eliminarMiembro(props.row)"><font-awesome-icon icon="trash" /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>

    <div class="q-pa-md col-12">
      <q-btn label="Registrar" type="submit" color="primary" style="margin:10px" @click="modalRegistrar = true" />
      <!--<q-btn label="Editar" type="submit" color="info" @click="modalActualizar = true" />-->
    </div>

    <q-dialog v-model="modalRegistrar">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registrar Scrum Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="onSubmit" class="q-gutter-md centrado">
            <q-input
              filled
              v-model="nuevoMember.clave"
              label="Clave"
              hint="Clave"
            />
            <div class="row" style="justify-content: space-around;">
            <q-input
              filled
              v-model="nuevoMember.nombre"
              label="Nombre"
              hint="Nombre"
            />
            <q-input
              filled
              v-model="nuevoMember.primerApellido"
              label="Apellido Paterno"
              hint="Apellido Paterno"
            />
            <q-input
              filled
              v-model="nuevoMember.segundoApellido"
              label="Apellido Materno"
              hint="Apellido Materno"
            />
            </div>
            <q-select
              filled
              v-model = "nuevoMember.rol.idRol"
              map-options
              emit-value
              option-value="idRol"
              option-label="nombreRol"
              :options="options"
              label="Rol" />
          </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="registrarMember()" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" @click="modalRegistrar = false" />        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalActualizar">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Actualizar Scrum Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <q-form @submit="onSubmit" class="q-gutter-md centrado">
            <div class="row" style="justify-content: space-around;">
            <q-input
              filled
              v-model="memberActualizar.nombre"
              label="Nombre"
              hint="Nombre"
            />
            <q-input
              filled
              v-model="memberActualizar.primerApellido"
              label="Apellido Paterno"
              hint="Apellido Paterno"
            />
            <q-input
              filled
              v-model="memberActualizar.segundoApellido"
              label="Apellido Materno"
              hint="Apellido Materno"
            />
            </div>
            <q-select filled v-model="memberActualizar.rol.nombreRol" option-value="idRol" option-label="nombreRol" :options="optionsM" label="Rol" />
          </q-form>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Actualizar" type="submit" color="primary" @click="modificarMiembro()" />
          <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" v-close-popup />        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
import api from '../util/api'
export default {
  mounted () { this.consulta() },
  data () {
    return {
      proyectoModificar: null,
      proyecto: JSON.parse(localStorage.getItem('ProyectoSeleccionado')),
      nuevoMember: {
        clave: null,
        nombre: null,
        primerApellido: null,
        segundoApellido: null,
        rol: {
          idRol: null
        }
      },
      claves: [],
      memberActualizar: {
        clave: null,
        nombre: null,
        primerApellido: null,
        segundoApellido: null,
        rol: {
          idRol: null,
          nombreRol: null
        }
      },
      options: [],
      optionsM: [],
      columns: [
        {
          name: 'proyecto',
          label: 'Nombre Proyecto',
          align: 'left',
          field: row => row.proyecto,
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
          name: 'nombre',
          align: 'left',
          label: 'Nombre',
          field: 'nombre',
          sortable: true
        },
        {
          name: 'apellidoP',
          align: 'left',
          label: 'Apellido Paterno',
          field: 'apellidoP',
          sortable: true
        },
        {
          name: 'apellidoM',
          align: 'left',
          label: 'Apellido Materno',
          field: 'apellidoM',
          sortable: true
        },
        {
          name: 'rol',
          align: 'left',
          label: 'Rol',
          field: 'rol',
          sortable: true
        },
        {
          name: 'Editar',
          align: 'left',
          label: 'Editar',
          field: 'editar',
          sortable: true
        },
        {
          name: 'Eliminar',
          align: 'left',
          label: 'Eliminar',
          field: 'eliminar',
          sortable: true
        }
      ],
      data: [],
      headerProyecto: '',
      headerClave: '',
      headerScrum: '',
      headerProduct: '',
      headerStatus: '',
      headerFechaStatus: '',
      modalRegistrar: false,
      modalActualizar: false
    }
  },
  methods: {
    consulta () {
      this.claves = []
      api.getOne('/kanban/proyecto/one/' + this.proyecto.clave).then(response => {
        this.data = response.data.members
        this.cambiarDatosHeader(response.data)
      })
      api.getAll('/kanban/rol/consulta').then(response => {
        var contadorDev = 0
        if (this.proyecto.members.length >= 8) {
          console.log('No')
        } else {
          this.options = response.data
          this.proyecto.members.forEach(element => {
            if (element.rol.idRol === '1') {
              delete this.options[0]
              console.log('Product Owner ya existe')
            } else if (element.rol.idRol === '2') {
              delete this.options[1]
              console.log('Scrum Master ya existe')
            } else {
              if (element.rol.idRol === '3') {
                contadorDev++
              }
              if (contadorDev === 6) {
                delete this.options[2]
              } else {
                this.options = response.data
              }
            }
          })
        }
        console.log(response.data)
      })
    },
    registrarMember () {
      api.crear('/kanban/member/guardar', this.nuevoMember).then(response => {
        console.log(response)
        this.proyecto.members.push(this.nuevoMember)
        api.crear('/kanban/proyecto/guardar', this.proyecto).then(response => {
          api.getOne('/kanban/proyecto/one/' + this.proyecto.clave).then(response => {
            localStorage.clear()
            localStorage.setItem('ProyectoSeleccionado', JSON.stringify(response.data))
            this.proyecto = response.data
            this.modalRegistrar = false
            this.onReset()
            this.$swal.fire(
              'Registro exitoso',
              'El miembro se ha registrado correctamente',
              'success'
            )
            this.consulta()
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    modificarMiembro () {
      this.memberActualizar.rol.idRol = this.memberActualizar.rol.nombreRol.idRol
      this.memberActualizar.rol.nombreRol = this.memberActualizar.rol.nombreRol.nombreRol
      api.crear('/kanban/member/guardar', this.memberActualizar).then(response => {
        api.getOne('/kanban/proyecto/one/' + this.proyecto.clave).then(response => {
          localStorage.clear()
          localStorage.setItem('ProyectoSeleccionado', JSON.stringify(response.data))
          this.proyecto = response.data
          this.modalActualizar = false
          this.$swal.fire(
            'Modificación exitosa',
            'El miembro ha sido modificado correctamente',
            'success'
          )
          this.consulta()
        })
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarMiembro (miembroEliminar) {
      this.$swal.fire({
        title: '¿Seguro que desea eliminar a este miembro?',
        text: 'No podrá revertir estos cambios',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          var asignado = true
          this.proyecto.productBacklog.forEach(element => {
            if (element.miembro.clave === miembroEliminar.clave) {
              asignado = false
              this.$swal.fire(
                'Imposible eliminar miembro',
                'Este desarollador tiene un Product Backlog asignado',
                'warning'
              )
            }
          })
          if (asignado) {
            var index = 0
            this.proyecto.members.forEach(element => {
              if (element.clave === miembroEliminar.clave) {
                index = this.proyecto.members.indexOf(element)
                if (index > -1) {
                  this.proyecto.members.splice(index, 1)
                }
              }
            })
            localStorage.clear()
            localStorage.setItem('ProyectoSeleccionado', JSON.stringify(this.proyecto))
            api.crear('/kanban/proyecto/guardar', this.proyecto).then(response => {
              api.eliminarObj('/kanban/member/eliminar', miembroEliminar).then(response => {
                this.$swal.fire(
                  'Eliminado',
                  'El miembro se ha eliminado correctamente',
                  'success'
                )
                this.consulta()
              }).catch(error => {
                console.log(error)
              })
            }).catch(error => {
              console.log(error)
            })
          }
        }
      })
    },
    rellenarFormulario (miembroModificar) {
      this.modalActualizar = true
      this.memberActualizar = miembroModificar
      api.getAll('/kanban/rol/consulta').then(response => {
        this.optionsM = response.data
        var contadorDev = 0
        if (this.proyecto.members.length >= 8) {
          console.log('NO')
        } else {
          this.proyecto.members.forEach(element => {
            if (element.rol.idRol === '1' && miembroModificar.rol.idRol !== '1') {
              delete this.optionsM[0]
              console.log('Product Owner ya existe')
            } else if (element.rol.idRol === '2' && miembroModificar.rol.idRol !== '2') {
              delete this.optionsM[1]
              console.log('Scrum Master ya existe')
            } else {
              if (element.rol.idRol === '3') {
                contadorDev++
              }
              if (contadorDev === 6) {
                delete this.optionsM[2]
              } else {
                this.optionsM = response.data
              }
            }
          })
        }
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
    onReset () {
      this.nuevoMember.clave = null
      this.nuevoMember.nombre = null
      this.nuevoMember.primerApellido = null
      this.nuevoMember.segundoApellido = null
      this.nuevoMember.rol.idRol = null
      this.accept = false
    },
    onSubmit () {
      this.proyecto = null
      this.clave = null
      this.nombre = null
      this.apellidoUno = null
      this.apellidoDos = null
      this.rol = null
      this.accept = false
    }
  }
}
</script>
