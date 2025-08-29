export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  url: env("STRAPI_ADMIN_BACKEND_URL", "http://localhost:1337"),
  autoOpen: false,
  serveAdminPanel: true,
  forgotPassword: {
    enabled: true,
  },
});
