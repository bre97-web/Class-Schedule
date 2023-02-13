import { createRouter, createWebHashHistory } from "vue-router"

import Home from '../App.vue'
import Edit from '../views/Edit.vue'
import Setting from '../views/Setting.vue'
import Add from '../views/Add.vue'

const routes = [
    {
        path: '/',
    },
    {
        path: '/edit',
        component: Edit,
        props($route) {
            return {
                text: $route.query.text,
                x: $route.query.x,
                y: $route.query.y,
                index: $route.query.index,
            }
        }
    },
    {
        path: '/add',
        component: Add,
        props($route) {
            return {
                text: $route.query.text,
                x: $route.query.x,
                y: $route.query.y,
            }
        }
    },
    {
        path: '/setting',
        component: Setting,
    }
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default Router

