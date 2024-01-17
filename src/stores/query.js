import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useQueryStore = defineStore('query', () => {
    const isQuery = ref(false);


    function changeQueryState(value) {
        console.log('修改query');
        isQuery.value = value;
    }
    return { isQuery, changeQueryState };
})