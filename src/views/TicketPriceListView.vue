<script setup>
import { ref, watch, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useQueryStore } from "@/stores/query.js";

import { storeToRefs } from "pinia";

import axios from "axios";

import SkeletonComponent from "../utility/skeleton.vue";

import searchFilter from "../components/filter/searchfilter.vue";
import PriceCard from "../components/cards/PriceCard.vue";

const route = useRoute();

// setting
const isloading = ref(true);


// skeleton 設定
const skeletonHeight = 400;
const containerHeight = ref(500);
const skeletonCount = ref(0);

const DateValue = ref([1, 20]);

const store = useQueryStore();

// for Query
const { isQuery } = storeToRefs(store);
const { changeQueryState } = store;
let originalData = ref(null);
const queryData = ref(null);
const airportSet = ref(null);
const dateSet = ref(null);

// 篩選條件
const filterCondiction = { date: null, airport: null };

onMounted(async () => {
	containerHeight.value = window.innerHeight - 200;
	skeletonCount.value = Math.ceil(containerHeight.value / skeletonHeight);
	console.log("route.query.length");
	console.log(route.query.length);
	console.log(isQuery.value);
	await doQuery();
});

// 處理重複的相同Qurey的內容，發出請求(假設資料可能會在短時間更新)
watch(isQuery, async (newisQuery, oldisQuery) => {
	if (isQuery.value) {
		isloading.value = true;
		await doQuery();
	}
	changeQueryState(false);
});

// query如果有變動則執行Query
watch(
	() => route.query,
	async (newQuery, oldQuery) => {
		// 檢查若是只有改變page則不用重複query
		if ("page" in newQuery || "page" in oldQuery) {
			delete newQuery.page;
			delete oldQuery.page;
			const equal = checkQueryEqual(newQuery, oldQuery);
			if (equal) {
				return;
			}
		}
		isloading.value = true;
		await doQuery();
	}
);

watch(
	() => route.query.page,
	(newPage, oldPage) => {
		console.log(newPage);
	}
);

function checkQueryEqual(newQuery, oldQuery) {
	const keys1 = Object.keys(newQuery);
	const keys2 = Object.keys(oldQuery);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (newQuery[key] !== oldQuery[key]) {
			return false;
		}
	}

	return true;
}

async function doQuery() {
	// 清空資料
	queryData.value = null;
	airportSet.value = null;
  dateSet.value = null;
	const queryString = Object.keys(route.query)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(
					route.query[key]
				)}`
		)
		.join("&");
	console.log(
		`${import.meta.env.VITE_BACKEND_URL}/api/v1/ticketList/?${queryString}`
	);
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/ticketList/?${queryString}`
    );
    queryData.value = JSON.parse(JSON.stringify(resp.data.data.data));
    originalData.value = JSON.parse(JSON.stringify(resp.data.data.data));
    airportSet.value = resp.data.data.airportSet;
    dateSet.value = resp.data.data.dateSet;

    isloading.value = false;
  }catch(error) {
    console.error(error, ' 資料庫連線錯誤');
  }
}

function sortData(data) {
  // RT 以query的type來判斷
  const indexedData = data.reduce((acc, item) => {
    let firstLevelIndex;

    if(route.query.type === '0'){
      firstLevelIndex = item.airport_2;
    }else if(route.query.type === '1'){
      firstLevelIndex = item.airport_2 + '-' + item.airport_2;
    }

    if( !acc[firstLevelIndex]) {
      acc[firstLevelIndex] = {};
    }

    const dateIndex = item.date_1 + '-' + item.date_2;
    acc[firstLevelIndex][dateIndex] = item;
    return acc;
    }, {})
    return indexedData;
}

const doFilter = (filterInfo) => {
	isloading.value = true;

const filteredDateData = {};
filterInfo.date.forEach((dateTime) => {
filterInfo.airport.forEach((airport) => {
	if(originalData.value[dateTime] && originalData.value[dateTime][airport]) {
	if(!filteredDateData[dateTime]) {
		filteredDateData[dateTime] = {};
		if(!filteredDateData[dateTime][airport]) {
		filteredDateData[dateTime][airport] = [];
		}
	}
	filteredDateData[dateTime][airport] = originalData.value[dateTime][airport]

	}
})
})
console.log(filteredDateData);
queryData.value = filteredDateData;
setTimeout(() => {
		// queryData.value = JSON.parse(
		// 	JSON.stringify(
		// 		originalData.value.filter((priceInfo) => {
		// 			filterInfo.forEach(( item ) => {
    //         // 跑日期跟地點
    //         for(const key in item) {
    //           item[key].forEach((filterItem) => {

    //           })
    //         }
    //       })
    //       // if (
		// 			// 	filterInfo.location[0].destination.includes(
		// 			// 		priceInfo[`airport_${filterInfo.location[0].index}`]
		// 			// 	)
		// 			// ) {

		// 			// 	return true;
		// 			// }
		// 		})
		// 	)
		// );
		isloading.value = false;
	});
};
</script>

<template>
	<!-- 在手機模式移除aside，在平板模式縮窄寬度同時並且把字體變小包含icon -->
	<div class="md:flex w-full">
		<aside class="hidden w-[300px] min-w-[250px] lg:block">
			<div class="flex flex-col items-center gap-20 mt-16">
				<!-- 依照目的地數量產生出發時間 -->
				<!-- 第一段 -->
				<Slider
					v-model="DateValue"
					range
					:min="0"
					:max="24"
					:step="0.5"
					class="w-14rem"
				/>
				<!-- 第二段 -->
				<Slider
					v-model="DateValue"
					range
					:min="0"
					:max="24"
					:step="0.5"
					class="w-14rem"
				/>
					<!-- 改寫到一隻檔案中，並且傳入資料，讓其可以把目的地列出 -->
						<!-- <h4 class="mb-2 pl-1">{{ item.location }}</h4> -->
 <!--  -->
        <searchFilter v-if="airportSet && dateSet"
		@filter-condiction="doFilter"
		:airport-set="airportSet"
		:date-set="dateSet"
        />
        <!-- 傳入dateSet, airportSet -->

					<!--  -->
			</div>
		</aside>
		<main id="areaLoading" class="grow">
			<div
				class="llg:flex llg:flex-col llg:items-center llg:gap-3 mt-3 mx-6 w-full"
			>
				<div v-if="isloading" class="w-full md:w-3/4">
					<Card v-for="n in skeletonCount" :key="n" class="mb-4">
						<template #content>
							<SkeletonComponent />
						</template>
					</Card>
				</div>
				<div v-else class="md:w-3/4">
					<!-- 傳入data -->
					<PriceCard :data="queryData" :originalData="queryData"/>
				</div>
			</div>
		</main>
		<!-- 是否要做分頁(這樣比較加分) -->
	</div>
</template>
<style></style>
