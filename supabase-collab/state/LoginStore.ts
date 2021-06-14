import { makeAutoObservable } from 'mobx'
import supabase from '../database/supabaseClient'
import { LokalerUser } from '../types/User'
import { AppStateStore } from './AppStateProvider'

export class LoginStore {
	user: LokalerUser = undefined
	loadingLogin: boolean = false

	/** Helper function for clearing all state, should be able to run it on all  */
	clearState = () => {
		this.user = undefined
		this.loadingLogin = false
	}

	setUser = (user: LokalerUser) => {
		this.loadingLogin = false
		this.user = user
	} 

	setLoadingLogin = (logginIn: boolean) => {
		this.user = undefined
		this.loadingLogin = logginIn
	}

	appState: AppStateStore
	constructor(appState: AppStateStore) {
		makeAutoObservable(this)
		this.appState = appState
		if (supabase.auth.user()) {
			this.setUser({
				email: supabase.auth.user().email
			})
		}
	}
}