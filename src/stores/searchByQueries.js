import { defineStore } from 'pinia'

export const useCounterStore = defineStore('searchByQueries', {
	state: () => {
		return {
			queryString: [],
		}
	},

	actions: {
		increment() {
			this.count++
		},
	},
})
