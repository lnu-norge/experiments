import { useRouter } from 'next/router'

/** Editor:
 * 
 * TODO: Testing realtime editing, with a text field connected to the right slug
 * TODO: Show who is active on realtime editing
 * 
 */
const Editor = () => {

  const router = useRouter()
  const { slug } = router.query

	return <>Foo: {slug}</>
}

export default Editor