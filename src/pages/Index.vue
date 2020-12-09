<template>
  <div class="q-pa-md" style="max-width: 1200px">
    <div class="col-2 offset-xs-5" >
      <h5 class="title">Proyecto</h5>
    </div>
    <div class="q-pa-md" style="max-width: 1200px">
      <q-table
      table-header-style="primary"
        class="my-sticky-column-table"
        :data="data"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="q-pa-md">
        <q-btn label="Agregar proyecto" color="primary" @click="persistent = true" />

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registra proyecto</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="clave"
              label="Clave"
              hint="Clave"
            />
            <q-input
              filled
              v-model="proyecto"
              label="Nombre del proyecto"
              hint="Nombre del proyecto"
            />
            <q-input
              filled
              v-model="fechaInicio"
              label="Fecha Inicio"
              hint="Fecha Inicio"
            />
            <q-input
              filled
              v-model="fechaFin"
              label="Fecha Fin"
              hint="Fecha Fin"
            />
            <q-select filled v-model="status" :options="opcionStatus" label="Status" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="persistentUno = true" />
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    <div class="q-pa-md">
    <q-btn label="Editar proyecto" color="primary" @click="persistentDos = true" id=""/>

    <q-dialog v-model="persistentDos" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Editar Proyecto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="clave"
              label="Clave"
              hint="Clave"
            />
            <q-input
              filled
              v-model="proyecto"
              label="Nombre del proyecto"
              hint="Nombre del proyecto"
            />
            <q-input
              filled
              v-model="fechaInicio"
              label="Fecha Inicio"
              hint="Fecha Inicio"
            />
            <q-input
              filled
              v-model="fechaFin"
              label="Fecha Fin"
              hint="Fecha Fin"
            />
            <q-select filled v-model="status" :options="opcionStatus" label="Status" />

          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Registrar" type="submit" color="primary" @click="persistentDos = true" />
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      persistent: false,
      persistentDos: false,
      proyecto: null,
      clave: null,
      fechaInicio: null,
      fechaFin: null,
      status: null,
      opcionStatus: ['Pendiente', 'Seleccionado', 'Proceso', 'Terminado'],
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
          name: 'actualizar',
          align: 'left',
          label: 'Actualizar',
          field: 'actualizar',
          sortable: true
        }
      ],
      data: [
        {
          numero: 1,
          clave: 'SICSE',
          nombre: 'Ssitema de Examenes',
          actualizar: ''
        },
        {
          numero: 2,
          clave: 'SOCSE',
          nombre: 'Sistema Ordinarios',
          actualizar: ''
        }
      ]
    }
  },
  methods: {
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
