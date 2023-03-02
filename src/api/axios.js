import axios from 'axios';

const baseURL = 'http://localhost:8000' || 'https://baltic-store-api.cyclic.app'

export default axios.create({
  baseURL: baseURL
})