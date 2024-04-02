import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default axios;
