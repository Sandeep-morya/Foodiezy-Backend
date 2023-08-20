import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
	dishId: { type: String, required: true },
	dishName: { type: String, required: true },
	category: { type: String, required: true },
	imageId: { type: String, default: "" },
	price: { type: Number, required: true },
	count: { type: Number, required: true },
	restaurantId: { type: String, required: true },
	restaurantName: { type: String, required: true },
});

const cartSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		cartItems: [CartItemSchema],
	},
	{
		versionKey: false,
	},
);

const Cart = model("Cart", cartSchema);

export default Cart;
