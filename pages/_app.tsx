import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextWrapper } from '../components/context/AppContext';
import { AuthProvider } from '../components/context/AuthContext';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <AppContextWrapper>
        <Component {...pageProps} />
      </AppContextWrapper>
    </AuthProvider>
  )
}

export default App
