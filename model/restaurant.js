import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
	{
		serviceAreaId: {
			type: Schema.Types.ObjectId,
			ref: "ServiceArea",
			required: true,
		},
		type: { type: String, required: true },
		restaurantId: { type: String, required: true },
		name: { type: String, required: true },
		imageId: { type: String, required: true },
		cuisines: { type: [String], default: [] },
		locality: { type: String, default: "" },
		veg: { type: Boolean, required: true },
		areaName: { type: String, required: true },
		costForTwo: { type: String, required: true },
		rating: { type: Number, required: true },
		votesString: { type: String, required: true },
		delivery: {
			time: { type: Number, required: true },
			duration: { type: String, required: true },
			distance: { type: String, default: "" },
		},
		discount: { type: String, default: "" },
	},
	{ timestamps: true },
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
