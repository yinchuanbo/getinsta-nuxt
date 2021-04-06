export default function (to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition);
      }, 500);
    });
  } else {
    if (!to.query.anchor) {
      return { x: 0, y: 0 };
    }
  }
}
