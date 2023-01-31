import axios from 'axios'

const api = axios.create({
    baseURL: 'https://huellitas-de-amor-server.onrender.com/',
})

export default api
