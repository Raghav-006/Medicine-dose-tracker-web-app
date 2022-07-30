import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_PRO;
axios.defaults.withCredentials = true;
let refresh = false;

axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 401 && !refresh) {
            refresh = true;
            const response = await axios.post(
                "refresh", {}, {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data["token"]}`;
                return axios(error.config);
            }
        }
        refresh = false;
        return error;
    }
);