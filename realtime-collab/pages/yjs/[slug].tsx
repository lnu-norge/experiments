import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const RealtimeTextarea = dynamic(() => import('../../components/RealtimeTextarea'), { ssr: false })


/** Editor:
 * 
 * DONE: Testing realtime editing, with a text field connected to the right slug
 * TODO: Persist storage somewhere
 * 
 */


const YJSTest = () => {
	
	const router = useRouter()
  const { slug } = router.query

  return <>{slug}: 
  	<RealtimeTextarea 
  		id={slug as string}
  	/>
  </>


}

export default YJSTest