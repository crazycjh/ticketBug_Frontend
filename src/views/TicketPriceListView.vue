<script setup>
import { ref, watch } from "vue";

import SkeletonComponent from '../utility/skeleton.vue'

const isLoading = ref(true);
const fullPage = ref(false);
const items = ["prg", "cdg", "lhr"];
</script>

<template>
  <!-- 在手機模式移除aside，在平板模式縮窄寬度同時並且把字體變小孩有icon -->
  <div class="flex">
    <aside class="w-[360px] bg-red-300"></aside>
    <main id="areaLoading">
      <div class=" flex justify-center" >
        <div class="w-2/3">
            <SkeletonComponent width="4rem" height="2rem" ></SkeletonComponent>
        </div>
      </div>
      <div class="flex flex-col items-center gap-3 mt-3 bg-su">
        <Card v-for="(item, index) in items" :key="index" class="w-2/3">
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
    </main>
    <!-- 是否要做分頁(這樣比較加分) -->
  </div>
</template>
