'use client'
import { RegisterForm } from './form'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
	return (
		<div
			style={{
				display: 'flex',
				height: '70vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>
				<h1>Register</h1>
				<RegisterForm />
				<button
					onClick={e => {
						// signIn('credentials', { email: 'niikkhilsharma@gmail.com', password: '123456' })
						signIn()
					}}
				>
					Sign In with Credentials
				</button>
			</div>
		</div>
	)
}
