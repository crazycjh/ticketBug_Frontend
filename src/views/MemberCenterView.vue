<!-- 此頁要設定路由限制 -->
<template>
    <section class=" max-w-5xl mx-auto flex flex-col items-center mt-9">
        <div class="card flex flex-col gap-4">
            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText placeholder="帳號" disabled class=" opacity-0" :pt="{root:'!opacity-80'}" :value="email"/>
            </InputGroup>

            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <InputText placeholder="密碼"/>
            </InputGroup>

            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <InputText placeholder="確認密碼"/>
            </InputGroup>
            <div class="flex justify-start gap-2">
                <primeButton
                    class="h-8 "
                    label="更新密碼"
                    :pt="{ root: '!p-1 hover:!bg-sky-800', label: '!text-sky-50' }"
                    @click="
                        skyscannerClick({
                            date: {
                                    date1: item.date_1,
                                    date2: item.date_2,
                                },
                            location: {
                                from: item.airport_1,
                                to: item.airport_2,
                            },
                        }, 'RT')
                    "
                >
                </primeButton>
                <primeButton
                    class="h-8"
                    label="取消"
                    :pt="{ root: '!p-1 hover:!bg-sky-800' ,label: '!text-sky-50'  }"
                >
                </primeButton>
            </div>
            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-bell"></i>
                </InputGroupAddon>
                <InputGroupAddon >
                    推播通知
                </InputGroupAddon>
                <InputSwitch v-model="pushNotificationSwitch" />
            </InputGroup>
            <div>
                <primeButton
                        class="h-8 "
                        label="新增推播"
                        :pt="{ root: '!p-1 hover:!bg-sky-800', label: '!text-sky-50' }"
                        @click="addPushNotificationVisible = true"
                    >
                </primeButton>
            </div>
            <notificationtable v-model:notification-table="notificationTableValue" v-model:add-table="addTable" v-model:delete-table="deleteTable"/>
            <div class="flex justify-end gap-2">
                <primeButton
                    class="h-8 "
                    label="更新"
                    :pt="{ root: '!p-1 hover:!bg-sky-800', label: '!text-sky-50' }"
                    @click="updateNotification"
                >
                <!-- :disabled="notificationUpdateButton" -->
                </primeButton>
                <primeButton
                    class="h-8"
                    label="取消"
                    :pt="{ root: '!p-1 hover:!bg-sky-800' ,label: '!text-sky-50'  }"
                >
                </primeButton>
            </div>
        </div>
        <PrimeDialog
            v-model:visible="addPushNotificationVisible"
            modal
            header="新增通知"
            :style="{ width: '55rem' }"
            :pt="{
                root: '!border-sky-800',
                header: '!bg-sky-600',
                content: '!bg-sky-600',
    }"
        >
            <section class="flex justify-center mb-3">
                <div class="w-full">
                    <searchFunction v-model:add-new="addNew" @add-notification="doAddNotification" :notificationValue="notificationTableValue" v-model:newItemIdCount="newItemIdCount"/>
                </div>
            </section>
            <!-- pi-google :pt="{ root: '!bg-inherit' }" -->
            <div class="flex justify-content-end gap-2 mb-3">
                <primeButton
                    type="button"
                    label="取消"
                    severity="secondary"
                    @click="addPushNotification"
                ></primeButton>
                <primeButton
                    type="button"
                    label="新增"
                    @click="addPushNotification(true)"
                ></primeButton>
            </div>
        </PrimeDialog>
    </section>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

import notificationtable from '../components/member/notificationTable.vue'
import searchFunction from '../components/Search/SearchFunction.vue'
import {ref, onMounted, onUnmounted, watch } from 'vue';
import { connectWebSocket } from '../utility/webSocket/webSocket'
import { routerKey } from 'vue-router';

const router = useRouter();

const email = ref('');
const addPushNotificationVisible = ref(false);
const addNew = ref(false);
const notificationTableValue = ref([]);
const pushNotificationSwitch = ref(false);
const addTable = ref([]);
const deleteTable = ref([]);
const newItemIdCount = ref(0);
const notificationUpdateButton = ref(false);
//     <!-- avatar card  -->

    //<!-- 帳號、綁定的平台、密碼修改或是尚未有密碼新增(彈跳視窗，這樣就可以不只使用google登入)、 -->
onMounted( async() => {
    // 跟後端取得使用者資料
// /api/v1/users/userInfo
try {
    const userInfo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/userInfo`,{withCredentials: true});

    notificationTableValue.value = userInfo.data.data.notificationList
    notificationTableValue.value.map((item) => {
        item['isNew'] = false;
    });

    email.value = userInfo.data.data.userInfo.email;
    pushNotificationSwitch.value = userInfo.data.data.userInfo.notify;

    // connectWebSocket();
}catch(error) {
    console.error('無法連線到server');
    router.push('/');

}
    // connectWebSocket();
});

const updateNotification = async function(){
    try{
        // 非空才送出
        if(addTable.value.length || deleteTable.value.length) {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/notification/updatelist`,{ add: addTable.value, delete: deleteTable.value}, {withCredentials: true})
            addTable.value = [];
            deleteTable.value = [];
        }else {
            console.log('空的是要更新什麼？')
        }


    }catch(error) {
        console.error(error);
    }
};

const addPushNotification = (add=false) => {
    // addPushNotificationVisible.value = !addPushNotificationVisible.value
    console.log(add);
    if(add === true) {
        addNew.value = add;
    }
}

const doAddNotification = (params) => {
    notificationTableValue.value.push(params);
    addPushNotificationVisible.value = !addPushNotificationVisible.value

    // 要新增的array
    addTable.value.push(params);

    // 要刪除的array
}

watch([addTable, deleteTable],([newAdd, newDelete]) => {
    if(newAdd.length || newDelete.length) {
        notificationUpdateButton.value = true;
    }else {
        notificationUpdateButton.value = false;
    }
} ,{deep: true})

onUnmounted(()=> {
    // if(port) {
    //     port.stop();
    // }
});
</script>
