<template>
	<li
		class="flex flex-col items-center border border-gray-300 shadow-md hover:shadow-xl group ease-in duration-75 overflow-hidden"
	>
		<router-link
			class="flex flex-col grow"
			:to="{ name: 'RecipePage', params: { id: props.recipeId } }"
		>
			<img
				class="w-full h-40 object-cover object-center hover:scale-105 duration-75 ease-in"
				:src="props.recipeImage"
				alt="Recipe Image"
			/>
			<h3
				class="px-2 py-3 font-bold grow leading-tight group-hover:text-orange-500 ease-in duration-75"
			>
				{{ props.recipeTitle }}
			</h3>
			<span class="px-2 pb-2 flex items-center leading-none"
				><svg
					class="w-4 h-4 fill-gray-400 mr-1"
					:class="{ '!fill-orange-500': heartIcon }"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
					/>
				</svg>

				{{ props.recipeLikes }}
			</span>
		</router-link>
	</li>
</template>

<script setup>
import { useSavedRecipes } from '../stores/savedRecipes'
import { computed } from 'vue'

const props = defineProps({
	recipeId: Number,
	recipeImage: String,
	recipeTitle: String,
	recipeLikes: Number,
})

const savedRecipesStore = useSavedRecipes()

const heartIcon = computed(() => {
	for (let key of savedRecipesStore.recipes) {
		if (props.recipeId === key.id) return true
	}
	return false
})
</script>

<style></style>
