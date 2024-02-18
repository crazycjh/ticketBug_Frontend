import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    // 登入狀態
    const isLogin = ref(false)

    // 設定登入狀態
    function setLoginStatus(status) {
        if(status) {
            console.log('isLogin true');
        }
        isLogin.value = status;
    }
    return { isLogin, setLoginStatus }
},
{
    persist: {
        enabled: true
    }
}

)