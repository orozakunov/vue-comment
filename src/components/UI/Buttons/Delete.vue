<template>
	<button>
		<svg
			fill="#ED6368"
			width="12"
			height="14"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
			/>
		</svg>
		<span>Delete</span>
	</button>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
button {
	font-family: "Rubik", sans-serif;
	color: $soft-red;
	font-weight: 500;
	font-size: 16px;
	display: flex;
	align-items: center;
	transition: 0.2s;
	cursor: pointer;
	background-color: transparent;
	border:none;
	&_active {
		color: $light-grayish-blue;
		svg {
			fill: $light-grayish-blue;
		}
	}
	svg {
		margin-right: 10px;
		transition: 0.2s;
	}
	&:hover {
		color: $pale-red;
		svg {
			fill: $pale-red;
		}
	}
}
</style>