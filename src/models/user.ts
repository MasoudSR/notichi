import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	data: {
		updatedAt: String,
		folders: [],
		notes: [],
		removedItems: [],
	},
	removedItems: [],
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
