declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    HOST: string;
    SECRET_KEY: string;
  }
}