import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import Router from 'next/router';
import { AppContextWrapper } from '../components/context/AppContext';


const onRedirectCallback = (appState: AppState) => {
  Router.replace(appState?.returnTo || '/');
};

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ""}
      scope={"openid user email"}
      redirectUri={(typeof window !== 'undefined' && window.location.origin) || ""}
      onRedirectCallback={onRedirectCallback}>
      <AppContextWrapper>
        <Component {...pageProps} />
      </AppContextWrapper>
    </Auth0Provider>
  )
}

export default App
