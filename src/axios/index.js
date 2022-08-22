import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
});

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        };
        return config;
    },
    // function (error) {
    //     // Сделайте что-нибудь с ошибкой запроса
    //     return Promise.reject(error);
    // },
);

export default instance;
