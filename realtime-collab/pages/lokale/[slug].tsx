import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebrtcProvider } from 'y-webrtc'
import QuillCursors from 'quill-cursors'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })


/** Editor:
 * 
 * TODO: Testing realtime editing, with a text field connected to the right slug
 * TODO: Show who is active on realtime editing
 * 
 */


const Lokale = () => {
	
	const router = useRouter()
  const { slug } = router.query
	const quill = useRef(null)
	let quillEditor = null 

	// Quill binding to YJS
	useEffect(() => {
		attachQuillRefs()
		return () => {
		}
	}, [])

	const attachQuillRefs = () => {
    if (typeof quill.current.getEditor !== 'function') return;
    quillEditor = quill.current.getEditor();
						/* @ts-ignore */
		ReactQuill.Quill.register('modules/cursors', QuillCursors);
		const ydoc = new Y.Doc()
		const yText = ydoc.getText('quill')
		// This is unsafe, getEditor makes it out of sync with React
		console.log("quill attached", quill.current)
		const binding = new QuillBinding(quillEditor, yText)
		const provider = new WebrtcProvider('quill-demo-room', ydoc)
  }

		return <>Bar: {slug}
		<ReactQuill
				/* @ts-ignore */
				ref={quill}
				theme="snow"
			/>
	
	</>


}

export default Lokale