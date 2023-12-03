'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

const Page = () => {
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

	useEffect(() => {
		async function saveData() {
			const response = await axios.post('/api/ip', { fpHash })
			console.log(response.data)
		}
		if (fpHash) {
			saveData()
		}
	}, [fpHash])

	return (
		<div>
			<p className="font-bold underline">IP stored on the server</p>
			Your Device Id:{fpHash}
		</div>
	)
}

export default page
