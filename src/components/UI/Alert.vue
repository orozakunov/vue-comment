<template>
	<div class="alert">
		<div class="alert__content">
			<slot name="content" />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.alert {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	&__content {
		max-width: 400px;
		background-color: #fff;
		padding: 30px;
		border-radius: 10px;
	}
	&__description {
		margin: 20px 0;
		color: $grayish-blue;
	}
	&__buttons {
		button + button {
			margin-left: 10px;
		}
	}
}
</style>