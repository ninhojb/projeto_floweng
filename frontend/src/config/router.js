import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import SupportPages from '@/components/support/SupportPages'
import Auth from '@/components/auth/Auth'

import { userKey } from '../global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
    
}, {
    name: 'supportPages',
    path: '/support',
    component: SupportPages
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = json.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }

})


export default router