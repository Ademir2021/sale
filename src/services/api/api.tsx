import axios from 'axios'
import { Globais } from '../../components/globais/Globais';

const api = axios.create({

    baseURL: Globais.API_URL
})

export default api;
