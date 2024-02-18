<template>
    <DataTable :value="products" sortField="price" :sortOrder="-1" tableStyle="min-width: 20rem">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable>
</template>
<script setup>
import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';

onMounted(() => {
    // ProductService.getProductsMini().then((data) => (products.value = data));
    products.value = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
{
    id: '1000',
    code: 'fsa230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}]
});

const products = ref();
const columns = [
    { field: 'Airport_1', header: 'Airport_1' },
    { field: 'Airport_2', header: 'Airport_2' },
    { field: 'Airport_3', header: 'Airport_3' },
    { field: 'Airport_4', header: 'Airport_4' },
    { field: 'Date_1', header: 'Depature Date' },
    { field: 'Date_2', header: 'Return Date' }
];

</script>