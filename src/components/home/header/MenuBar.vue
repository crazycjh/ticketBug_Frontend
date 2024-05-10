<template>
	<div class="card flex justify-between">
		<div
			class="flex items-center ml-10 gap-3 mt-10 cursor-pointer"
			@click="() => router.push('/flighhome')"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-12 h-12 stroke-slate-200 z-10"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 stroke-slate-200 ml-3 -mr-3 -rotate-45"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
				/>
			</svg>

			<h1
				class="font-semibold font-sans text-slate-200 text-3xl tracking-wider"
			>
				FlightBug
			</h1>
		</div>
		<section class="flex">
			<Menu-bar
				:model="items"
				class="rounded-none border-none bg-inherit"
				:pt="{
					root: '!bg-inherit',
					menu: '!-left-24 sm:!left-0 !w-auto sm:!w-auto !bg-sky-600 ',
				}"
			>
				<template #item="{ item, props, hasSubmenu }">
					<router-link
						v-if="item.route"
						v-slot="{ href, navigate }"
						:to="item.route"
						custom
					>
						<a
							v-ripple
							:href="href"
							v-bind="props.action"
							@click="navigate"
						>
							<span :class="item.icon" />
							<span class="ml-2">{{ item.label }}</span>
						</a>
					</router-link>
					<a
						v-else
						v-ripple
						:href="item.url"
						:target="item.target"
						v-bind="props.action"
					>
						<span :class="item.icon" />
						<span class="ml-2">{{ item.label }}</span>
						<span
							v-if="hasSubmenu"
							class="pi pi-fw pi-angle-down ml-2"
						/>
					</a>
				</template>
			</Menu-bar>
			<div
				class="flex self-center max-xl:pr-3 cursor-pointer relative"
				@click="toggleNotification"
				aria-haspopup="true"
				aria-controls="overlay_panel"
			>
				<i
					class="pi pi-bell relative text-[#e5e7eb]"
					style="font-size: 1.2rem"
				/>
				<Badge
					v-show="notifyCounterValue"
					:value="notifyCounterValue"
					severity="danger"
					class="absolute -left-3 -top-4"
				></Badge>
			</div>
			<!-- :pt="{ root: '!bg-slate-100 w-full' }" -->
			<OverlayPanel
				ref="op"
				appendTo="body"
				:pt="{ root: 'w-[350px]  test overflow-y-auto h-[50vh]' }"
			>
				<ul
					class="flex flex-col gap-3 border-b-blue-100 items-center w-full"
				>
					<li
						v-for="(item, key, index) in notifyList"
						:key="index"
						class="w-full"
					>
						<Card
							:pt="{
								root: '!p-0',
								body: '!p-0',
								content: '!py-2 !px-0',
							}"
						>
							<template #content>
								<div class="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24"
										class="fill-sky-400"
									>
										<path
											d="M624-104 520-280H400q-17 0-28.5-11.5T360-320q0-17 11.5-28.5T400-360h120l104-176h44l-52 176h114l30-40h40l-24 80 24 80h-40l-30-40H616l52 176h-44ZM292-424l52-176H230l-30 40h-40l24-80-24-80h40l30 40h114l-52-176h44l104 176h120q17 0 28.5 11.5T600-640q0 17-11.5 28.5T560-600H440L336-424h-44Z"
										/>
									</svg>
									<p class="tracking-wider">
										{{ item.airport_1 }}
										{{
											item.type === "1"
												? item.airport_2
												: ""
										}}
										{{ item.airport_3 }}
										{{
											item.type === "0" ? "來回" : "開口"
										}}
									</p>
								</div>
								<div class="flex gap-4">
									<p class="tracking-wide text-sm">
										{{ item.date_1 }}去 {{ item.date_2 }}回
									</p>
									<p class="tracking-normal text-sm text-teal-500">
										$NT {{ item.price }}起
									</p>
								</div>

								<div class="flex justify-end mt-1">
									<div class="flex gap-2">
										<!-- 三個按鈕 -->

										<!-- 三個按鈕 傳入圖片 -->
										<primeButton
											class="h-6 w-16"
											label=""
											:pt="{ root: '!p-0' }"
											@click="
												expediaClick(
													{
														date: {
															date1: item.date_1,
															date2: item.date_2,
														},
														location: {
															from: item.airport_1,
															to: item.airport_2,
														},
													},
													'RT'
												)
											"
										>
											<img
												src="@/assets/otaLogos/Expedia_Logo.svg"
												alt=""
												class="w-[105%] max-w-none relative"
											/>
										</primeButton>
										<primeButton
											class="h-6 w-16"
											label=""
											:pt="{ root: '!px-1 !py-2' }"
											@click="
												skyscannerClick(
													{
														date: {
															date1: item.date_1,
															date2: item.date_2,
														},
														location: {
															from: item.airport_1,
															to: item.airport_2,
														},
													},
													'RT'
												)
											"
										>
											<img
												src="@/assets/otaLogos/Skyscanner_Logo.svg"
												alt=""
												class="w-[90%] bottom-0 relative"
											/>
										</primeButton>
										<primeButton
											class="h-6 w-16 overflow-hidden relative"
											label=""
											:pt="{ root: '!py-0 !px-1' }"
											@click="
												tripComClick(
													{
														date: {
															date1: item.date_1,
															date2: item.date_2,
														},
														location: {
															from: item.airport_1,
															to: item.airport_2,
														},
													},
													'RT'
												)
											"
										>
											<img
												src="@/assets/otaLogos/Tripcom_Logo.svg"
												alt=""
												class="h-[150%] relative"
											/>
										</primeButton>
									</div>
								</div>
							</template>
						</Card>
					</li>
				</ul>
			</OverlayPanel>
		</section>
	</div>
	<PrimeDialog
		v-model:visible="loginModalVisible"
		modal
		header="登入"
		:style="{ width: '25rem' }"
	>
		<span class="p-text-secondary block mb-5"
			>Update your information.</span
		>
		<div class="flex align-items-center gap-3 mb-3">
			<label for="username" class="font-semibold w-[6rem]"
				>Username</label
			>
			<InputText id="username" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex align-items-center gap-3 mb-5">
			<label for="email" class="font-semibold w-[6rem]">Email</label>
			<InputText id="Email" class="flex-auto" autocomplete="off" />
		</div>
		<!-- pi-google :pt="{ root: '!bg-inherit' }" -->
		<div class="flex justify-content-end gap-2 mb-3">
			<primeButton
				type="button"
				label="Cancel"
				severity="secondary"
				class="w-full"
				@click="loginModalVisible = false"
			></primeButton>
			<primeButton
				type="button"
				label="Login"
				class="w-full"
				@click="loginModalVisible = false"
			></primeButton>
		</div>

		<div class="flex flex-col items-center">
			<div class="mb-3">
				<p class="">or</p>
			</div>

			<primeButton
				type="button"
				icon="pi pi-google"
				label="Google 登入"
				@click="googleAuth"
				:pt="{ root: '!bg-slate-100 w-full' }"
			></primeButton>
		</div>
	</PrimeDialog>
</template>

<script setup>
import axios from "axios";

import { ref, computed, watch, onMounted, reactive, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import { useNotifyStore } from "../../../stores/notification";
import {
	connectWebSocket,
	callNotifyStore,
} from "../../../utility/webSocket/webSocket";

import {
	expediaClick,
	skyscannerClick,
	tripComClick,
} from "../../../utility/clickSearch";

const useAuth = useAuthStore();
const useNotify = useNotifyStore();
const router = useRouter();

const loginModalVisible = ref(false);
const notifyCounterValue = ref(useNotify.notifyCounter);
const hasSubmenu = ref(true);

// 推播通知
const op = ref(null);
const toggleNotification = (event) => {
	// 這裡的event
	console.log(event);
	op.value.toggle(event);
	getNotificationList();
};

onMounted(async () => {
	callNotifyStore();
	// 判斷是否為登入狀態
	if (useAuth.isLogin) {
		// 查詢是否有通知未看
		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/v1/notification/checknewnotification`,
				{ withCredentials: true }
			);
			if (response.data.unread) {
				// TODO把數字顯示出來，這裡只是check是否有通知
				console.log(response.data);
				// notifyCounterValue.value = response.data.unread;
				useNotify.resetNotifyCount();
				useNotify.increaseNotifyCount(response.data.unread);
			}
		} catch (error) {
			useAuth.setLoginStatus(false);
			console.error(error);
			// if token invalid redirect to home route
			router.push("/");
		}
		connectWebSocket();
	}
});

// get the list of notification
const notifyList = ref([]);
// const notifyList = ref([]);
const getNotificationList = async () => {
	try {
		const resp = await axios.get(
			`${
				import.meta.env.VITE_BACKEND_URL
			}/api/v1/notification/getnotification`,
			{ withCredentials: true }
		);
		console.log(resp.data.data);
		// notifyList.value = JSON.parse(resp.data.data);
		for (const item of resp.data.data) {
			// console.log(JSON.parse(item));
			//會需要解析是因為在redis的資料是string
			// TODO 未來改在server端解析，如果需要查看更多資料時會是從資料出來，資料會長不太一樣
			console.log(JSON.parse(item));
			notifyList.value.push(JSON.parse(item));
		}
		// 讀完後，重置通知數量並且通知後端
		if (useNotify.notifyCounter) {
			useNotify.resetNotifyCount();
			try {
				const resp = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/v1/notification/resetnotification`,
					{ withCredentials: true }
				);
				console.log(resp);
			} catch (error) {
				console.error(error, "重置通知失敗");
			}
		}
	} catch (error) {
		console.error(error, "請先登入");
	}
};

const googleAuth = () => {
	// loginModalVisible.value = false;
	console.log(import.meta.env.VITE_GOOGLE_REDIRECT)
	import.meta.env.VITE_BACKEND_URL
	window.location.href = import.meta.env.VITE_GOOGLE_REDIRECT;
};

watch(
	() => useAuth.isLogin,
	(newValue) => {
		console.log("useAuth.isLogin");
		console.log(newValue);
	}
);

watch(
	() => useNotify.notifyCounter,
	(newValue) => {
		console.log("count 更新");
		notifyCounterValue.value = newValue;
	}
);

const items = computed(() => [
	{
		label: "Router",
		icon: "pi pi-palette",
		items: [
			{
				label: "Builder",
				route: "/setting",
			},
			{
				label: "Gallery",
				route: "/setting",
			},
		],
		visible: false,
	},
	{
		label: "便宜機票",
		icon: "pi pi-link",
		command: () => {
			router.push("/ticketlist");
		},
	},
	{
		label: "登入",
		icon: "pi pi-arrow-circle-up",
		command: () => {
			loginModalVisible.value = true;
		},
		// items: [
		//   {
		//     label: "Google登入",
		//     icon: "pi pi-google",
		//     command: () => {
		//       window.location.href = 'http://localhost:3000/api/v1/users/auth/google'
		//     },
		//   },
		// ],
		visible: !useAuth.isLogin,
	},
	{
		icon: "pi pi-user",
		command: () => {
			router.push("/membercenter");
		},
		visible: useAuth.isLogin,
	},
	{
		label: "登出",
		icon: "pi pi-link",
		command: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,
					{ withCredentials: true }
				);
				useAuth.setLoginStatus(false);
				useNotify.resetNotifyCount();
				router.push("/");
			} catch (error) {
				console.error(error, " 登出失敗");
			}
		},
		visible: useAuth.isLogin,
	},
]);
</script>
<style>
.test::before {
	right: 15px;
}
</style>
