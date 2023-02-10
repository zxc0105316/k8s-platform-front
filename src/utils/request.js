import axios from 'axios';


const http_client = axios.create({

    validateStatus(status){

        return status >= 200 && status <= 504 // 设置默认的合法的状态，若状态码不合法，则不会接收response
    } ,

    timeout: 3600
});


http_client.defaults.retry = 3
http_client.defaults.retryDelay = 1000
http_client.defaults.shouldRetry = true


// 请求拦截器

http_client.interceptors.request.use(
    config => {

        //     添加header
        config.headers["Content-Type"] = 'application/json'
        config.headers['Accept-Language'] = 'zh-CN'
        config.headers['Authorization'] = localStorage.getItem('token') // 可以全局设置接口请求header中带token

        if (config.method === 'post'){
            if (!config.data){
                //    没有参数的时候
                config.data = {}
            }
        }
        return config
    },
    err => {
        //    promise.reject()方法返回一个带有拒绝原因的Promise对象，F12显示
        Promise.reject(err)
    }
);


// 添加相应拦截器
http_client.interceptors.response.use(

    response => {
        if (response.status !== 200){
            return Promise.reject(response.data)
        }else {
            return response.data
        }
    },
    err => {
        return Promise.reject(err)
    }
);


export default http_client
