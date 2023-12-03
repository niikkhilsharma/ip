import mongoose from 'mongoose'
const ip = new mongoose.Schema({
	ip: {
		type: String,
		required: true,
	},
})
const IP = mongoose.models.IP || mongoose.model('IP', ip)
export default IP
