import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

// eslint-disable-next-line no-underscore-dangle
let _auth0: Auth0Client | null = null;

const getAuth0 = async (): Promise<Auth0Client> => {
  if (_auth0) return _auth0;

  _auth0 = await createAuth0Client({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  });

  return _auth0;
};

const forceGetAuth0 = async (audience: string): Promise<Auth0Client> => createAuth0Client({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
  audience,
});

const isAuthenticated = async (): Promise<boolean> => {
  const auth0 = await getAuth0();
  return auth0.isAuthenticated();
};

const getTokenSilently = async (): Promise<string> => {
  const auth0 = await getAuth0();
  return auth0.getTokenSilently();
};

const login = async () => {
  const auth0 = await getAuth0();
  await auth0.loginWithRedirect({
    redirect_uri: `${process.env.VUE_APP_URL}/auth`,
  });
};

const logout = async () => {
  const auth0 = await getAuth0();
  await auth0.logout({
    returnTo: `${process.env.VUE_APP_URL}`,
  });
};

export default {
  getAuth0,
  forceGetAuth0,
  isAuthenticated,
  getTokenSilently,
  login,
  logout,
};
