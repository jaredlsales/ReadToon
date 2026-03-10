import axios from "axios";
import config from "../config/config.js";

const apiLocal = axios.create({
    baseURL: config.API_BASE_URL
});

export default apiLocal;