<template>
	<section class="max-w-6xl mt-16 mx-auto py-4 px-2 flex flex-col items-center">
		<h1 class="mb-2 font-bold text-2xl text-center">Hello dear guest!</h1>
		<p class="mb-8 text-xl text-center">
			Here you can find the recipe you want! 😋 <br />
			Just write ingredients below 👇.
		</p>
		<TheInput
			v-model="ingredient"
			:buttonText="'Add'"
			:placeholder="getRandomIntInclusive()"
			@inputSubmit="addIngredient"
		/>
		<div
			v-if="!result.length && !loading"
			class="max-w-2xl w-full mt-3 mx-auto"
		>
			<h2 class="mb-2 font-bold text-xl">Ingredients:</h2>
			<TransitionGroup
				v-if="queryIngredients.length"
				@before-enter="onBeforeEnter"
				@enter="onEnter"
				@leave="onLeave"
				class="flex mb-4"
				tag="ul"
				appear
			>
				<li
					@click="removeIngredient(i)"
					v-for="(item, i) in queryIngredients"
					:key="i"
					class="py-2 px-3 mr-2 rounded-md border-2 border-gray-400 cursor-pointer hover:line-through shadow-md hover:border-orange-500 ease-in duration-100"
				>
					{{ item }}
				</li>
			</TransitionGroup>
			<div class="" v-else>Empty. Add any ingredient</div>
			<button
				v-if="queryIngredients.length"
				@click="findRecipe"
				class="py-2 px-4 mx-auto flex items-center self-center border-2 border-solid border-orange-500 rounded-md hover:bg-orange-500 hover:text-white font-bold shadow-md ease-in duration-75 group hover:shadow-xl"
			>
				Find It
			</button>
		</div>
	</section>
	<SearchResults :result="result" />
	<LoadingSpin v-if="loading" />
</template>

<script setup>
import SearchResults from '../components/SearchResults.vue'
import LoadingSpin from '../components/LoadingSpin.vue'
import TheInput from '../components/TheInput.vue'
import { useFindByIngredients } from '../composables/useFindByIngredients'
import { ref } from 'vue'
import gsap from 'gsap'

const ingredient = ref('')
const queryIngredients = ref([])
const placeholderExamples = [
	'Banana',
	'Chicken',
	'Tomato',
	'Potato',
	'Salad',
	'Meat',
]
const { getRecipe, result, loading, error } = useFindByIngredients()

const addIngredient = () => {
	queryIngredients.value.push(ingredient.value)
	ingredient.value = ''
}

const findRecipe = () => {
	getRecipe(queryIngredients.value)
	queryIngredients.value = []
}

const removeIngredient = ingredientIndex => {
	queryIngredients.value = queryIngredients.value.filter(
		(el, index) => index !== ingredientIndex
	)
}

const getRandomIntInclusive = () => {
	let max = Math.floor(placeholderExamples.length)
	let res = Math.floor(Math.random() * (max - 1))
	return placeholderExamples[res]
}

function onBeforeEnter(el) {
	el.style.transform = 'translateY(-40px)'
	el.style.opacity = 0
}

function onEnter(el) {
	gsap.to(el, {
		opacity: 1,
		y: 0,
		duration: 0.1,
	})
}

function onLeave(el) {
	gsap.to(el, {
		y: '40px',
		opacity: 0,
		duration: 0.1,
	})
}
</script>
