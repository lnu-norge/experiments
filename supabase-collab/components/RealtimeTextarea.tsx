/** Editor:
 * 
 * Testing realtime editing, with a shared text field connected to the right slug
 * 
 */

import { useEffect, useState } from "react"
import supabase from "../database/supabaseClient"
import { Lokale } from "../types/Lokale"

const useSpaceData = (id: string): [Lokale, (lokale: Partial<Lokale>) => void, (lokale: Partial<Lokale>) => void] => {
  const [spaceData, setSpaceData] = useState<Lokale>(null)

  const fetchSupabaseData = async () => {
    const { data, error } = await supabase
      .from('lokaler')
      .select()
      .eq('id', id)
      .single()
      setSpaceData(data)
  }

  const subscribeToData = () => {
    return supabase.from(`lokaler:id=eq.${id}`).on('*', (payload => {
      console.log(payload)
      setSpaceData(payload.new)
    })).subscribe()
  }

  const mutateData = (lokale: Partial<Lokale>) => {
    setSpaceData({
      ...spaceData,
      ...lokale
    })
    storeData(lokale)
  }

  const storeData = async (lokale: Partial<Lokale>) => {
    console.log("Attemptint to store ", lokale)
    const { data, error } = await supabase.from('lokaler').upsert({
      id,
      ...lokale
    })
    console.log(data, error)
    return data
  }

  useEffect(() => {
    fetchSupabaseData()
    const subscription = subscribeToData()
    return () => {
      supabase.removeSubscription(subscription)
      setSpaceData(null)
    }
  }, [id])
  return [spaceData, mutateData, storeData] 
}

const RealtimeTextarea = ({id}: {id: string}) => {
   const [data, mutate, store] = useSpaceData(id)

   if (!data) {
     return <>Loading...</>
   }

   return <>
      <form onSubmit={(e) => {
        e.preventDefault()
        store(data)
      }}>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <textarea  value={data.description} onChange={e => mutate({
          description: e.target.value
        })} />
        <button type="submit">Send inn</button>
      </form>
    
    </>
}


export default RealtimeTextarea
