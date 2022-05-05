import axios from 'axios'

export default axios.create({
    baseURL: 'https://sw5eapi.azurewebsites.net/api'
})
