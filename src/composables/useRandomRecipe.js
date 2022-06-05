import instance from '../plugins/axios'
import { ref } from 'vue'

export const useRandomRecipe = function () {
	const recipe = ref(null)
	const loading = ref(false)
	const error = ref(false)

	const getRecipe = async () => {
		loading.value = true
		try {
			const res = await instance('recipes/random')
			recipe.value = res.data.recipes[0]
		} catch (err) {
			error.value = true
			console.error(err)
		} finally {
			loading.value = false
		}
	}

	return { getRecipe, recipe, loading, error }
}
