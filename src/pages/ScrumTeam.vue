<template>
  <div class="row">

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
            <q-btn unelevated size="sm" color="primary" @click.native="rellenarFormulario(props.row)">Editar</q-btn>
          </q-td>
          <q-td>
            <q-btn unelevated size="sm" style="background-color:red; color:white" @click.native="eliminarMiembro(props.row)">Eliminar</q-btn>
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
            <q-select filled v-model="memberActualizar.rol.idRol" option-value="idRol" option-label="nombreRol" :options="options" label="Rol" />
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
          idRol: null
        }
      },
      options: [],
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
      modalRegistrar: false,
      modalActualizar: false
    }
  },
  methods: {
    consulta () {
      this.claves = []
      api.getOne('/kanban/proyecto/one/' + this.proyecto.clave).then(response => {
        this.data = response.data.members
      })
      api.getAll('/kanban/rol/consulta').then(response => {
        var contadorDev = 0
        if (this.proyecto.members.length >= 8) {
          console.log('NO')
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
        localStorage.clear()
        localStorage.setItem('ProyectoSeleccionado', JSON.stringify(this.proyecto))
        api.crear('/kanban/proyecto/guardar', this.proyecto).then(response => {
          console.log(response)
          this.modalRegistrar = false
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    modificarMiembro () {
      api.crear('/kanban/member/guardar', this.memberActualizar).then(response => {
        console.log(response)
        localStorage.clear()
        localStorage.setItem('ProyectoSeleccionado', JSON.stringify(this.proyecto))
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarMiembro (miembroEliminar) {
      console.log(miembroEliminar)
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
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    rellenarFormulario (miembroModificar) {
      this.modalActualizar = true
      this.memberActualizar = miembroModificar
      api.getAll('/kanban/rol/consulta').then(response => {
        var contadorDev = 0
        if (this.proyecto.members.length >= 8) {
          console.log('NO')
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
    onReset () {
      this.proyecto = null
      this.clave = null
      this.nombre = null
      this.apellidoUno = null
      this.apellidoDos = null
      this.rol = null
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
