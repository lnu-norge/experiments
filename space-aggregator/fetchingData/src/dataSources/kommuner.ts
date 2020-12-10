import { fetchWithExponentialBackoff }  from './util'

export const getKommuneAndFylkeFromLatLong = async (lat: number, lon: number, srid = "4258") => {
	
	if (!lat || !lon) {
		throw new Error("Missing lat or lon")
	}
	// See https://ws.geonorge.no/kommuneinfo/v1/#/ for info
	try {
		const url = `https://ws.geonorge.no/kommuneinfo/v1/punkt?koordsys=${srid}&nord=${lat}&ost=${lon}`
		const response = await fetchWithExponentialBackoff(url) as any 
		const information = await response.json() as any
		if (information.error) {
			throw information.error
		}
		console.log(information)
		return information as {
			fylkesnavn: string
			fylkesnummer: string
			kommunenavn: string
			kommunenummer: string
		}
	} catch (error) {
		console.error("Could not fetch information about kommune. Is geoNorge down?")
		console.error(error)
	}
}