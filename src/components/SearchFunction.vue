<script setup>
import { ref, watch } from "vue";

const airport_1 = ref("");
const airport_2 = ref("");
watch(airport_1, (val) => {
  console.log(val, " 這是airport_1 ");
});
</script>

<template>
  <section
    class=" flex flex-wrap max-w-7xl justify-center items-center gap-1 mx-auto mt-14"
  >
    <div class="flex w-3/4 gap-1">
      <div class="w-1/2 h-">
        <!-- <InputText
          v-model="airport_1"
          placeholder="出發地"
          :pt="{ root: 'w-32' }"
        /> -->
        <InputText
          v-model="airport_1"
          placeholder="出發地"
          :pt="{ root: 'w-full h-16' }"
					class="pl-10"
        />
      </div>
      <div class="relative w-1/2">
        <div
          class="w-10 h-10 bg-gray-100 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-spacing-3 border-l-yellow-300 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </div>
        <InputText
          v-model="airport_2"
          placeholder="目的地"
          :pt="{ root: 'w-full ' }"
          class="h-16 pl-10 "
        />
        <!-- <InputText
          v-model="airport_2"
          placeholder="目的地"
          :pt="{ root: 'w-32' }"
        /> -->
      </div>
    </div>
    <primeButton class="h-16 ml-2 " label="搜尋" :pt="{root:'!bg-sky-800 !text-gray-50'}"/>
  </section>
</template>
