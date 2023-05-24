export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_USER_POSTS':
      return payload;
    default:
      return state;
  }
};
