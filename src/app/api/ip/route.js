import { NextResponse } from 'next/server'
import IP from '@/models/ip'
import dbConnect from '@/lib/dbConnect'

export async function GET(req) {
	const ip = req.headers.get('x-forwarded-for')
	console.log(ip)
	try {
		await dbConnect()
		await IP.create({ ip })
	} catch (error) {
		console.log(error)
	}
	return NextResponse.json(ip)
}
