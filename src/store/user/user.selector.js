export const selectCurrentUser = (state) => {
  return state.user.currentUser; // state.user returns the value of the state argument in the userReducer function in the user.reducer.js file
}; // this is just a helper function that can be passed inside the useSelector hook as the definition of this function is what needs to be passed inside the useSelector hook
