'use client'
import axios from 'axios'
import React from 'react'

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

const Page = () => {
	const { isLoading, error, data } = useVisitorData()

	async function saveData() {
		const response = await axios.post('/api/ip', { fpHash })
		console.log(response.data)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		console.log(error)
		return (
			<div>
				An error occured: {error.message} {JSON.stringify(error)}
			</div>
		)
	}

	if (data) {
		saveData(data.visitorId)
		return (
			<div>
				Welcome {data.visitorFound ? 'back' : ''}, {data.visitorId}!
			</div>
		)
	} else {
		return <>trying... to fetch it</>
	}
}

export default Page
