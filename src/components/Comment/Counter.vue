<template>
	<div class="counter">
		<div @click="handleAddLike" class="counter__plus">
			<svg
				width="11"
				height="11"
				fill="#C5C6EF"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
				/>
			</svg>
		</div>
		<div class="counter__count">
			{{ score.length ? score.length : 0 }}
		</div>
		<div @click="handleDeleteLike" class="counter__minus">
			<svg
				width="11"
				height="3"
				fill="#C5C6EF"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	props: ["score", "handleAddLike", "handleDeleteLike"],
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.counter {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	max-height: 100px;
	background-color: $very-light-gray;
	padding: 10px;
	border-radius: 15px;
	height: 100px;
	&__minus,
	&__plus {
		cursor: pointer;
		&:hover svg {
			fill: $moderate-blue;
		}
	}
	&__count {
		color: $moderate-blue;
		font-weight: 500;
	}
}
</style>