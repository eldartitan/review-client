function isError(action) {
  return action.type.endsWith("rejected");
}

function pending(state) {
  state.loading = true;
  state.error = null;
}

function loadFalseErrNull(state) {
  state.loading = false;
  state.error = null;
}

function like(state, action) {
  console.log(action.payload);
  if (state.review?._id === action.payload._id) {
    state.review.likes = action.payload.likes;
  }
  const id = state.reviews.findIndex((f) => f._id === action.payload._id);
  state.reviews[id].likes = action.payload.likes;
}

export { isError, like, loadFalseErrNull, pending };