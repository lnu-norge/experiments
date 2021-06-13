/** Editor:
 * 
 * Testing realtime editing, with a shared text field connected to the right slug
 * 
 * TODO: Persist storage somewhere, presumably using something other than webrtc
 * 
 */


import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/cursors', QuillCursors)
 
const RealtimeTextarea = ({id}: {id: string}) => {
 
const textareaRef = useRef<HTMLDivElement>()

useEffect(() => {

  // A Yjs document holds the shared data
  const ydoc = new Y.Doc()
  
  const provider = new WebrtcProvider(id, ydoc)
  
  // Define a shared text type on the document
  const ytext = ydoc.getText('quill')

// Creat a quill editor
  const quill = new Quill(textareaRef.current, {
    modules: {
      cursors: true,
      toolbar: [
        // adding some basic Quill content features
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      history: {
        // Local undo shouldn't undo changes
        // from remote users
        userOnly: true
      }
    },
    placeholder: 'Start collaborating...',
    theme: 'snow' // 'bubble' is also great
  })
  

  // "Bind" the quill editor to a Yjs text type.
  const binding = new QuillBinding(ytext, quill, provider.awareness)
  
  // Remove the selection when the iframe is blurred
  window.addEventListener('blur', () => { quill.blur() })
  
})
 
 return <div ref={textareaRef}>
    </div>
}


export default RealtimeTextarea
