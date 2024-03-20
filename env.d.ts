declare namespace NodeJS {
  interface ProcessEnv {
    routes: {
      signIn: string,
      signUp: string,
      main: string,
      forms: string,
    };
  }
}
