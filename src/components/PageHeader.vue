<template>
	<header
		class="w-full h-16 p-2 flex items-center text-white bg-orange-500 fixed top-0 left-0 z-50"
	>
		<ul class="w-full flex items-center">
			<li v-for="(link, i) in navbarList" :key="i">
				<router-link
					class="py-2 px-3 mx-1 block font-bold border-2 border-transparent hover:bg-white hover:text-gray-800 hover:border-gray-800 rounded-md ease-in duration-100"
					:to="{ name: link.linkTo }"
				>
					{{ link.title }}
				</router-link>
			</li>
		</ul>
	</header>
</template>

<script setup>
const navbarList = [
	{ title: 'Home', linkTo: 'HomePage' },
	{ title: 'Get random recipe', linkTo: 'RandomRecipePage' },
]
</script>
