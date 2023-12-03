import mongoose from 'mongoose'
const newIP = new mongoose.Schema({
	IP: {
		type: String,
		required: true,
	},
	visitorId: {
		type: String,
		required: true,
	},
	Count: {
		type: Number,
		default: 1,
	},
})
const NewIP = mongoose.models.IP || mongoose.model('IP', newIP)
export default NewIP
