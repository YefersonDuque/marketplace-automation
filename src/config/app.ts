import 'dotenv/config';

export const appConfig = {
  urls: {
    facebook:
      process.env.FACEBOOK_URL!,

    marketplace:
      process.env.FACEBOOK_MARKETPLACE!,

    myListings:
      process.env.FACEBOOK_MY_LISTINGS!,
  },

  browser: {
    headless: false,

    timeout:
      Number(process.env.TIMEOUT),

    waitAfterLoad:
      Number(
        process.env.WAIT_AFTER_LOAD
      ),
  },

  storage: {
    session:
      './storage/facebook-session.json',

    exports:
      './storage/exports/listings.json',
  },
};