interface ImportMetaEnv {
    readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string;
    readonly VITE_GOOGLE_OAUTH_CLIENT_SECRET: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_TINYMCE_KEY: string;
    readonly VITE_RECAPTCHA: string;
    test: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
