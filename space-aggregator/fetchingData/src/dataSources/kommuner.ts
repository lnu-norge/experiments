import { fetchWithExponentialBackoff }  from './util'

export const getKommuneAndFylkeFromLatLong = async (lat: number, lon: number, srid = "4258") => {
	// See https://ws.geonorge.no/kommuneinfo/v1/#/ for info
	try {
		const url = `https://ws.geonorge.no/kommuneinfo/v1/punkt?koordsys=${srid}&nord=${lat}&ost=${lon}`
		const information = await fetchWithExponentialBackoff(url) as any 
		if (information.error) {
			throw information.error
		}
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