import { createContext, ReactNode, useContext } from "react"
import { LoginStore } from "./LoginStore"

// All app State stores
export class AppStateStore {
	login: LoginStore
	constructor() {
		this.login = new LoginStore(this)
	}
}

// Rest is boiler plate to just connect
// the MobX state to context:

export const AppState = new AppStateStore()

const AppStateContext = createContext<AppStateStore>(AppState)

export const useAppState = () => {
	return useContext(AppStateContext)
}

const AppStateProvider = ({ children }: { children: ReactNode }) => {
	const store = AppState

	return (
		<AppStateContext.Provider value={store}>
			{children}
		</AppStateContext.Provider>
	)
}

export default AppStateProvider
