import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const RealtimeTextarea = dynamic(() => import('../../components/RealtimeTextarea'), { ssr: false })


/** Editor:
 * 
 * TODO: Testing realtime editing, with a text field connected to the right slug
 * TODO: Show who is active on realtime editing
 * 
 */


const Lokale = () => {
	
	const router = useRouter()
  const { slug } = router.query

  return <>{slug}: <RealtimeTextarea /></>


}

export default Lokale