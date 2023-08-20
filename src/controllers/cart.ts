import Cart from "../model/cart";
import { IUser } from "../types";

const getCart = async (parent: IUser) => {
	return await Cart.find({ userId: parent._id });
};

export { getCart };
