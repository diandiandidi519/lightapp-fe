/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: User.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: true, //currentUser && currentUser.access === 'admin',
  };
}
