//1.创建一个新的axios实例
import axios from 'axios'
import store from '@/store'
import router from '@/router'

//导出基准地址，其他地方不是通过axios发请求的地方也要用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    //axios的一些配置,baseURL,timeOut
    baseURL,
    timeout: 5000
})



//2.请求拦截器,如果有头部进行携带

instance.interceptors.request.use(config => {
    //拦截的逻辑
    //进行请求配置修改
    //如果本地有token就在头部携带
    //获取用户信息对象
    const { profile } = store.state.user
    //判断是否有token
    if (profile.token) {
        //3.设置token
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config


}, err => {
    return Promsie.reject(err)
})



//3.响应拦截器：1)剥离无效数据  2）处理token失效

// res=>res.data  ，将来调用接口就是后台的数据
instance.interceptors.response.use(res => {
    return res.data
}, err => {
    //401  状态码,进入该函数
    //err.response判断有五响应
    if (err.response && err.response.status === 401) {
        //1.清空无效信息
        store.commit('user/setUser', {})
        //2.跳转登陆页面
        // router.push('/login?redirectUrl=' + '当前的路由地址')
        //3.跳转传参(当前路由地址)给登录页，登录时直接上次退出的页面,重定向地址】
        //当前路由的地址
        //组件写：$route.path    $route.fullPath=/user?a=10
        //在当前js模块获取
        //encodeURIComponent转url编码//防止解析地址出问题
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirecturl=' + fullPath)
        // router.currentRoute.fullPath 是当前的路由地址，currentRoute.fullPath是ref响应式数据  vue2
        //router.currentRoute.value.fullPath 是当前的路由地址，currentRoute.fullPath是ref响应式数据  vue3
    }
    return Promise.reject(err)
})


//4.导出一个函数调用当前的axios实例发请求，返回值Promise
export default (url, method, submitData) => {
    ///负责发请求，请求地址，请求方式，提交的数据
    //const a={name:100} a.name取值    a['name]取值  a[10>9?'name':'age']
    return instance({
        url,
        method,
        //把get统一转换成小写判断toLowerCase()
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
        // []设置一个动态的key,写js表达式，js表达式的结果当作key
        //1.如果是get其请求，需要使用params传递submitData  ?a=10&b=20
        //2.如果不是其请求，需要使用data传递submitData     请求体data
    })
}