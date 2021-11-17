import { useAppState } from "../state/AppStateProvider"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { logout, startLogin } from "../database/userAndLogin"

function LoginForm() {
  const { user, loadingLogin,  setUser } = useAppState().login 
	const [ email, setEmail ] = useState<string>("")
  
	if (loadingLogin) return <>Sendt deg en e-post. Klikk på lenken i den for å logge inn!</>

  if (user) return <>
	Logget inn!
		<button onClick={() => logout()}>	
			Logg ut!
			</button>
  </>
  
  return <form onSubmit={() => startLogin(email)}>
		<input value={email} onChange={e => setEmail(e.target.value)} />
		<button type="submit">Logg inn</button>
	</form>
}

export default observer(LoginForm)
