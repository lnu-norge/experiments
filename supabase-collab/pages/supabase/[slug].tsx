import { useRouter } from 'next/router'
import RealtimeTextarea from '../../components/RealtimeTextarea'

/** Editor:
 * 
 * TODO: Testing realtime editing, with a text field connected to the right slug
 * 
 */


const SupabaseTest = () => {
	
	const router = useRouter()
  const { slug } = router.query

  return <>{slug}: 
  	<RealtimeTextarea 
  		id={slug as string}
  	/>
  </>


}

export default SupabaseTest