import mongoose from "mongoose";

export default async (uri: string | undefined) => {
	if (uri) {
		const { connection } = await mongoose.connect(uri);
		console.log("connected with the database of '" + connection.name + "'");
	} else {
		throw new Error("Invalid MONGO_URI variable");
	}
};
