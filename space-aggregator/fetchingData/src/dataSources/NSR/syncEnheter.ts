import { NSR_Enhet } from 'space-aggregator-types'
import * as config from './config'
import { syncAll } from '../util'

// Uses Nasjonalt skoleregister to make a list of contact information and more 
// for all schools in Norway

	/** Gets the latest list of school data from NSR and saves it to filepath.enheter */
	export const syncEnheter = async (): Promise<number | boolean> => {

		const filterFunction = (enheter: NSR_Enhet[]) => {
			return enheter.filter(e => 
				e.ErSkole && 
				e.ErAktiv && (
				e.ErGrunnSkole ||
				e.ErVideregaaendeSkole)) // Active schools only
		}

		return syncAll(config, filterFunction)
}

