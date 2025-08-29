export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Si es la ruta raíz, redirigir al admin
    if (ctx.path === "/") {
      ctx.redirect("/admin");
      return;
    }

    await next();
  };
};
