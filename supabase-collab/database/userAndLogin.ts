import { AppState } from './../state/AppStateProvider';
import supabase from "./supabaseClient"

export const startLogin = async (email: string) => {
	AppState.login.setLoadingLogin(true)
		
	const { error, data: session }  = await supabase.auth.signIn({
		email
	})
	if (error) {
		// TODO: Handle error
		AppState.login.setLoadingLogin(false)
		throw(error)
	}
	return true 
}

export const logout = async () => {
	supabase.auth.signOut()
}

export const listenForAuth = () => {
	supabase.auth.onAuthStateChange((event, session) => {
		if (session && session.user && session.user.email) {
			// Logged in!
			return AppState.login.setUser({
				email: session.user.email
			})
		}
		return AppState.login.setUser(undefined)
	})
}