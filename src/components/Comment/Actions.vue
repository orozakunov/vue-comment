<template>
	<Alert v-if="showAlert">
		<template v-slot:content>
			<h3>Удаление комментария</h3>
			<p class="alert__description">
				Вы уверены что хотите удалить комментарий? Данное действие является
				безвозратным.
			</p>
			<div class="alert__buttons">
				<Button
					className="btn-secondary"
					text="Отменить"
					@click="showAlert = false"
				/>
				<Button
					className="btn-danger"
					text="Подтвердить"
					@click="handleDeleteComment"
				/>
			</div>
		</template>
	</Alert>
	<div class="comment__actions">
		<Delete
			v-if="isUserAuthorOfComment"
			@click="showAlert = true"
			class="comment__delete"
		/>
		<Edit
			v-if="isUserAuthorOfComment"
			@click="showEditMode"
			class="comment__edit"
		/>
		<Reply
			v-else
			@click="handleReplyComment"
			class="comment__reply"
			:class="{ comment__reply_active: showReplyComment }"
		/>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { Alert, Delete, Edit, Reply, Button } from "../UI";
export default {
	props: [
		"isUserAuthorOfComment",
		"handleReplyComment",
		"handleDeleteComment",
		"showReplyComment",
	],
	components: {
		Alert,
		Delete,
		Edit,
		Reply,
		Button,
	},
	setup(_, context) {
		const showAlert = ref(false);
		const showEditMode = () => {
			context.emit("showEditMode");
		};
		return { showAlert, showEditMode };
	},
};
</script>

<style>
</style>