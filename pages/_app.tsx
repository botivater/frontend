import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AppContextWrapper } from '../components/context/AppContext';
import { AuthProvider } from '../components/context/AuthContext';
import { CookiesProvider } from 'react-cookie';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <AppContextWrapper>
          <Component {...pageProps} />
        </AppContextWrapper>
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App
