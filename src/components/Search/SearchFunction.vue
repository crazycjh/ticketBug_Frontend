<script setup>
import { nextTick, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQueryStore } from "@/stores/query";


import { getExpediaAirportInfo }  from '../../utility/getAirportCode'

const router = useRouter();
const route = useRoute();
const store = useQueryStore();
const { changeQueryState } = store;

const roundOpen =  ref("round")
const airport_1 = ref("");
const airport_2 = ref("");
const airport_3 = ref("");
const serchResult = ref([]);


const roundBtnClass = ref({root: '!bg-sky-800 !text-gray-50'});
const openBtnClass = ref({root: '!bg-transparent !text-gray-800  border-transparent'});


const roundOpenSwitch = (value) => {
	roundOpen.value = value;

	if(value === 'round') {
		roundBtnClass.value = {root: '!bg-sky-800 !text-gray-50'};
		openBtnClass.value = {root: '!bg-transparent !text-gray-800 border-transparent'};
		console.log(openBtnClass.value.root );
	}else {
		roundBtnClass.value = {root: '!bg-transparent !text-gray-800 border-transparent'};
		openBtnClass.value = {root: '!bg-sky-800 !text-gray-50'};
	}
};


// 搜尋機場code
const searchCode = (event) => {
    let query = event.query;
	serchResult.value = getExpediaAirportInfo(query);
	// getAirportInfo 修改成單一職責
};

// 搜尋便宜機票
const search = async() => {
	let params = ''
	console.log(airport_1.value, airport_2.value,airport_3.value)
	let currentParams = '';
	currentParams = Object.keys(route.query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(route.query[key])}`)
    .join('&');

	console.log(currentParams);
	if(roundOpen.value === 'round') {
		// console.log('1111111111')
		params = 'type=0'
		// 來回
		if(airport_1.value || airport_2.value) {
			params += airport_1.value ? `&airport1=${airport_1.value.value}`: '';
			params += airport_2.value ? `&airport2=${airport_2.value.value}`: '';
			await router.push(`/ticketlist/?${params}`);
			if (currentParams === params){
				changeQueryState(true);
			}
		}else{
			console.log('至少輸入一個')
			return ;
		}
	}else if(roundOpen.value === 'open') {
		if(airport_1.value === null && (airport_2.value === null && airport_3.value === null)){
			console.log('至少輸入一個')
			return;
		}
		params = 'type=1'
		if(airport_1.value.value || airport_2.value.value || airport_3.value.value) {
			params += airport_1.value ? `&airport1=${airport_1.value.value}`: '';
			params += airport_2.value ? `&airport2=${airport_2.value.value}`: '';
			params += airport_3.value ? `&airport3=${airport_3.value.value}`: '';
			await router.push(`/ticketlist/?${params}`);
			if (currentParams === params){
				changeQueryState(true);
			}
		}else{
			console.log('至少輸入一個')
			return ;
		}
	}
	// 參數照舊點擊搜尋
	return;

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
				<div class="grow basis-1/2" :class="{ roundOpenClass: roundOpen==='open' }">
					<!-- <InputText
						v-model="airport_1"
						placeholder="出發地"
						:pt="{ root: 'w-32' }"
					/> -->
					<!-- <InputText
						v-model="airport_1"
						placeholder="出發地"
						:pt="{ root: 'w-full h-16' }"
						class="pl-10"
					/> -->
					<AutoComplete
						v-model="airport_1"
						:suggestions="serchResult"
						optionLabel="name"
						@complete="searchCode"
						forceSelection
						placeholder="出發地"
						:pt="{
							root:'w-full',
							input: 'w-full pl-7'
						}"
						class="h-16 "
					/>
				</div>
				<div class="relative grow basis-1/2">
					<div
						class="w-10 h-10 bg-gray-100 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-spacing-3 border-l-yellow-300 flex justify-center items-center cursor-pointer z-10"
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
					<!-- <InputText
						v-model="airport_2"
						placeholder="目的地"
						:pt="{ root: 'w-full ' }"
						class="h-16 pl-10 "
					/> -->
					<AutoComplete
						v-model="airport_2"
						:suggestions="serchResult"
						optionLabel="name"
						@complete="searchCode"
						forceSelection
						placeholder="目的地"
						:pt="{
							root:'w-full',
							input: 'w-full pl-10'
						}"
						class="h-16 "
					/>
					<AutoComplete
						v-if="roundOpen==='open'"
						v-model="airport_3"
						:suggestions="serchResult"
						optionLabel="name"
						@complete="searchCode"
						forceSelection
						placeholder="目的地2"
						:pt="{
							root:'w-full',
							input: 'w-full pl-10'
						}"
						class="h-16 "
					/>
					<!-- <InputText
						v-if="roundOpen==='open'"
						v-model="airport_3"
						placeholder="目的地 2"
						forceSelection
						:pt="{ root: 'w-full ' }"
						class="h-16 pl-10 mt-2"
					/> -->
					<!-- <InputText
						v-model="airport_2"
						placeholder="目的地"
						:pt="{ root: 'w-32' }"
					/> -->
				</div>
				<div class="grow-0">
					<primeButton class="ml-2 h-" @click="search" :class="roundOpen==='open' ? 'h-[8.25rem]' : 'h-16'" label="搜尋" :pt="{root:'!bg-sky-800 !text-gray-50'}"/>
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
