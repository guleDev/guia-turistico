import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' //URL base da API de exemplo
})

export default api