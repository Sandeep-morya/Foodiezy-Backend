import { GraphQLError } from "graphql";
import Cart from "../model/cart";
import { CartItem, Context, IUser, Parent } from "../types";
import jwt from "jsonwebtoken";
const secret_key = process.env.SECRET_KEY;

const getCart = async (parent: IUser) => {
	const data = await Cart.findOne({ userId: parent._id });
	return data ? data.cartItems : [];
};

const mutateCart = async (
	_: Parent,
	{ cartInput }: { cartInput: CartItem[] },
	{ token }: Context,
) => {
	if (!secret_key) {
		throw new GraphQLError("Provide SECRET_KEY in .env");
	}
	if (!token) {
		throw new GraphQLError("Token Must be Provided to access this route");
	}

	const userId = jwt.verify(token, secret_key);
	await Cart.findOneAndUpdate(
		{ userId },
		{ $set: { cartItems: cartInput } },
		{ new: true },
	);

	return "Cart Updated Successfully";
};

export { getCart, mutateCart };
