export const appConfig = {
  urls: {
    facebook: 'https://www.facebook.com',

    marketplace:
      'https://www.facebook.com/marketplace',

    myListings:
      'https://www.facebook.com/marketplace/you/selling',
  },

  browser: {
    headless: false,

    timeout: 60000,

    waitAfterLoad: 10000,
  },

  storage: {
    session:
      './storage/facebook-session.json',

    exports:
      './storage/exports/listings.json',
  },
};