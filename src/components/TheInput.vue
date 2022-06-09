<template>
	<div class="flex text-lg justify-center drop-shadow-md rounded-md">
		<input
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			@keypress.enter="$emit('inputSubmit')"
			class="py-2 px-3 border-2 border-gray-300 rounded-l-md border-r-0"
			type="text"
			:placeholder="props.placeholder"
			required
		/>
		<button
			class="py-2 px-3 border-2 border-orange-500 rounded-r-md font-bold bg-orange-500 text-white hover:bg-white ease-in duration-75 hover:text-black hover:border-orange-500"
			@click="$emit('inputSubmit')"
		>
			{{ props.buttonText }}
		</button>
	</div>
</template>

<script setup>
const props = defineProps(['modelValue', 'buttonText', 'placeholder'])
const emits = defineEmits(['update:modelValue', 'inputSubmit'])
</script>
