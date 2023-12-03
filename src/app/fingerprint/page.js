'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

// import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

const page = () => {
	// const { isLoading, error, data, getData } = useVisitorData(
	// 	{ extendedResult: true },
	// 	{ immediate: true }
	// )
	const [fpHash, setFpHash] = useState('')

	useEffect(() => {
		const setFp = async () => {
			const fp = await FingerprintJS.load()

			const { visitorId } = await fp.get()

			setFpHash(visitorId)
			console.log(visitorId)
		}

		setFp()
	}, [])

	async function saveData() {
		const response = await axios.post('/api/ip', { fpHash })
		console.log(response.data)
	}
	useEffect(() => {
		if (fpHash) {
			saveData()
		}
	}, [fpHash])

	return (
		<div>
			{/* <button onClick={() => getData({ ignoreCache: true })}>Reload data</button>
			{isLoading ? (
				'Loading...'
			) : (
				<>
					{' '}
					<p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
					<p>Full visitor data:</p>
					<pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
				</>
			)} */}
			<p className="font-bold underline">IP stored on the server</p>
			Your Device Id:{fpHash}
		</div>
	)
}

export default page
