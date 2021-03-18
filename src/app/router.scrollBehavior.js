export default function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (!to.query.anchor) {
      return {
        x: 0,
        y: 0
      };
    }
  }
}
