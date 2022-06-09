import instance from '../plugins/axios'
import { ref } from 'vue'

export const useRecipe = function () {
	const recipe = ref(null)
	const loading = ref(false)
	const error = ref(false)

	const getRecipe = async id => {
		loading.value = true
		try {
			const res = await instance.get(`recipes/${id}/information`)
			recipe.value = res.data
		} catch (err) {
			error.value = true
			console.error(err)
		} finally {
			loading.value = false
		}
	}

	return { getRecipe, recipe, loading, error }
}
