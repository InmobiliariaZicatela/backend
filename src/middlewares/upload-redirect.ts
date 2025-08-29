export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: any) => {
    // Interceptar peticiones a /uploads/
    if (ctx.path.startsWith("/uploads/")) {
      try {
        // Extraer el nombre del archivo de la URL
        const fileName = ctx.path.replace("/uploads/", "");

        // Construir la URL de S3
        const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

        // Redirigir a S3
        ctx.redirect(s3Url);
        return;
      } catch (error) {
        console.error("Error redirecting to S3:", error);
        // Si hay error, continuar con el flujo normal
      }
    }

    // Continuar con el siguiente middleware
    await next();
  };
};
