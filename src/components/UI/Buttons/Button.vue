<template>
	<button
		class="btn"
		:class="{ [className]: className, ['btn-primary']: !className }"
	>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: ["text", "className"],
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.btn {
	font-family: "Rubik", sans-serif;
	border: none;
	border-radius: 5px;
	outline: none;
	min-width: 104px;
	height: 48px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
	cursor: pointer;
	transition: 0.2s;
	color: $white;
	text-transform: uppercase;
}
.btn-primary {
	background-color: $moderate-blue;
	&:hover {
		background-color: $light-grayish-blue;
	}
}
.btn-danger {
	background-color: $soft-red;
	&:hover {
		background-color: $pale-red;
	}
}
.btn-secondary {
	background-color: $dark-blue;
	&:hover {
		background-color: $grayish-blue;
	}
}
</style>