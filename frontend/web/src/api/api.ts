import axios from 'axios';


const baseURL = import.meta.env.VITE_API_BASE_URL as string;


const api = axios.create({
baseURL,
timeout: 10000,
});


// Request interceptor (ex.: adicionar token no header)
api.interceptors.request.use(
config => {
// const token = localStorage.getItem('token');
// if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
return config;
},
error => Promise.reject(error)
);


// Response interceptor (tratamento global de erros)
api.interceptors.response.use(
response => response,
error => {
// Aqui você pode mapear erros e retornar mensagens amigáveis
if (!error.response) {
return Promise.reject(new Error('Erro de conexão com o servidor'));
}
return Promise.reject(error);
}
);


export default api;