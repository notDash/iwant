/**
 */
import axios from 'axios';

axios.interceptors.request.use(
  config => (
    // loading
    config
  ),
  error => (
    Promise.reject(error)
  ),
);

export default {
  post(url, data) {
    return axios({
      method: 'post',
      // baseURL: 'http://192.168.0.156/Qy/frontend/web/',
      baseURL: 'http://localhost:3000/',
      url,
      // data: qs.stringify(data),
      data,
      // timeout: 10000,
    //   headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'content-type': 'application/json; charset=UTF-8',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    }).then(response => (
      response && response.data
    )).catch(() => {
    });
  },
  get(url, params) {
    return axios({
      method: 'get',
      // baseURL: 'http://192.168.0.156/Qy/frontend/web/',
      //   baseURL: 'http://servers.jianghujoy.cn:8223/',
      //   baseURL: 'http://localhost:3000',
      url,
      params, // get 请求时带的参数
      // timeout: 10000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
      },
    })
      .then(response => (
        // return checkStatus(response)
        response.data
      ))
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
        // window.location.href = '/';
      });
  },
};
