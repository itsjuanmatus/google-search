import '../styles/globals.css'
import { AppProps } from 'next/app'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ResultContextProvider } from '../contexts/ResultContextProvider'

function MyApp ({ Component, pageProps }: AppProps) {
  const [darkTheme, setDarkTheme] = React.useState(false)
  return (
    <ResultContextProvider>
      <div className={darkTheme ? 'dark' : ''}>
        <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </ResultContextProvider>
  )
}
export default MyApp
