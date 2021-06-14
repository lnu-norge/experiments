import { AppState } from './../state/AppStateProvider';
import supabase from "./supabaseClient"

export const login = async (email: string) => {
	AppState.login.setLoadingLogin(true)
		
	const { error, data: session }  = await supabase.auth.signIn({
		email
	})
	if (error) {
		// TODO: Handle error
		AppState.login.setLoadingLogin(false)
		throw(error)
	}

	if (session && session.user) {
		// Store user data, and return
		AppState.login.setUser({
			email: session.user.email!
		})
		return AppState.login.user
	}

	return true 

}

export const logout = () => {
	supabase.auth.signOut()
	AppState.login.setUser(undefined)
}