
import fetch from 'node-fetch' 
import fetchRetry from 'fetch-retry'

export const fetchWithExponentialBackoff = fetchRetry(fetch as any, {
	retries: 6,
	retryDelay: function(attempt: number) {
		return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
	}
})