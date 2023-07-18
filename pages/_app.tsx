import '@/styles/globals.css'
import { darkTheme, lightTheme, customTheme } from '@/themes'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import Cookies from 'js-cookie'
import type { AppContext, AppProps } from 'next/app'
import { useEffect, useState } from 'react'

interface Props extends AppProps {
  theme: string
}
export default function App({ Component, pageProps, theme }: Props) {

  const [ currentTheme, setCurrentTheme ] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const conditionalThemes = cookieTheme === 'light'
    ? lightTheme
    : (cookieTheme === 'dark')
      ? darkTheme
      : customTheme

      setCurrentTheme(conditionalThemes)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// VENTAJAS 

// DESVENTAJAS

// App.getInitialProps = async(appContext: AppContext) => {
  
//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//   const validThemes = ['light', 'dark', 'custom']

//   console.log('GetInitialProps', theme);

//   return {
//     theme: validThemes.includes(theme) ? theme : 'light'
//   }
// }