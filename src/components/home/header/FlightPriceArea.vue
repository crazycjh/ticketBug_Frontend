<template>
<div class="flex  flex-wrap mt-20 gap-3 justify-center">
    <Card v-for="item in airportPrice" :key="item.airport" class=" w-1/4 cursor-pointer" @click="test(item.airport)">
    <template #title>{{ item.title }} {{ item.airport}} </template>
    <template #content>
        <div class="w-full relative h-20 overflow-hidden">
            <img :src="item.img" alt="" class=" object-cover overflow-hidden">
        </div>
        <p class="pt-4 -mb-3">
            {{ item.currency }} {{ item.price }} 起
        </p>
        <button>
            
        </button>
    </template>
</Card>
</div>
</template>
<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

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
