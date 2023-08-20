import { GraphQLError } from "graphql";
import User from "../model/user";
import type { Context, Parent, registerUserParams } from "../types";
import jwt from "jsonwebtoken";

const secret_key = process.env.SECRET_KEY;

const registerUser = async (_: Parent, user: registerUserParams) => {
	if (!secret_key) {
		throw new GraphQLError("Provide SECRET_KEY in .env");
	}
	const userExists = await User.findOne({ email: user.email }).select(
		"-password",
	);

	if (userExists) {
		const token = jwt.sign(String(userExists._id), secret_key);
		return { token, about: userExists };
	} else {
		const data = new User(user);
		const res = await data.save();
		const token = jwt.sign(String(res._id), secret_key);
		const userObject = {
			_id: res._id,
			name: res.name,
			email: res.email,
			image: res.image,
			provider: res.provider,
		};
		return { token, about: userObject };
	}
};

const getUser = async (_: Parent, params: null, { token }: Context) => {
	if (!token) {
		throw new GraphQLError("Token Must be Provided to access this route");
	}
	if (!secret_key) {
		throw new GraphQLError("Provide SECRET_KEY in .env");
	}
	const userId = jwt.verify(token, secret_key);
	console.log(userId);
	return User.findById(userId);
};

export { registerUser, getUser };
