<template>
	<section class="w-full min-h-screen mt-16 flex flex-col relative">
		<section class="max-w-5xl p-3 mx-auto flex items-center">
			<p v-if="recipe" class="">
				Did you like the recipe?
				<span class="underline underline-offset-2">Save it to bookmarks!</span> If you want another
				recipe
			</p>
			<button
				@click="getRecipe"
				class="py-1 px-2 font-bold text-center text-sm bg-orange-500 rounded-md border-2 border-orange-500 hover:bg-white hover:shadow-lg ease-in duration-100"
				:class="{ 'ml-3': recipe }"
			>
				{{ recipeButtonText }}
			</button>
		</section>

		<main
			class="max-w-5xl px-3 py-4 pl-16 mx-auto flex flex-col relative"
			v-if="recipe"
		>
			<h2
				class="w-full px-3 mx-auto mb-3 text-gray-800 text-3xl self-start"
				v-if="recipe"
			>
				{{ recipe.title }}
			</h2>
			<p class="mb-3 indent-7" v-html="recipe.summary"></p>

			<div class="mb-1 flex items-center" v-if="recipe.creditsText">
				<svg
					class="mr-1"
					xmlns="http://www.w3.org/2000/svg"
					height="48"
					width="48"
				>
					<path
						d="M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z"
					/>
				</svg>
				by&nbsp;
				<span class="border-b border-b-orange-500">{{
					recipe.creditsText
				}}</span>
			</div>
			<div class="mb-1">
				<a
					class="inline-flex items-center underline-offset-4 hover:underline hover:text-orange-500 group"
					:href="recipe.sourceUrl"
				>
					<svg
						class="mr-1 group-hover:fill-orange-500"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						width="48"
					>
						<path
							d="M22.5 34H14Q9.75 34 6.875 31.125Q4 28.25 4 24Q4 19.75 6.875 16.875Q9.75 14 14 14H22.5V17H14Q11 17 9 19Q7 21 7 24Q7 27 9 29Q11 31 14 31H22.5ZM16.25 25.5V22.5H31.75V25.5ZM25.5 34V31H34Q37 31 39 29Q41 27 41 24Q41 21 39 19Q37 17 34 17H25.5V14H34Q38.25 14 41.125 16.875Q44 19.75 44 24Q44 28.25 41.125 31.125Q38.25 34 34 34Z"
						/>
					</svg>
					Source link</a
				>
			</div>

			<AsidePanel @savedBookmark="savedBookmark" />

			<div
				class="py-4 flex items-start border-b-2 border-solid border-b-gray-300"
			>
				<img class="max-w-md mr-8" :src="recipe.image" alt="Recipe image" />
				<ul class="p-5 pr-14 rounded-md border-2 border-gray-300 relative">
					<div
						class="w-9 h-9 flex justify-center items-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/2 bg-white"
					>
						<svg
							class="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
							/>
						</svg>
					</div>
					<ol v-if="recipe.preparationMinutes !== -1">
						<span class="font-bold">Preparation: </span>
						{{
							preparationMinutes
						}}
					</ol>
					<ol>
						<span class="font-bold">Total: </span>
						{{
							readyInMinutes
						}}
					</ol>
					<ol>
						<span class="font-bold">Servings: </span>
						{{
							recipe.servings
						}}
					</ol>
					<ol>
						<span class="font-bold">Price per serving: </span>
						{{
							pricePerServing
						}}
					</ol>
				</ul>
			</div>

			<section class="max-w-xl py-4 border-b-2 border-gray-300">
				<h3 class="mb-3 flex items-center font-bold text-xl">
					<svg
						class="w-7 h-7 mr-3"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
					>
						<path
							d="M96 128C96.53 128 97.07 128 97.6 128C105 91.49 137.3 64 176 64C190.1 64 204.1 68.1 216.9 75.25C230.2 49.55 257.1 32 288 32C318.9 32 345.8 49.56 359.1 75.25C371 68.1 385 64 400 64C438.7 64 470.1 91.49 478.4 128C478.9 128 479.5 128 480 128C515.3 128 544 156.7 544 192C544 203.7 540.9 214.6 535.4 224H40.56C35.12 214.6 32 203.7 32 192C32 156.7 60.65 128 96 128H96zM16 283.4C16 268.3 28.28 256 43.43 256H532.6C547.7 256 560 268.3 560 283.4C560 356.3 512.6 418.2 446.9 439.8C447.6 442.4 448 445.2 448 448C448 465.7 433.7 480 416 480H160C142.3 480 128 465.7 128 448C128 445.2 128.4 442.4 129.1 439.8C63.4 418.2 16 356.3 16 283.4H16z"
						/>
					</svg>
					Ingredients
				</h3>
				<ul class="">
					<ol
						class="mb-2"
						v-for="ingredient in recipe.extendedIngredients"
						:key="ingredient.id"
					>
						<label
							class="inline-flex items-center text-lg cursor-pointer"
							:for="`ingredient-${ingredient.id}`"
							><input
								class="mr-3"
								type="checkbox"
								:id="`ingredient-${ingredient.id}`"
							/>{{ ingredient.original }}</label
						>
					</ol>
				</ul>
			</section>

			<section class="max-w-xl py-4 flex flex-col border-b-2 border-gray-300">
				<h3 class="mb-3 flex items-center font-bold text-xl">
					<svg
						class="w-7 h-7 mr-3"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M221.6 148.7C224.7 161.3 224.8 174.5 222.1 187.2C219.3 199.1 213.6 211.9 205.6 222.1C191.1 238.6 173 249.1 151.1 254.1V472C151.1 482.6 147.8 492.8 140.3 500.3C132.8 507.8 122.6 512 111.1 512C101.4 512 91.22 507.8 83.71 500.3C76.21 492.8 71.1 482.6 71.1 472V254.1C50.96 250.1 31.96 238.9 18.3 222.4C10.19 212.2 4.529 200.3 1.755 187.5C-1.019 174.7-.8315 161.5 2.303 148.8L32.51 12.45C33.36 8.598 35.61 5.197 38.82 2.9C42.02 .602 45.97-.4297 49.89 .0026C53.82 .4302 57.46 2.303 60.1 5.259C62.74 8.214 64.18 12.04 64.16 16V160H81.53L98.62 11.91C99.02 8.635 100.6 5.621 103.1 3.434C105.5 1.248 108.7 .0401 111.1 .0401C115.3 .0401 118.5 1.248 120.9 3.434C123.4 5.621 124.1 8.635 125.4 11.91L142.5 160H159.1V16C159.1 12.07 161.4 8.268 163.1 5.317C166.6 2.366 170.2 .474 174.1 .0026C178-.4262 181.1 .619 185.2 2.936C188.4 5.253 190.6 8.677 191.5 12.55L221.6 148.7zM448 472C448 482.6 443.8 492.8 436.3 500.3C428.8 507.8 418.6 512 408 512C397.4 512 387.2 507.8 379.7 500.3C372.2 492.8 368 482.6 368 472V352H351.2C342.8 352 334.4 350.3 326.6 347.1C318.9 343.8 311.8 339.1 305.8 333.1C299.9 327.1 295.2 320 291.1 312.2C288.8 304.4 287.2 296 287.2 287.6L287.1 173.8C288 136.9 299.1 100.8 319.8 70.28C340.5 39.71 369.8 16.05 404.1 2.339C408.1 .401 414.2-.3202 419.4 .2391C424.6 .7982 429.6 2.62 433.9 5.546C438.2 8.472 441.8 12.41 444.2 17.03C446.7 21.64 447.1 26.78 448 32V472z"
						/></svg
					>Directions
				</h3>
				<ul class="mb-2">
					<ol class="mb-2" v-for="step in cookingSteps" :key="step.number">
						<label
							v-if="cookingSteps.length > 1"
							class="inline-flex items-center font-bold text-lg cursor-pointer"
							:for="`step-${step.number}`"
							><input
								class="mr-2"
								type="checkbox"
								:id="`step-${step.number}`"
							/>Step {{ step.number }}</label
						>

						<p class="text-lg indent-7">
							{{ step.step }}
						</p>
					</ol>
				</ul>
				<button
					class="p-2 mb-3 flex items-center self-center border-2 border-solid border-orange-500 rounded-md hover:bg-orange-500 hover:text-white font-bold ease-in duration-100 group hover:shadow-lg"
				>
					<svg
						class="mr-1 group-hover:fill-white ease-in duration-100"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						width="24"
					>
						<path
							d="M10.6 16.6 17.65 9.55 16.25 8.15 10.6 13.8 7.75 10.95 6.35 12.35ZM12 22Q9.925 22 8.1 21.212Q6.275 20.425 4.925 19.075Q3.575 17.725 2.788 15.9Q2 14.075 2 12Q2 9.925 2.788 8.1Q3.575 6.275 4.925 4.925Q6.275 3.575 8.1 2.787Q9.925 2 12 2Q14.075 2 15.9 2.787Q17.725 3.575 19.075 4.925Q20.425 6.275 21.212 8.1Q22 9.925 22 12Q22 14.075 21.212 15.9Q20.425 17.725 19.075 19.075Q17.725 20.425 15.9 21.212Q14.075 22 12 22ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 20Q15.325 20 17.663 17.663Q20 15.325 20 12Q20 8.675 17.663 6.337Q15.325 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12Q4 15.325 6.338 17.663Q8.675 20 12 20Z"
						/>
					</svg>
					I made it!
				</button>
			</section>
		</main>
	</section>
</template>

<script setup>
import AsidePanel from '../components/AsidePanel.vue'
import { useRandomRecipe } from '../composables/useRandomRecipe'
import { ref, computed } from 'vue'

const { getRecipe, recipe, loading, error } = useRandomRecipe()

const recipeButtonText = computed(() =>
	recipe.value ? 'Click to refresh' : 'I want to eat!'
)

const readyInMinutes = computed(() => `${recipe.value.readyInMinutes} minutes`)
const preparationMinutes = computed(
	() => `${recipe.value.preparationMinutes} minutes`
)
const cookingSteps = computed(() => recipe.value.analyzedInstructions[0].steps)

const pricePerServing = computed(() => {
	let dollars = recipe.value.pricePerServing / 100
	return `$${dollars.toFixed(1)}`
})
</script>
