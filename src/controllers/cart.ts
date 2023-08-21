import { GraphQLError } from "graphql";
import Cart from "../model/cart";
import { IUser, MutateCartParams, Parent } from "../types";
const secret_key = process.env.SECRET_KEY;

const getCart = async (parent: IUser) => {
	const data = await Cart.findOne({ userId: parent._id });
	return data ? data.cartItems : [];
};

const mutateCart = async (
	_: Parent,
	{ cartInput, userId }: MutateCartParams,
) => {
	if (!secret_key) {
		throw new GraphQLError("Provide SECRET_KEY in .env");
	}

	await Cart.findOneAndUpdate(
		{ userId },
		{ $set: { cartItems: cartInput } },
		{ new: true },
	);

	return "Cart Updated Successfully";
};

export { getCart, mutateCart };
