import axios from 'axios';

const baseURL = 'https://baltic-store-api.cyclic.app'

export default axios.create({
  baseURL: baseURL
})