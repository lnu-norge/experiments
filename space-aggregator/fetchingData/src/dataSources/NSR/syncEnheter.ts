import fetch from 'node-fetch'
import { NSR_Enhet } from './nsr-types'
import { filePaths, NSR } from './config'
import fs from 'fs'

// Uses Nasjonalt skoleregister to make a list of contact information and more 
// for all schools in Norway

	/** Gets the latest list of school data from NSR and saves it to filepath.enheter */
	export const syncEnheter = async (): Promise<number | boolean> => {
	try {
		const data = await fetch(NSR.uri + NSR.all) 
		const enheter = await data.json() as NSR_Enhet[]
		const enheter__schools = enheter.filter(e => 
				e.ErSkole && 
				e.ErAktiv && (
				e.ErGrunnSkole ||
				e.ErVideregaaendeSkole)) // Active schools only
		// Save it to file: 
		fs.writeFileSync(filePaths.enheter, JSON.stringify(enheter__schools), 'utf8')
		return enheter.length	
	} catch (error) {
		console.error(error)
		return false
	}
}