import axios from "axios";


//declarar portaApi
const portaApi = '4466'

//declarar ip da máquina
const ip = '192.168.21.121'


//definir a url padrao
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//trazer configurações do axios
const api = axios.create({
  baseURL: apiUrlLocal
})

export default api