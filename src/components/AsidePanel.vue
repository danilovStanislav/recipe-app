<template>
	<aside class="flex flex-col items-center fixed -translate-x-20">
		<button
			@click="savedBookmark"
			class="w-12 p-2 mb-4 flex flex-col items-center border-2 border-solid border-orange-500 rounded-md ease-in duration-100 hover:text-orange-500 text-xs group hover:shadow-lg font-bold"
		>
			<svg
				v-if="!isSaved"
				class="w-6 h-6 mb-1 group-hover:fill-orange-500 ease-in duration-100"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
			>
				<path
					d="M336 0h-288C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93C357.2 519.1 384 504.6 384 479.9V48C384 21.49 362.5 0 336 0zM336 452L192 368l-144 84V54C48 50.63 50.63 48 53.1 48h276C333.4 48 336 50.63 336 54V452z"
				/>
			</svg>
			<svg
				v-else
				class="w-6 h-6 mb-1 fill-orange-500 ease-in duration-100"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
			>
				<path
					d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"
				/>
			</svg>
			{{ bookmarkTextOnChange }}
		</button>

		<!-- <Transition
			appear
			@before-enter="beforeEnter"
			@enter="onEnter"
			@leave="onLeave"
		> -->
		<button
			v-if="showButtonToTop"
			@click="scrollToTop"
			class="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500 border-2 border-orange-500 hover:bg-white ease-in duration-100 group animate-onAppear"
		>
			<svg
				class="w-6 h-6 fill-white group-hover:fill-gray-800 ease-in duration-100"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
			>
				<path
					d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
				/>
			</svg>
		</button>
		<!-- </Transition> -->
	</aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isSaved = ref(false)
const bookmarkText = ref('Save')
const showButtonToTop = ref(false)
const emits = defineEmits(['savedBookmark'])

onMounted(() => window.addEventListener('scroll', compareScrolledHeight))
onUnmounted(() => window.removeEventListener('scroll', compareScrolledHeight))

const compareScrolledHeight = () => {
	let screenHeight = document.documentElement.clientHeight
	let scrolledHeight = window.pageYOffset

	scrolledHeight > screenHeight
		? (showButtonToTop.value = true)
		: (showButtonToTop.value = false)
}

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 })

const savedBookmark = () => {
	isSaved.value = !isSaved.value
	emits('savedBookmark')
}

const bookmarkTextOnChange = computed(() =>
	isSaved.value
		? (bookmarkText.value = 'Saved!')
		: (bookmarkText.value = 'Save')
)

function beforeEnter(el) {
	el.style.opacity = 0
	el.style.transform = 'translateX(-100%)'
}

function onEnter(el) {
	gsap.to(el, {
		duration: 0.3,
		opacity: 1,
		transform: 'translateX(0)',
	})
}

function onLeave(el) {
	gsap.to(el, {
		duration: 0.3,
		transform: 'translateX(-100%)',
		opacity: 0,
	})
}
</script>
