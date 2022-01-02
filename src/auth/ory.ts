import { Configuration, Session, V0alpha2Api } from '@ory/kratos-client';

export const ORY_URLS = {
  LOGIN: '/.ory/self-service/login/browser',
};

export const ory = new V0alpha2Api(new Configuration({
  basePath: process.env.VUE_APP_KRATOS_URL,
  baseOptions: {
    withCredentials: false,
    timeout: 5000,
  },
}));

let session: Session | undefined;

export const getSession = async (): Promise<Session|undefined> => {
  try {
    if (session) return session;

    const response = await ory.toSession();
    session = response.data;

    return session;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await getSession();

    return !!session;
  } catch (e) {
    return false;
  }
};
