'use client'

import axios from 'axios'

export function RegisterForm() {
	const handleSubmit = async e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const data = Object.fromEntries(formData)
		console.log(data)
		const res = await axios.post('/api/auth/register', JSON.stringify(data))
		console.log(res.data)
	}

	return (
		<div>
			<form action="#" onSubmit={e => handleSubmit(e)}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" className="border-black border" />
				<label htmlFor="password">password</label>
				<input type="password" name="password" id="password" className="border border-black" />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}
