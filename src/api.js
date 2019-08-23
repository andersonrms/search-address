import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://api.cpfcnpj.com.br'
    //baseURL: 'https://api.github.com',
    baseURL: 'https://viacep.com.br'
});

export default api;