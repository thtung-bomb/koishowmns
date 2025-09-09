const config = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_SECRET: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  TINYMCE_KEY: import.meta.env.VITE_TINYMCE_KEY,
  RECAPTCHA_KEY: import.meta.env.VITE_RECAPTCHA,
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KET: import.meta.env.VITE_STRIPE_SECRET_KET,
};

export default config;