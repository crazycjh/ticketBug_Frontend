<!-- 此頁要設定路由限制 -->
<template>
    <section class=" max-w-5xl mx-auto flex flex-col items-center mt-9">
        <div class="card flex flex-col gap-4">
            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText placeholder="帳號" disabled class=" opacity-0" :pt="{root:'!opacity-80'}"/>
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
            <InputGroup class="flex items-center gap-3">
                <InputGroupAddon class=" w-7">
                    <i class="pi pi-bell"></i>
                </InputGroupAddon>
                <InputGroupAddon class="">
                    推播通知
                </InputGroupAddon>
                <InputSwitch v-model="checked" />
            </InputGroup>
            <div>
                <primeButton
                        class="h-8 "
                        label="新增推播"
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
            </div>
            <notificationtable/>
            <div class="flex justify-end gap-2">
                <primeButton
                    class="h-8 "
                    label="更新"
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
            </div>
            <!-- 插入datatable，當推播被打開，就顯示table -->
            
        </div>
    </section>
</template>
<script setup>
import notificationtable from '../components/member/notificationTable.vue'
import {ref, onMounted, onUnmounted } from 'vue';
import { connectWebSocket } from '../utility/webSocket/webSocket'

//     <!-- avatar card  -->

    //<!-- 帳號、綁定的平台、密碼修改或是尚未有密碼新增(彈跳視窗，這樣就可以不只使用google登入)、 -->
onMounted(() => {
    connectWebSocket();
});


onUnmounted(()=> {
    // if(port) {
    //     port.stop();
    // }
});
</script>
