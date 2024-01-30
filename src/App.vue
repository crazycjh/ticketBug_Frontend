<script setup>
// import { ref } from 'vue';

import searchArea from './components/Search/SearchFunction.vue'
import MenuBar from './components/home/header/MenuBar.vue'

import { computed, onMounted } from 'vue';
import { RouterView, useRoute } from "vue-router";

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import axios from 'axios';


onMounted(async ()=> {
  switch (route.path) {
    case '/flighhome' :
      return true;
    case '/ticketlist':
      return false;
    default :
      return false;
  }
})

const test = () => {
  htmlToImage.toJpeg(document.getElementById('test'), { quality: 0.95 })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataUrl;
    link.click();
  });
}



const route = useRoute();

const ishomePage = computed(() => {
  switch (route.path) {
    case '/flighhome' :
      return true;
    case '/ticketlist':
      return false;
    default :
      return false;
  }
});

const isMemberCenter = computed(() => {
  console.log('isMemberCentrt')
  switch (route.path) {
    case '/membercenter' :
      return false;
    default :
      return true;
  }
});

</script>

<template>
  <!-- <button type="button" @click="test" class=" cursor-pointer">生成拉</button> -->
  <div class="bg-sky-600 pb-14 drop-shadow-md" id="test">
    <header class="mx-auto max-w-7xl bg-sky-600">
      <nav>
        <MenuBar/>
      </nav>
      <div v-show="isMemberCenter">
        <h2 v-show="ishomePage" class="mt-16  text-5xl text-center text-slate-800 font-bold">一鍵搜尋，爬出所有便宜機票。</h2>
      </div>
      <searchArea v-show="isMemberCenter"/>
    </header>
  </div>
  <!-- <button type="button" @click="test" class=" cursor-pointer">生成拉</button> -->
  <RouterView />
</template>

<style scoped>

</style>
