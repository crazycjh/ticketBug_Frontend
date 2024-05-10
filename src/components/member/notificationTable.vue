<template>
    <div v-if="notificationTableValue.length === 0" class="flex justify-center">
            尚無推播設定
    </div>
    <DataTable :value="notificationTableValue" sortField="" :sortOrder="-1" tableStyle="min-width: 20rem">
        <!-- 要加上移除button -->
        <!-- <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        </Column> -->
        <Column field="airport_1" header="Airport_1">
        </Column>
        <Column field="airport_2" header="Airport_1">
        </Column>
        <Column field="airport_3" header="Airport_1">
        </Column>
        <Column field="airport_4" header="Airport_1">
        </Column>
        <Column field="month_1" header="Depature Date">
        </Column>
        <Column field="month_2" header="Return Date">
        </Column>
        <Column header="刪除">
            <template #body="slotProps">
                <primeButton @click="removeItem(slotProps.data ,slotProps.data.isNew)" :pt="{ root: '!h-8' }">移除</primeButton>
            </template>
        </Column>
        
    </DataTable>
    
</template>
<script setup>
import { ref, onMounted, watch, toRef } from 'vue';
// import { ProductService } from '@/service/ProductService';
const props = defineProps(['notificationTable', 'addTable', 'deleteTable']);
const emits = defineEmits(['update:notificationTable', 'update:addTable', 'update:deleteTable']);

const notificationTableValue = toRef(props, 'notificationTable');

onMounted(() => {

});

const removeIte = (removeItem, isNew) => {
    // for updating to mysql
    if(isNew){
        //從新增的移除
        console.log('移除新增')
        console.log(props.addTable)
        const newAddTable = props.addTable.filter((item)=> {
            console.log('item');
            console.log('removeItem');
            if(item['id'] === removeItem['id']){
                return false
            }
            return true;
        })
        console.log(newAddTable);
        emits('update:addTable',newAddTable)
    }else {
        //新增到delete裏面
        const newDeleteTable = props.deleteTable
        newDeleteTable.push(removeItem);
        console.log(newDeleteTable);
        emits('update:deleteTable', newDeleteTable);
    }

    // 移除列表中的item
    const notificationTableNewValue = notificationTableValue.value.filter((item) => {
        // if(item.airport_1 === removeItem.airport_1 )
        console.log('notificationTableValue');
        console.log(item);
        if(item['id'] === removeItem['id']){
                return false
            }
            return true;
    })
    emits('update:notificationTable',notificationTableNewValue)
    // console.log(data, isNew);
}

</script>