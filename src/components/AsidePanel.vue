<template>
	<aside class="w-14 mr-2 relative">
		<div class="sticky top-20 flex flex-col items-center">
			<button
				@click="changeFavoriteRecipe"
				class="w-12 p-2 mb-4 flex flex-col items-center border-2 border-solid border-orange-500 rounded-md ease-in duration-100 hover:text-orange-500 text-xs group hover:shadow-lg font-bold"
			>
				<svg
					class="w-6 h-6 mb-1 fill-gray-400 group-hover:fill-orange-500 ease-in duration-75"
					:class="{ '!fill-orange-500': fillOfSaveButton }"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
					/>
				</svg>
				{{ saveButtonText }}
			</button>

			<Transition
				@before-enter="beforeEnter"
				@enter="onEnter"
				@leave="onLeave"
				appear
			>
				<button
					v-if="showButtonToTop"
					@click="scrollToTop"
					class="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 border-2 border-orange-500 hover:bg-white ease-in duration-75 group"
				>
					<svg
						class="w-6 h-6 fill-white group-hover:fill-gray-800 ease-in duration-75"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 384 512"
					>
						<path
							d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
						/>
					</svg>
				</button>
			</Transition>
		</div>
	</aside>
</template>

<script setup>
import { useSavedRecipes } from '../stores/savedRecipes'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({ recipe: Object })
const showButtonToTop = ref(false)
const savedRecipesStore = useSavedRecipes()

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

const changeFavoriteRecipe = () => {
	console.log(savedRecipesStore.isRecipeExist(props.recipe.id))
	if (!savedRecipesStore.isRecipeExist(props.recipe.id)) {
		savedRecipesStore.addRecipeToSaved(props.recipe)
	} else {
		savedRecipesStore.removeRecipeFromSaved(props.recipe)
	}
}

const fillOfSaveButton = computed(() =>
	savedRecipesStore.isRecipeExist(props.recipe.id)
)

const saveButtonText = computed(() =>
	savedRecipesStore.isRecipeExist(props.recipe.id) ? 'Saved!' : 'Save'
)

function beforeEnter(el) {
	el.style.opacity = 0
	el.style.transform = 'translateX(-20px)'
}

function onEnter(el) {
	gsap.to(el, {
		duration: 0.15,
		opacity: 1,
		x: 0,
	})
}

function onLeave(el) {
	gsap.to(el, {
		duration: 0.15,
		x: '-50px',
		opacity: 0,
	})
}
</script>
