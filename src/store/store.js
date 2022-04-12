import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default createStore({
  state: {
    comments: [],
    currentUser: null,
  },
  getters: {
    getCurrentComment: (state) => (id) => {
      return state.comments.find((item) => item.id === id);
    },
    getCurrentReplyComment: (state) => (parentId, id) => {
      const parentComment = state.comments.find((item) => item.id === parentId);
      return parentComment.replies.find((reply) => reply.id === id);
    },
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_USER(state, user) {
      state.currentUser = user;
    },
    ADD_COMMENT_LIKE(state, comment) {
      comment.score = [...comment.score, state.currentUser.id];
    },
    DELETE_COMMENT_LIKE(state, comment) {
      comment.score = comment.score.filter((id) => id !== state.currentUser.id);
    },
    CREATE_COMMENT(state, newComment) {
      state.comments.push(newComment);
    },
    CREATE_REPLY_COMMENT(state, { currentComment, newReplyComment }) {
      currentComment.replies = [...currentComment.replies, newReplyComment];
    },
    ADD_REPLY_COMMENT_LIKE(state, replyComment) {
      replyComment.score.push(state.currentUser.id);
    },
    DELETE_REPLY_COMMENT_LIKE(state, replyComment) {
      replyComment.score = replyComment.score.filter((reply) => reply.id === state.currentUser.id);
    },
    DELETE_COMMENT(state, id) {
      state.comments = state.comments.filter((comment) => comment.id !== id);
    },
    DELETE_REPLY_COMMENT(state, { parentComment, newReplies }) {
      parentComment.replies = newReplies;
    },
    EDIT_COMMENT(state, { id, content }) {
      const currentComment = state.comments.find((comemnt) => comemnt.id === id);
      currentComment.content = content;
    },
  },
  actions: {
    async getComments({ commit }) {
      const response = await fetch('http://localhost:3000/comments');
      const json = await response.json();
      commit('SET_COMMENTS', json);
    },
    async getUser({ commit }) {
      const response = await fetch('http://localhost:3000/currentUser');
      const json = await response.json();
      commit('SET_USER', json);
    },
    async addLikeToComment({ commit, state, getters }, id) {
      const comment = getters.getCurrentComment(id);

      if (comment.score.includes(state.currentUser.id)) return null;

      await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ score: [state.currentUser.id] }),
        headers: { 'Content-Type': 'application/json' },
      });
      commit('ADD_COMMENT_LIKE', comment);
    },
    async deleteLikeFromComment({ commit, getters }, id) {
      const comment = getters.getCurrentComment(id);

      commit('DELETE_COMMENT_LIKE', comment);

      await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ score: comment.score }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    async createComment({ commit }, newComment) {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' },
      });
      const newAddedComment = await response.json();
      commit('CREATE_COMMENT', newAddedComment);
    },
    async createReplyComment({ commit, getters }, { newComment, id }) {
      const currentComment = getters.getCurrentComment(id);

      const newReplyComment = { ...newComment, id: uuidv4() };

      await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
          replies: [...currentComment.replies, newReplyComment],
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      commit('CREATE_REPLY_COMMENT', { currentComment, newReplyComment });
    },
    async addLikeToReplyComment({ commit, getters, state }, { parentId, replyId }) {
      const currentComment = getters.getCurrentComment(parentId);

      const replyComment = currentComment.replies.find((reply) => reply.id === replyId);

      if (replyComment.score.includes(state.currentUser.id)) return null;

      commit('ADD_REPLY_COMMENT_LIKE', replyComment);

      await fetch('http://localhost:3000/comments/' + parentId, {
        method: 'PATCH',
        body: JSON.stringify({ replies: currentComment.replies }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    async deleteLikeFromReplyComment({ commit, getters }, { parentId, replyId }) {
      const currentComment = getters.getCurrentComment(parentId);

      const replyComment = currentComment.replies.find((reply) => reply.id === replyId);

      commit('DELETE_REPLY_COMMENT_LIKE', replyComment);

      await fetch('http://localhost:3000/comments/' + parentId, {
        method: 'PATCH',
        body: JSON.stringify({ replies: currentComment.replies }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    async deleteComment({ commit }, id) {
      await fetch('http://localhost:3000/comments/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      commit('DELETE_COMMENT', id);
    },
    async deleteReplyComment({ commit, getters }, { parentId, id }) {
      const parentComment = getters.getCurrentComment(parentId);
      const newReplies = parentComment.replies.filter((reply) => reply.id !== id);

      await fetch('http://localhost:3000/comments/' + parentId, {
        method: 'PATCH',
        body: JSON.stringify({
          replies: newReplies,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      commit('DELETE_REPLY_COMMENT', { parentComment, newReplies });
    },
    async editComment({ commit }, { id, content }) {
      await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
          content,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      commit('EDIT_COMMENT', { id, content });
    },
  },
});