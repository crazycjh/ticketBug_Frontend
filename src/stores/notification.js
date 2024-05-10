import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotifyStore = defineStore('notify', () => {
    // 通知數量
    const notifyCounter = ref(0);

    // 設定登入狀態
    function increaseNotifyCount(count = 1) {
        console.log(typeof count);
        try{
            if(typeof count === 'number') {
                notifyCounter.value = notifyCounter.value + count;
            }else {
                throw new Error('count must be a number');
            }
        }catch(error) {
            console.error(error);
        }
    }
    function resetNotifyCount() {
        notifyCounter.value = 0;
    }
    return { notifyCounter, increaseNotifyCount, resetNotifyCount }
},
{
    persist: {
        enabled: true
    }
}

)