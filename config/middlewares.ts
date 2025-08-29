export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://inmobiliaria-zicatela-assets-dev.s3.us-east-2.amazonaws.com',
            'https://inmobiliaria-zicatela-assets.s3.us-east-2.amazonaws.com',
            'https://*.s3.us-east-2.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://inmobiliaria-zicatela-assets-dev.s3.us-east-2.amazonaws.com',
            'https://inmobiliaria-zicatela-assets.s3.us-east-2.amazonaws.com',
            'https://*.s3.us-east-2.amazonaws.com',
          ],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          'style-src': ["'self'", "'unsafe-inline'"],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::root-redirect',
  'global::upload-redirect',
];
