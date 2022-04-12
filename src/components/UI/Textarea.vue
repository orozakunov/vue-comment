<template>
	<textarea v-model="text" @input="handleInput"></textarea>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
export default {
	props: ["value"],
	setup(props, context) {
		const text = ref("");
		const handleInput = () => {
			context.emit("setValue", text.value);
		};
		watchEffect(() => {
			if (!props.value) {
				text.value = "";
			} else {
				text.value = props.value;
			}
		});
		return { text, handleInput };
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
textarea {
	font-family: "Rubik", sans-serif;
	resize: none;
	width: 100%;
	height: 90px;
	box-sizing: border-box;
	padding: 15px 25px;
	line-height: 1.5;
	font-weight: 400;
	color: $dark-blue;
	border-radius: 5px;
	border: 1px solid $dark-blue;
}
</style>