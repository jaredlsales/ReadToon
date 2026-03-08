import axios from "axios";

const apiLocal = axios.create({
    baseURL: 'https://api-readtoon.devjaredsales.com'
});

export default apiLocal;