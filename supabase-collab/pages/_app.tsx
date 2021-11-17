import '../styles/globals.css'
import AppStateProvider, { useAppState } from "../state/AppStateProvider"
import { observer } from "mobx-react-lite"
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { listenForAuth } from '../database/userAndLogin'

function MyApp({ Component, pageProps }) {
  const { user } = useAppState().login 
  
  useEffect(() => {
    listenForAuth()
  }, [])

  if (!user) return <AppStateProvider>
    You need to login first...  
    <LoginForm />
    </AppStateProvider>
  
  return <AppStateProvider>
    <Component {...pageProps} />
  </AppStateProvider>
}

export default observer(MyApp)
