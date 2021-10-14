import Axios from "axios";

let urls = {
    test: `https://reezqa.staging.griter.io/api/v1/`,
    development: 'https://reezqa.staging.griter.io/api/v1/',
    production: 'https://reezqa.staging.griter.io/api/v1/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
    }
});

export default api;