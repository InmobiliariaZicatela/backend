export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  // Production security settings
  ...(env("NODE_ENV") === "production" && {
    url: env("PUBLIC_URL", "http://localhost:1337"),
    proxy: true,
    cron: {
      enabled: false,
    },
  }),
});
