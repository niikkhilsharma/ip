import { NextResponse } from 'next/server'
// import IP from '@/models/ip'
import NewIP from '@/models/newIp'
import dbConnect from '@/lib/dbConnect'

export async function POST(req) {
	const ip = req.headers.get('x-forwarded-for')
	console.log(ip)
	const { fpHash } = await req.json()
	console.log(ip, fpHash)

	try {
		await dbConnect()
		const alreadyExist = await NewIP.findOne({ IP: ip, visitorId: fpHash })
		if (alreadyExist) {
			console.log('alreadyExist', alreadyExist)
			const updatedData = await NewIP.findOneAndUpdate(
				{ IP: ip, visitorId: fpHash },
				{ $inc: { Count: 1 } },
				{ new: true }
			)
			return NextResponse.json(ip)
		}
		const createdData = await NewIP.create({ IP: ip, visitorId: fpHash })
		console.log('createdData', createdData)
	} catch (error) {
		console.log(error)
	}
	return NextResponse.json(ip)
}
