<template>
	<div class="comment" v-if="comment">
		<Counter
			:score="comment.score"
			:handleAddLike="handleAddLike"
			:handleDeleteLike="handleDeleteLike"
		/>
		<div class="comment__content">
			<div class="comment__header">
				<User :comment="comment" />
				<Actions
					:isUserAuthorOfComment="isUserAuthorOfComment"
					:handleReplyComment="handleReplyComment"
					:showReplyComment="showReplyComment"
					:handleDeleteComment="handleDeleteComment"
					@showEditMode="isEditing = !isEditing"
				/>
			</div>
			<p v-if="!isEditing" class="comment__description">
				{{ comment.content }}
			</p>
			<div v-else class="comment__editing">
				<Textarea :value="comment.content" @setValue="newEditContent = $event"/>
				<Button @click="handleEditComment" text="Update"/>
			</div>
		</div>
	</div>
	<div v-if="showReplyComment" class="comment-reply">
		<CreateComment
			:author="author"
			:isReplying="true"
			:comment="comment"
			:parentCommentId="parentCommentId"
			@closeReply="showReplyComment = false"
		/>
	</div>
	<div class="comment-replies">
		<ReplyComment
			v-for="reply in comment.replies"
			:key="reply.id"
			:comment="reply"
			:author="author"
			:parentCommentId="parentCommentId"
		/>
	</div>
</template>

<script>
import CreateComment from "../CreateComment.vue";
import ReplyComment from "./Reply.vue";
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { Alert, Button, Delete, Edit, Reply,Textarea } from "../UI";
import Counter from "./Counter.vue";
import Actions from "./Actions.vue";
import User from "./User.vue";
export default {
	props: ["comment", "author"],
	components: {
		CreateComment,
		ReplyComment,
		Alert,
		Button,
		Delete,
		Edit,
		Reply,
		Counter,
		Actions,
		User,
		Textarea
	},
	setup(props) {
		const showReplyComment = ref(false);
		const store = useStore();
		const parentCommentId = ref(props.comment.id);
		const newEditContent = ref('');
		const isEditing = ref(false)
		const isUserAuthorOfComment = computed(() => {
			return (
				store.getters.getCurrentComment(props.comment.id)?.user.id ===
				store.state.currentUser?.id
			);
		});
		const handleDeleteComment = () => {
			store.dispatch("deleteComment", props.comment.id);
		};
		const handleReplyComment = () => {
			showReplyComment.value = !showReplyComment.value;
		};
		const handleAddLike = () => {
			store.dispatch("addLikeToComment", props.comment.id);
		};
		const handleDeleteLike = () => {
			store.dispatch("deleteLikeFromComment", props.comment.id);
		};
		const handleEditComment = () => {
			store.dispatch('editComment', {
				id: props.comment.id,
				content: newEditContent.value
			})
			isEditing.value = false
		}
		return {
			handleAddLike,
			handleDeleteLike,
			showReplyComment,
			handleReplyComment,
			parentCommentId,
			isUserAuthorOfComment,
			handleDeleteComment,
			handleEditComment,
			isEditing,
			newEditContent
		};
	},
};
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
.comment {
	max-width: 730px;
	display: flex;
	background-color: #fff;
	padding: 25px;
	margin-bottom: 20px;
	border-radius: 10px;
	&-reply {
		margin-top: -10px;
		margin-bottom: 20px;
	}
	&-replies {
		padding-left: 40px;
		margin-left: 40px;
		border-left: 2px solid $light-gray;
	}
	&__editing {
		button {
			display: block;
			margin: 0 0 0 auto
		}
	}
	&__actions {
		display: flex;
	}
	&__related-to {
		font-weight: 500;
		text-decoration: none;
		color: $moderate-blue;
	}
	&__content {
		padding-left: 20px;
		width: 100%;
	}
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	&__user {
		display: flex;
		align-items: center;
	}
	&__avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	&__author {
		margin: 0 15px;
		font-weight: 500;
	}
	&__description {
		color: $grayish-blue;
		line-height: 1.5;
	}
	&__edit {
		margin-left: 25px;
	}
}
</style>