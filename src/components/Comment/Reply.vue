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
					:handleDeleteComment="handleDeleteReplyComment"
				/>
			</div>
			<p class="comment__description">
				<a class="comment__related-to" v-if="comment.relatedTo" href="#"
					>@{{ comment.relatedTo }}</a
				>
				{{ comment.content }}
			</p>
		</div>
	</div>
	<div v-if="showReplyComment" class="comment-reply">
		<CreateComment
			:author="author"
			:comment="comment"
			:isReplying="true"
			:parentCommentId="parentCommentId"
			@closeReply="showReplyComment = false"
		/>
	</div>
</template>

<script>
import moment from "moment";
import CreateComment from "../CreateComment.vue";
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import Alert from "../UI/Alert.vue";
import Button from "../UI/Buttons/Button.vue";
import Counter from "./Counter.vue";
import User from "./User.vue";
import Actions from "./Actions.vue";
export default {
	props: ["comment", "author", "parentCommentId"],
	components: { CreateComment, Alert, Button, Counter, User, Actions },
	setup(props, context) {
		moment.locale("ru");
		const { parentCommentId, comment } = props;
		const showReplyComment = ref(false);
		const store = useStore();
		const showAlert = ref(false);
		const isUserAuthorOfComment = computed(() => {
			return (
				store.getters.getCurrentReplyComment(parentCommentId, comment.id).user
					.id === store.state.currentUser?.id
			);
		});
		const handleReplyComment = () => {
			showReplyComment.value = !showReplyComment.value;
		};
		const handleDeleteReplyComment = () => {
			store.dispatch("deleteReplyComment", {
				parentId: props.parentCommentId,
				id: props.comment.id,
			});
		};
		const handleAddLike = async () => {
			store.dispatch("addLikeToReplyComment", {
				parentId: props.parentCommentId,
				replyId: props.comment.id,
			});
		};
		const handleDeleteLike = async () => {
			store.dispatch("deleteLikeFromReplyComment", {
				parentId: props.parentCommentId,
				replyId: props.comment.id,
			});
		};
		return {
			handleReplyComment,
			showAlert,
			moment,
			handleAddLike,
			handleDeleteLike,
			showReplyComment,
			isUserAuthorOfComment,
			handleDeleteReplyComment,
		};
	},
};
</script>