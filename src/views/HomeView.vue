<script setup>
// import { ref, watch } from 'vue';
import searchArea from '../components/SearchFunction.vue'
import MenuBar from '../components/home/header/MenuBar.vue'
import flightPriceArea from '../components/home/header/flightPriceArea.vue';
</script>

<template>
  <main class="h-screen drop-shadow-md">
    <div class="bg-sky-600 ">
      <header class="mx-auto max-w-7xl bg-sky-600 h-96 ">
        <nav>
          <MenuBar/>
        </nav>
        <div class="">
          <h2 class="mt-16  text-5xl text-center text-slate-800 font-bold">一鍵搜尋，爬出所有便宜機票。</h2>
        </div>
        <searchArea/>
      </header>
    </div>
    <section>
      <!-- info area 便宜機票card 列表 -->
      <flightPriceArea/>
    </section>
  </main>
</template>
