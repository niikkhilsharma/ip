import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '@/lib/mongodb'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'

export const authOptions = {
	session: {
		jwt: true,
	},
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			id: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (credentials == null) return null
				console.log('credentials', credentials)

				await dbConnect()

				try {
					const user = await User.findOne({ email: credentials.email })

					if (user) {
						const isMatch = await bcrypt.compare(credentials.password, user.password)
						if (isMatch) {
							return user
						} else {
							throw new Error('Email or password is incorrect')
						}
					} else {
						throw new Error('User not found')
					}
				} catch (err) {
					throw new Error(err)
				}
			},
		}),
	],

	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('signIn below')
			console.log('user', user)
			console.log('account', account)
			console.log('profile', profile)
			console.log('email', email)
			console.log('credentials', credentials)

			return true
		},
		// async redirect({ url, baseUrl }) {
		// 	console.log('redirect', url, baseUrl)
		// 	return baseUrl
		// },
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log('jwt', token, user, account, profile, isNewUser)
			token.id = user?.id
			return token
		},
		async session({ session, user, token }) {
			console.log('session below')
			console.log('session', session, user, token)
			session.user.id = token?.id
			return session
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
