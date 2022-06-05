<script setup>
import PageHeader from './components/PageHeader.vue'
</script>

<template>
	<PageHeader />
	<router-view />
</template>

<style>
#app {
	min-height: 100vh;
	font-family: 'Nunito', sans-serif;
}
</style>
