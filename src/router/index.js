import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from "@/views/layout/LayoutView";
//导入进度条组件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
    {
        path: '/home',
        name: 'home',
        icon: 'odometer',
        meta: {title:"概要",requireAuth: false},
        component: LayoutView,
        children: [
            {

                path: "/home",
                name: 'Home',
                component: ()=>import('../views/HomeView'),
                icon: "odometer",
                meta: {title:"概要",requireAuth: false},

            },
        ]
     },
    {

        path: '/workload',
        name: '工作负载',
        component: LayoutView,
        icon: "menu",
        meta: {title:'工作负载',requireAuth: true},
        children: [
            {
                path: '/workload/deployment',
                name: 'Deployment',
                component: () => import('../views/deployment/deploymentView'),
                icon: "Burger",
                meta: {title:'Deployment',requireAuth: true},
            },
            {
                path: '/workload/pod',
                name: 'Pod',
                component: () => import('../views/pod/podView'),
                icon: "Orange",
                meta: {title:'pod',requireAuth: true},

            },
        ]



    },
    {

        path: '/colony',
        name: '集群',
        component: LayoutView,
        icon: "HomeFilled",
        meta: {title:'集群',requireAuth: true},
        children: [
            {
                path: '/colony/node',
                name: 'Node',
                component: () => import('../views/node/nodeView'),
                icon: "Watermelon",
                meta: {title:'Node',requireAuth: true},
            },
            {
                path: '/colony/namespace',
                name: 'Namespace',
                component: () => import('../views/namespace/namespaceView'),
                icon: "Sugar",
                meta: {title:'Namespace',requireAuth: true},

            },
            {

                path: '/colony/persistentVolumn',
                name: 'PersistentVolumn',
                compoment:() => import('../views/persistentVolumn/persistentVolumnView'),
                icon: 'Food',
                meta:{title:'PersistentVolumn',requireAuth: true}

            },
        ]




    },




    {

        path: '/404',
        name: '404',
        meta: {title: "404",requireAuth: false} ,

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/common/404View')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 进度条配置
NProgress.inc(0,2)  //进度条递增
NProgress.configure({easing: 'ease',speed: 600,showSpinner: false})  //动画效果，动画速度，进度环

// 路由守卫,路由拦截
router.beforeEach((to,from,next) => {
    // 启动进度条
    NProgress.start()
    if (to.meta.title){
      document.title = to.meta.title
    }else{
      document.title = "Kubernetes"
    }

// 放行
    next()
})


//关闭进度条
router.afterEach((to, from, next) =>{
    NProgress.done()

})

export default router
