<template>
	<h2
		class="max-w-5xl mx-auto px-3 font-bold text-xl"
		v-if="props.result.length"
	>
		Results:
	</h2>
	<TransitionGroup
		class="px-2 py-5 mx-auto grid gap-5 justify-center xl:max-w-5xl xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 md:max-w-2xl sm:max-w-sm xs:grid-cols-1 xs:max-w-xs"
		ref="searchResults"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave"
		tag="ul"
		appear
	>
		<RecipeCard
			v-for="(recipe, i) in props.result"
			:key="recipe.id"
			:data-index="i"
			:recipeId="recipe.id"
			:recipeImage="recipe.image"
			:recipeTitle="recipe.title"
			:recipeLikes="recipe.likes"
		/>
	</TransitionGroup>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import gsap from 'gsap'
import { ref } from 'vue'

const props = defineProps({ result: Array })
const searchResults = ref(null)

const observerOptions = {
	root: searchResults.value,
	threshold: 0.5,
}

const observer = new IntersectionObserver((entries, observer) => {},
observerOptions)

const onBeforeEnter = el => {
	el.style.transform = 'translateY(-50px)'
	el.style.opacity = 0
}

const onEnter = (el, done) => {
	gsap.to(el, {
		opacity: 1,
		y: 0,
		duration: 0.2,
		ease: 'power3.out',
		delay: el.dataset.index * 0.1,
		onComplete: done,
	})
}

const onLeave = (el, done) => {
	gsap.to(el, {
		y: '50px',
		opacity: 0,
		duration: 0.2,
		ease: 'power1.out',
		delay: el.dataset.index * 0.1,
		onComplete: done,
	})
}
</script>
