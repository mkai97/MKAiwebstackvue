// router.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/home.vue'
import Chat from '@/views/chat/chat.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    },
    // 其他路由定义
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router