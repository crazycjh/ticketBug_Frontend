<script setup>
import { ref, watch } from "vue";
const roundOpen =  ref("round")
const airport_1 = ref("");
const airport_2 = ref("");
const airport_3 = ref("");

const roundBtnClass = ref({root: '!bg-sky-800 !text-gray-50'});
const openBtnClass = ref({root: '!bg-transparent !text-gray-800  border-transparent'});

watch(airport_1, (val) => {
  console.log(val, " 這是airport_1 ");
});


// 來回、開口按鈕
watch(roundOpen, (val)=> {
	console.log(val);
});

const roundOpenSwitch = (change) => {
	roundOpen.value = change;

	if(change === 'round') {
		roundBtnClass.value = {root: '!bg-sky-800 !text-gray-50'};
		openBtnClass.value = {root: '!bg-transparent !text-gray-800 border-transparent'};
		console.log(openBtnClass.value.root );
	}else {
		roundBtnClass.value = {root: '!bg-transparent !text-gray-800 border-transparent'};
		openBtnClass.value = {root: '!bg-sky-800 !text-gray-50'};
	}
};
</script>

<template>
  <section
    class=" flex flex-wrap max-w-7xl justify-center items-center gap-1 mx-auto mt-14 bg-sky-600"
  >
    <div class=" w-3/4 ">
			<div class="flex gap-1 mb-1">
				<!-- button 多個 -->
				<primeButton @click="roundOpenSwitch('round')" class="h-12 " label="來回" :pt="roundBtnClass"/>
				<primeButton @click="roundOpenSwitch('open')" class="h-12" label="開口" :pt="openBtnClass"/>
			</div>
			<div class="flex gap-1 ">
				<div class="grow" :class="{ roundOpenClass: roundOpen==='open' }">
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
				<div class="relative grow">
					<div
						class="w-10 h-10 bg-gray-100 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-spacing-3 border-l-yellow-300 flex justify-center items-center cursor-pointer"
						:class=" {'-rotate-90 left-1/2' : roundOpen==='open'} "
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
					<InputText
						v-if="roundOpen==='open'"
						v-model="airport_3"
						placeholder="目的地 2"
						:pt="{ root: 'w-full ' }"
						class="h-16 pl-10 mt-2"
					/>
					<!-- <InputText
						v-model="airport_2"
						placeholder="目的地"
						:pt="{ root: 'w-32' }"
					/> -->
				</div>
				<div class="grow-0">
					<primeButton class="ml-2 h-" :class="roundOpen==='open' ? 'h-[8.25rem]' : 'h-16'" label="搜尋" :pt="{root:'!bg-sky-800 !text-gray-50'}"/>
				</div>
			</div>
    </div>
  </section>
</template>
<style>
.roundOpenClass {
	display: flex;
	align-items: center;
}
</style>
