import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development';
const MyAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8081/api/' : "线上接口",
});
// 允许携带cookie
MyAxios.defaults.withCredentials = true;
// 添加请求拦截器
MyAxios.interceptors.request.use(function (config) {
    console.log('我要发请求了', config);
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

const HTTP_CODE = 40100;
// 添加响应拦截器
MyAxios.interceptors.response.use(function (response) {
    console.log('我收到响应了', response);
    if (response?.data?.code === HTTP_CODE) {
        // 跳转到登录页面
        const redirectUrl = (window.location.href);
        window.location.href = `/user/login?${redirectUrl}`;
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default MyAxios;
