import { NorwegianAddress } from 'space-aggregator-types';

/** Attempts to construct a deterministic string id from an address 
 * 
 * Returns null if it failed
 * Returns a string that is JSON safe for ID use if it succeeds
 * 
*/
const idFromAddress = (address: NorwegianAddress) => {

	// First we check if we have all the components we need
	const {
		street,
		postnumber,
		poststed
	} = address

	if (!(street && postnumber && poststed)) {
		console.error("Not a full address, cannot create ID")
		return null
	}

	// Then we normalize the address, and make it into one long string
	let stringId = ''
	
	stringId += street.toLowerCase()
		// IDEA: Might want to replace gt with gate, etc, here. to normalize it... 
		// Or we look up the street with some address tool to find the ID from there?

	stringId += '_' + postnumber.toLowerCase()

	stringId += '_' + poststed.toLowerCase()

	// Replace all space characters with -
	stringId = stringId.replace(/\s/g, '-')

	// Replace all non-JSON friendly characters with -, so we can use
	// it as more than a string
	stringId = stringId.replace(/[.#$/[\]]+/g, '-')
	
	return stringId
	
}

export default idFromAddress