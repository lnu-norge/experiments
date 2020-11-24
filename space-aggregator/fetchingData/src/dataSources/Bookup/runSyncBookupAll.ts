import { BookupGetLIstByParamsSearchResult } from 'space-aggregator-types';
import * as bookupConfig from './config';
import { syncAll } from '../util'



const filterFunction = (rawInput: BookupGetLIstByParamsSearchResult) => {
	return rawInput.RentObjects
} 

syncAll(bookupConfig, filterFunction)

