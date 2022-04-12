<template>
	<div class="comment__user">
		<img
			class="comment__avatar"
			:src="comment.user.image.png"
			:alt="comment.user.username"
		/>
		<h3 class="comment__author">{{ comment.user.username }}</h3>
		<div class="comment__date">
			{{ moment(comment.createdAt).startOf("minute").fromNow() }}
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: ["comment"],
	setup() {
		moment.locale("ru");
		return { moment };
	},
};
</script>

<style>
</style>