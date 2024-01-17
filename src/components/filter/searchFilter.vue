<template>
	<div v-for="(item, index) in airport.airportList" :key="index" class="flex items-center w-[70px]">
		<Checkbox
			v-model="destination"
			:inputId= "`airport${index}`"
			name="destination"
			:value="item.airport"
		/>
		<label :for="`airport${index}`" class="ml-2"> {{ item.airport }} </label>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    airport: Object
})

const destination = ref();

// 傳進資料


// 傳進來的list以地點、月份 來分

</script>

<style></style>
