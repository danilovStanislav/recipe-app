import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RandomRecipePage from '../views/RandomRecipePage.vue'

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage,
	},
	{
		path: '/random',
		name: 'RandomRecipePage',
		component: RandomRecipePage,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
