import axios from 'axios'

//declarar a porta da API
const portaApi= '4466'

const ip = '192.168.21.130'

//definir a url padrao
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//trazer a config do axios

const api = axios.create({
    baseURL: apiUrlLocal
})

export default api