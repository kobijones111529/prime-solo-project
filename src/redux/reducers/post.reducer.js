export default (state = null, { type, payload }) => {
  switch (type) {
    case 'SET_POST':
      return payload;
    default:
      return state;
  }
};
