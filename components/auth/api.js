import Axios from "axios";

let urls = {
    test: `http://13.212.45.145/api/v1/`,
    development: 'http://13.212.45.145/api/v1/',
    production: 'https://reezqa-api.cerealsproject.com/api/v1/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
    }
});

export default api;