import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: "null",
        userInfo: "null",
        isLoggedIn: false,
        isAdmin: false
    }),
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ["token", "userInfo"]

            },
        ],
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        },
        setIsLoggedIn(isLoggedIn) {
            this.isLoggedIn = isLoggedIn
        },
        setIsAdmin(isAdmin) {
            this.isAdmin = isAdmin
        }
    },
    getters: {
        getToken: () => {
            return this.token
        },
        getUserInfo: () => {
            return this.userInfo
        },
        getIsLoggedIn: () => {
            return this.isLoggedIn
        },
        getIsAdmin: () => {
            return this.isAdmin
        }
    }

})

