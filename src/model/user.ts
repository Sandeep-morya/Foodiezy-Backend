import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, default: "" },
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/due9pi68z/image/upload/v1681283815/aspuvrjmiwgyhyxig8dz.png",
		},
		provider: { type: String, default: "Foodiezy" },
	},
	{
		versionKey: false,
	},
);

const User = model("User", userSchema);

export default User;
