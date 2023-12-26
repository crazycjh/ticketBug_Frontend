<script setup>
// import { ref, watch } from 'vue';

import flightPriceArea from '../components/home/header/flightPriceArea.vue';
</script>

<template>
  <main class="h-screen drop-shadow-md">
    <section>
      <!-- info area 便宜機票card 列表 -->
      <flightPriceArea from="Taipei 出發"/>
    </section>
  </main>
</template>
