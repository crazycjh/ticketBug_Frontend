<script setup>
import { ref, watch, computed, onMounted } from "vue";
import axios from 'axios'

import SkeletonComponent from '../utility/skeleton.vue'

const isloading = ref(true);
const items = ["prg", "cdg", "lhr", "prg1", "cdg1", "lhr1"];
const skeletonHeight = 20;
const containerHeight = ref(500);
const skeletonCount = ref(0);


const DateValue = ref([1, 20]);

onMounted(async()=> {
  const resp = await axios()
})

onMounted(()=> {
  containerHeight.value = window.innerHeight - 200;
  skeletonCount.value = Math.ceil(containerHeight.value / skeletonHeight);
  setTimeout(()=>{
    isloading.value=false;
  }, 2000)
});


watch(DateValue,(val) => {
  console.log(val);
});
</script>

<template>
  <!-- 在手機模式移除aside，在平板模式縮窄寬度同時並且把字體變小孩有icon -->
  <div class="flex container">
    <aside class="w-[300px] bg-red-300 min-w-[300px] ">
      <div class="flex flex-col items-center gap-20 mt-16">
        <!-- 依照目的地數量產生出發時間 -->
        <!-- 第一段 -->
        <Slider v-model="DateValue" range :min="0" :max="24" :step="0.5" class="w-14rem" />
        
        <!-- 第二段 -->
        <Slider v-model="DateValue" range :min="0" :max="24" :step="0.5" class="w-14rem" />
      </div>
    </aside>
    <main id="areaLoading" class="grow">

      <div class="flex flex-col items-center gap-3 mt-3 ">
        <div  v-if="isloading" class="w-3/4">
          <Card v-for="n in skeletonCount" :key="n"  class="mb-4">
            <template #content>
            <SkeletonComponent ></SkeletonComponent>
            </template>
          </Card>
        </div>
        <div v-else class="w-full">
          <Card  v-for="(item, index) in items" :key="index" class="mb-4 w-3/4 mx-auto">
            <template #title> Simple Card </template>
            <template #content>
              {{ item }}
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione
                quam perferendis esse, cupiditate neque quas!
              </p>
            </template>
          </Card>
        </div>
      </div>
    </main>
    <!-- 是否要做分頁(這樣比較加分) -->
  </div>
</template>
<style>
.container {
  height:ca
}
</style>