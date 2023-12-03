import { NextResponse } from 'next/server'
import User from '@/models/User'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'

export async function POST(req) {
	const { email, password } = await req.json()
	await dbConnect()

	console.log('email', email)
	console.log('password', password)
	const user = await User.create({ name: 'nikhil', email, password, emailVerified: true })
	console.log(user)

	return NextResponse.json(user)
}
