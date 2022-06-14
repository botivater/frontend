import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextWrapper } from '../components/context/AppContext';
import { AuthProvider } from '../components/context/AuthContext';
import { CookiesProvider } from 'react-cookie';

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
