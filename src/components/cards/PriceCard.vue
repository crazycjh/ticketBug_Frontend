<template>
	<!-- <div v-for="date in priceList" :key="date">
		<div v-for="airport in date" :key="airport"> -->
	<div class=" h-full">
		<RecycleScroller
			class="scroller "
			:items="showList"
			:item-size="256"
			key-field="id"
			v-slot="{ item }"
		>
			<div class=" h-[256%] flex justify-center w-full">
				<Card class="mb-4   w-[500px] lg:w-[800px]  item"> 
					<template #content>
						<div class="flex gap-3 items-center w-full">
							<div class="flex flex-col gap-10 w-10/12">
								<div class="flex items-center gap-4">
									<!-- 出發 -->
									<!-- 目的地 -->
									<div class="text-lg font-medium whitespace-nowrap">
										{{
											item.item.date_1.slice(4, 6) +
											"/" +
											item.item.date_1.slice(6)
										}}
									</div>
									<div class="">{{ item.item.airport_1 }}</div>
									<div
										class="arrow-right relative flex items-center w-11/12 justify-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xml:space="preserve"
											viewBox="0 0 12 12"
											class="absolute top-2/4 -right-5 w-4 h-4 -translate-y-2/4"
										>
											<path
												fill="#898294"
												d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"
											></path>
										</svg>
										<div class="flex justify-center text-xs mt-10">
											{{ item.item.layover_info }}
										</div>
									</div>
									<div class="ml-6">{{ item.item.airport_2 }}</div>
								</div>
								<div class="flex items-center gap-4">
									<!-- 目的 -->
									<!-- 出發地 -->
									<div class="text-lg whitespace-nowrap">
										{{
											item.item.date_2.slice(4, 6) +
											"/" +
											item.item.date_2.slice(6)
										}}
									</div>
									<div>{{ item.item.airport_2 }}</div>
									<div
										class="arrow-right relative flex items-center w-11/12 justify-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xml:space="preserve"
											viewBox="0 0 12 12"
											class="absolute top-2/4 -right-5 w-4 h-4 -translate-y-2/4"
										>
											<path
												fill="#898294"
												d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"
											></path>
										</svg>
									</div>
									<div class="ml-6">{{ item.item.airport_1 }}</div>
								</div>
							</div>
							<div class="self-center flex flex-col gap-2">
								<!-- 三個按鈕 -->
		
								<!-- 三個按鈕 傳入圖片 -->
								<primeButton
									class="h-8"
									label=""
									:pt="{ root: '!p-1' }"
									@click="
										expediaClick(
											{
												date: {
													date1: item.item.date_1,
													date2: item.item.date_2,
												},
												location: {
													from: item.item.airport_1,
													to: item.item.airport_2,
												},
											},
											'RT'
										)
									"
								>
									<div class="expediaLogo ">
										<expediaLogo/>
									</div>
								</primeButton>
								<primeButton
									class="h-8"
									label=""
									:pt="{ root: '!p-1' }"
									@click="
										skyscannerClick(
											{
												date: {
													date1: item.item.date_1,
													date2: item.item.date_2,
												},
												location: {
													from: item.item.airport_1,
													to: item.item.airport_2,
												},
											},
											'RT'
										)
									"
								>
									<div class="skyscannerLogo">
										<skyscannerLogo />
									</div>
								</primeButton>
								<primeButton
									class="h-8"
									label=""
									@click="
										tripComClick(
											{
												date: {
													date1: item.item.date_1,
													date2: item.item.date_2,
												},
												location: {
													from: item.item.airport_1,
													to: item.item.airport_2,
												},
											},
											'RT'
										)
									"
								>
									<div class="triplogo">
										<tripLogo />
									</div>
								</primeButton>
							</div>
						</div>
						<div
							class="flex justify-end mt-6 -mb-5 font-bold whitespace-nowrap tracking-wide text-xl cursor-pointer"
							@click="
								openThree(
									{
										date: {
											date1: item.item.date_1,
											date2: item.item.date_2,
										},
										location: {
											from: item.item.airport_1,
											to: item.item.airport_2,
										},
									},
									'RT'
								)
							"
						>
							$NTD
							{{ formatNumberWithCommas(Number(item.item.price)) }}
						</div>
					</template>
				</Card>
	
			</div>
		</RecycleScroller>

	</div>
	<!-- </div>
	</div> -->
</template>
<script setup>
import { ref, watch } from "vue";
import {
	convertAirportCodeToCityCountry,
	getExpediaAirportInfoByCode,
} from "../../utility/getAirportCode";
import skyscannerLogo from "../icons/skyscannerLogo.vue";
import tripLogo from "../icons/tripLogo.vue";
import expediaLogo from "../icons/expediaLogo.vue";
import {
	expediaClick,
	skyscannerClick,
	tripComClick,
} from "../../utility/clickSearch";

// import expedia from '@/assets/otaLogos/Expedia_Logo.svg'
const props = defineProps(["data", "originalData"]);

const date_array = ref([]);
// 拆解日期
// 取得城市國家
// convertAirportCodeToCityCountry()
const priceList = ref();
priceList.value = JSON.parse(JSON.stringify(props.data));
const showList = ref([]);
const counter = ref(0);
Object.keys(priceList.value).forEach((key) =>
	Object.keys(priceList.value[key]).forEach((key2) => {
		Object.keys(priceList.value[key][key2]).forEach((key3) => {
			showList.value.push({
				item: priceList.value[key][key2][key3],
				id: counter.value,
			});
			counter.value += 1;
		});
	})
);
console.log(showList.value);
// priceList.value.forEach((item) => {
// 	item.item.dateShort_1 = item.item.date_1.slice(4, 6) + "/" + item.item.date_1.slice(6);
// 	item.item.dateShort_2 = item.item.date_2.slice(4, 6) + "/" + item.item.date_2.slice(6);
// 	item.item.price = formatNumberWithCommas(Number(item.item.price));
// });

//
// const expediaClick = (info, type) => {
// 	// date, location
// 	// 拆解日期
// 	// 解析出發目的地code
//     const fromDate = splitDate( info.date.date1 );
//     const toDate = splitDate( info.date.date2 );

// 	// 查詢code
// 	const from = getExpediaAirportInfoByCode(info.location.from);
// 	const to = getExpediaAirportInfoByCode(info.location.to);
// 	console.log(from, to);

// 	const adultNum = 1;
// 	const url = `https://www.expedia.com.tw/Flights-Search?flight-type=on&mode=search&trip=roundtrip&langid=1033&leg1=from:${from.city}, ${from.country} (${from.code}),to:${to.city},${to.country}(${to.code}),departure:${fromDate.year}/${fromDate.month}/${fromDate.day}TANYT&leg2=from:${to.city}, ${to.country} (${to.code}),to:${from.city}, ${from.country} (${from.code}),departure:${toDate.year}/${toDate.month}/${toDate.day}TANYT&options=cabinclass:economy&fromDate=${fromDate.year}/${fromDate.month}/${fromDate.day}&toDate=${toDate.year}/${toDate.month}/${toDate.day}&d1=${fromDate.year}-${fromDate.month}-${fromDate.day}&d2=${toDate.year}-${toDate.month}-${toDate.day}&passengers=adults:${adultNum},infantinlap:N`;
// 	window.open(url, "_blank");
// };

const openThree = (info, type) => {
	expediaClick(info, type);
	skyscannerClick(info, type);
	tripComClick(info, type);
};

function formatNumberWithCommas(number) {
	return new Intl.NumberFormat().format(number);
}

watch(
	() => props.data,
	(newValue, oldValue) => {
		// console.log(newValue);
		console.log("priceCard");
		priceList.value = props.data;
		priceList.value.forEach((item) => {
			item.item.dateShort_1 =
				item.item.date_1.slice(4, 6) + "/" + item.item.date_1.slice(6);
			item.item.dateShort_2 =
				item.item.date_2.slice(4, 6) + "/" + item.item.date_2.slice(6);
			item.item.price = formatNumberWithCommas(Number(item.item.price));
		});
	}
);
</script>
<style>
.arrow-right,
.arrow-left {
	/* width: 300px; */
	height: 2px;
	background-color: #fafafa;
	position: relative;
	border-radius: 10px;
}

.scroller {
	/* height: calc(100vh - 360px) !important; */
	height: 100% !important;
	scrollbar-width: none;
}

.skyscannerLogo svg {
	height: 30px;
}

.triplogo svg {
	height: 16px;
}

.expediaLogo svg {
	width: 100%;
}
/* .arrow-right:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    border-width: 7px; 
    border-style: solid;
    border-color: transparent transparent transparent white; 

    transform: translate(55%, -50%);
}

.arrow-left:after {
    content: '';
    position: absolute;
    left: 0; 
    top: 50%;
    border-width: 7px; 
    border-style: solid;
    border-color: transparent white transparent transparent;

    transform: translate(-55%, -50%);
} */
</style>
