import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fyc-tcc.herokuapp.com/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@FYC:token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(undefined, (err) => {
    const {
        config,
        response: { status },
    } = err;
    if (status === 401) {
        localStorage.removeItem('@FYC:token');
        localStorage.removeItem('@FYC:user');
        window.location.reload();
        window.alert('Faça seu login novamente!');
    }

    return Promise.reject(err);
});

export default api;
