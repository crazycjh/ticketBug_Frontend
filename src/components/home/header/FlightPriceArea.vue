<template>
<div class="mt-20">
    <div class="flex justify-center mb-14">
        <h3 class="text-3xl text-center text-slate-600 font-bold">{{ from }}</h3>
    </div>
    <div class="flex  flex-wrap  gap-3 justify-center">
        <Card v-for="item in cheapestTicket.data" :key="item.airport" class="w-1/4 cursor-pointer" @click="test(item.airport)">
            <template #title>{{ item.title }} {{ item.airport}} </template>
            <template #content>
                <div class="w-full relative overflow-hidden aspect-ratio-4/3">
                    <img :src="item.img" alt="" class=" object-cover overflow-hidden absolute inset-0 transition duration-700 hover:scale-110">
                </div>
                <p class="pt-4 -mb-3">
                    {{ item.currency }} {{ item.price }} 起
                </p>
                <button>
                </button>
            </template>
        </Card>
    </div>

</div>
</template>
<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios"

    const props = defineProps(['from']);
    const cheapestTicket = ref([]);

    onMounted(async()=> {
        const fetchData = async() => {
            try{
                const response = await axios.get("https://b42aaea4-c106-47c5-9c16-69874ccbc1e6.mock.pstmn.io/Cheapestticket")
                return response.data;
            }catch(error) {
                console.error(error);
            }
        }

        // const  = await fetchData();
        cheapestTicket.value = await fetchData();
        console.log(cheapestTicket.value.data);
    })
  // 這是假資料 需要透過axios去取得出發地以及便宜的機場票價，以6個機場為上限(所以可以是TPE, HKG, BKK 出發)
  const airportPrice = [
    {
        airport: 'OSL',
        title: '挪威 - 奧斯陸',
        price: '23,000',
        currency: 'TWD',
        img: '/images/city/OSL.jpg'
    },
    {
        airport: 'CDG',
        title: '法國 - 巴黎',
        price: '33,000',
        currency: 'TWD',
        img: '/images/city/CDG.jpg'
    },
    {
        airport: 'PRG',
        title: '捷克 - 布拉格',
        price: '13,000',
        currency: 'TWD',
        img: '/images/city/PRG.jpg'
    },
    {
        airport: 'ZAG',
        title: '克羅埃西亞 - 札克瑞布',
        price: '30,010',
        currency: 'TWD',
        img: '/images/city/ZAG.jpeg'
    },
    {
        airport: 'BUD',
        title: '匈牙利 - 布達佩斯',
        price: '25,900',
        currency: 'TWD',
        img: '/images/city/BUD.jpg'
    },
    {
        airport: 'ROM',
        title: '義大利 - 羅馬',
        price: '33,000',
        currency: 'TWD',
        img: '/images/city/1.jpg'
    },
]

const test = (key) => {
    console.log(key);
    console.log('測試測試');
}
</script>
<style>
.aspect-ratio-4\/3::before {
    content: '';
    display: block;
    padding-bottom: 75%; /* 高度是寬度的 75% */
}

</style>
