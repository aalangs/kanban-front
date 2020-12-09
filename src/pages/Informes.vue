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
    />
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
    />
  </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
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
      data: [
        {
          proyecto: 'SICSE',
          productBacklog: 1,
          status: '1',
          porcentaje: '18.90',
          productOwner: 'Fernanda Alpuche',
          scrumMaster: 'Carlos Arce',
          development: 'Diego Montes'
        },
        {
          proyecto: 'SOCSE',
          productBacklog: 2,
          status: '2',
          porcentaje: '11.90',
          productOwner: 'Fernanda Alpuche',
          scrumMaster: 'Carlos Arce',
          development: 'Emmanuel Estrada'
        }
      ],
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
      dataK: [
        {
          num: 1,
          proyecto: 'SICSE',
          productBacklog: 6,
          prioridad: '2',
          status: '2',
          avance: '16.66'
        },
        {
          num: 2,
          proyecto: 'SOCSE',
          productBacklog: 5,
          prioridad: '1',
          status: '1',
          avance: '12.66'
        }
      ]
    }
  }
}
</script>
