import axios from 'axios'

const API_KEY = 'd98dbb36edb6437887fa87434d09d57e'

export default axios.create({
	baseURL: 'https://api.spoonacular.com',
	timeout: 10000,
	params: {
		apiKey: API_KEY,
	},
})
