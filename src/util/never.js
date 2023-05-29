/**
 * @param {never} value
 */
export const never = value => {
  throw new Error(`Code should've been unreachable`);
};
