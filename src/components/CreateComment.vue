<template>
	<div class="create-comment" v-if="author">
		<form @submit.prevent="handleSubmit" class="create-comment__form">
			<img class="create-comment__image" :src="author.image.png" alt="" />
			<div class="create-comment__description">
				<Textarea :value="description" @setValue="description = $event"/>
			</div>
			<Button v-if="isReplying" text="REPLY" />
			<Button v-else text="SEND" />
		</form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { Button, Textarea } from "./UI";
export default {
	props: ["author", "isReplying", "comment", "parentCommentId"],
	components: { Button, Textarea },
	setup(props, context) {
		const description = ref("");
		const store = useStore();
		const handleSubmit = async () => {
			const newComment = {
				content: description.value,
				createdAt: new Date(),
				score: [],
				user: props.author,
				replies: [],
				relatedTo: props.comment?.user.username,
			};
			if (props.isReplying) {
				delete newComment.replies;
				store.dispatch("createReplyComment", {
					newComment,
					id: props.parentCommentId,
				});
			}
			if (!props.isReplying) {
				store.dispatch("createComment", newComment);
			}
			description.value = "";
			context.emit("closeReply");
		};
		return { description, handleSubmit };
	},
};
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
.create-comment {
	background-color: #fff;
	padding: 25px;
	border-radius: 10px;
	&__form {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	&__image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	&__description {
		width: 100%;
		margin: 0 20px;
	}
}
</style>