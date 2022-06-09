import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RecipePage from '../views/RecipePage.vue'

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage,
	},
	{
		path: '/recipe/:id',
		name: 'RecipePage',
		component: RecipePage,
	},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
