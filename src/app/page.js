import {
	LoginButton,
	LogoutButton,
	ProfileButton,
	RegisterButton,
} from '@/components/buttons.component'

import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { signIn } from 'next-auth/react'

export default async function Home() {
	const session = await getServerSession(authOptions)
	console.log(session)

	return (
		<main
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '70vh',
			}}
		>
			<div>
				<LoginButton />
				<RegisterButton />
				<LogoutButton />
				<ProfileButton />

				<h1>Server Session</h1>
				<div className="relative">
					<div className="absolute overflow-scroll max-w-2xl">
						<pre>{JSON.stringify(session)}</pre>
					</div>
				</div>
			</div>
		</main>
	)
}
