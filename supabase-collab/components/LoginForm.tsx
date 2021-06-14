import { useAppState } from "../state/AppStateProvider"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { login } from "../database/userAndLogin"

function LoginForm() {
  const { user, loadingLogin,  setUser } = useAppState().login 
	const [ email, setEmail ] = useState<string>("")
  
	if (loadingLogin) return <>"Loading..."</>

  if (user) return <>
		Already logged in. 
		<button onClick={() => alert("no log out yet")}>	
			Log out!
			</button>
  </>
  
  return <form onSubmit={() => login(email)}>
		<input value={email} onChange={e => setEmail(e.target.value)} />
		<button type="submit">Logg inn</button>
	</form>
}

export default observer(LoginForm)
