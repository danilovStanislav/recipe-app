import instance from '../plugins/axios'
import { ref } from 'vue'

export const useFindByIngredients = function () {
	const result = ref([])
	const loading = ref(false)
	const error = ref(false)

	const getRecipe = async findIngredients => {
		loading.value = true
		try {
			const res = await instance({
				method: 'GET',
				url: 'recipes/findByIngredients',
				params: {
					ingredients: findIngredients.join(),
					number: 50,
				},
			})
			result.value = [...result.value, ...res.data]
		} catch (err) {
			error.value = true
			console.error(err)
		} finally {
			loading.value = false
		}
	}

	return { getRecipe, result, loading, error }
}
