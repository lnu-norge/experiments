import { observer } from "mobx-react-lite"
import { logout } from "../database/userAndLogin"
import { useAppState } from "../state/AppStateProvider"

export default observer(function Home() {
  const { user } = useAppState().login 

  return <>In as {user.email}!
  
    <button onClick={() => {
      logout()
    }}>
      Log out
    </button>
  </>
})
