import axios from 'axios'

const api = axios.create({
       baseURL: `https://pf-huellitas-de-amor-production.up.railway.app/`,
})

export default api
