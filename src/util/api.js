import axios from 'axios'

const SERVER_URL = 'http://localhost:8081'
const instancia = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000
})

export default {
  async execute (method, resource, data, config) {
    return instancia({
      method: method,
      url: resource,
      data,
      config,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  // CREAR
  crear (endPoint, object) {
    return this.execute('POST', endPoint, object)
  },
  // CONSULTAR TODOS
  getAll (endPoint) { return this.execute('GET', endPoint, null, { transformResponse: [function (data) { return data }] }) },
  getOne (endPoint) {
    return this.execute('POST', endPoint)
  },
  // EDITAR
  editar (endPoint, object) {
    return this.execute('PUT', endPoint, object)
  },
  // DELETE'S
  eliminar (endPoint) {
    return this.execute('DELETE', endPoint)
  },
  eliminarObj (endPoint, object) {
    return this.execute('DELETE', endPoint, object)
  }
}
