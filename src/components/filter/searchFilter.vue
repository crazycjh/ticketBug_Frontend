<template>
	<div class="flex flex-col gap-7">
		<div v-if="airportSet.airportList">
			<h4 class=" mb-1">目的地</h4>
			<div class="flex flex-wrap gap-2 w-60">
				<div  v-for="(item, index) in airportSet.airportList" :key="index" class="flex items-center w-[70px]">
					<Checkbox
						v-model="destination"
						:inputId= "`airport${index}`"
						name="destination"
						:value="item.airport"
					/>
					<label :for="`airport${index}`" class="ml-2"> {{ item.airport }} </label>
				</div>
			</div>
		</div>
		<div>
			<h4 class=" mb-1">出發抵達日期</h4>
			<div class="flex flex-col gap-2 w-60">
				<div  v-for="(item, index) in dateSet" :key="index" class="flex items-center w-[70px]">
					<Checkbox
						v-model="date"
						:inputId= "`date_${index}`"
						name="date"
						:value="item"
					/>
					<label :for="`airport${index}`" class="ml-2"> {{ item }} </label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';

const emit = defineEmits(['filterCondiction']);


const destination = ref(null);
const date = ref(null);
const props = defineProps({
    airportSet: {
		type: Object,
		default: () => {
			return { airportList: [], location: '' }
}
	},
	dateSet: {
		default: () => {
			return [];
		}
	},
})

if(props.airportSet.airportList) {
	destination.value = props.airportSet.airportList.map((item) => {
			return item.airport;
	})
}

date.value = props.dateSet.map((item) => {
	return item;
})
console.log(date.value)



// const destinationInfo = ref({location: props.airport.location.split(' ')[1], destination: destination.value});


watch([destination, date], () => {
    console.log(date.value);
	nextTick(()=> {
        emit('filterCondiction', {date: date.value, airport: destination.value});
    });
})


// 傳進資料


// 傳進來的list以地點、月份 來分

</script>

<style></style>
