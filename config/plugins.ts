export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "@strapi/provider-upload-aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET_KEY"),
          region: env("AWS_REGION"),
        },
        params: {
          Bucket: env("AWS_S3_BUCKET"),
          ACL: "public-read",
        },
        baseUrl: `https://${env("AWS_S3_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
      },
    },
  },
});
