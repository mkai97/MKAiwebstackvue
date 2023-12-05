import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('Layout', {
    state: () => ({
        logoUrl: "http://qn.mkai97.cn/logo/logo300_128-logo.png",  // logo地址
        webTitle: "MKAI导航", // 网站标题
    }),
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ["logoUrl", "webTitle"]

            },
        ],
    },
    actions: {
        setLogoUrl(logoUrl) {
            if (logoUrl == null || logoUrl == "") {
                logoUrl = "http://qn.mkai97.cn/logo/logo300_128-logo.png"
            }
            this.logoUrl = logoUrl
        },
        setWebTitle(webTitle) {
            this.webTitle = webTitle
        },

    },
    getters: {
        getLogoUrl() {
            return this.logoUrl
        },
        getWebTitle() {
            return this.webTitle
        }

    }

})

