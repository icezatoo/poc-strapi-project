module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', env('AWS_S3_BASE_URL') ?? '', 'https://market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:', env('AWS_S3_BASE_URL') ?? '', 'https://market-assets.strapi.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: (env('ORIGIN_HOST_ALLOW') ?? '').split(','),
      headers: ['x-preview-token'], // Allow all headers
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow all methods
    },
  },
  // "global::populateDeepRequest",
  // "global::imageResponseTranform",
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // modify form body
      jsonLimit: '256mb', // modify JSON body
      textLimit: '256mb', // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
