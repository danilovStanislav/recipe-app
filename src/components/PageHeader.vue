<template>
	<header
		class="w-full h-16 p-2 flex items-center text-white bg-orange-500 fixed top-0 left-0 z-50 transition-transform ease-in duration-300"
		:class="{ '-translate-y-full': hideHeader }"
	>
		<ul class="w-full flex items-center">
			<li v-for="(link, i) in navbarList" :key="i">
				<router-link
					class="py-1 px-2 mx-1 block font-bold hover:bg-white hover:text-gray-800 hover:border-gray-800 rounded-md ease-in duration-100"
					:to="{ name: link.linkTo }"
				>
					{{ link.title }}
				</router-link>
			</li>
		</ul>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollOffset = ref(0)
const hideHeader = ref(false)

const navbarList = [
	{ title: 'Home', linkTo: 'HomePage' },
	{ title: 'Userpage', linkTo: 'UserPage' },
]

onMounted(() => {
	window.addEventListener('scroll', scrollPage)
})

onUnmounted(() => {
	window.removeEventListener('scroll', scrollPage)
})

const scrollPage = () => {
	let currentOffset = window.pageYOffset
	currentOffset > scrollOffset.value
		? (hideHeader.value = true)
		: (hideHeader.value = false)
	scrollOffset.value = currentOffset
}
</script>
