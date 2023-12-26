<script setup>
// import { ref } from 'vue';

import searchArea from './components/SearchFunction.vue'
import MenuBar from './components/home/header/MenuBar.vue'

import { computed } from 'vue';
import { RouterView, routeLocationKey, useRoute } from "vue-router";


const route = useRoute();

const ishomePage = computed(() => {
  switch (route.path) {
    case '/flighhome' :
      return true;
    case '/ticketlist':
      return false;
    default :
      return true;
  }
})

</script>

<template>
  <div class="bg-sky-600 pb-14 drop-shadow-md">
    <header class="mx-auto max-w-7xl bg-sky-600">
      <nav>
        <MenuBar/>
      </nav>
      <div class="">
        <h2 v-show="ishomePage" class="mt-16  text-5xl text-center text-slate-800 font-bold">一鍵搜尋，爬出所有便宜機票。</h2>
      </div>
      <searchArea/>
    </header>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
