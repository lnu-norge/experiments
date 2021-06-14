import '../styles/globals.css'
import { useAppState } from "../state/AppStateProvider"
import { observer } from "mobx-react-lite"
import React from 'react'
import LoginForm from '../components/LoginForm'

function MyApp({ Component, pageProps }) {
  const { user } = useAppState().login 
  
  if (!user) return <>You need to login first...  
    <LoginForm />
  </>
  
  return <Component {...pageProps} />
}

export default observer(MyApp)
