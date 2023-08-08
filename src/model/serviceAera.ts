import { Schema, model } from "mongoose";

const serviceAreaSchema = new Schema(
	{
		name: { type: String, required: true },
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	{ timestamps: true },
);

const ServiceArea = model("ServiceArea", serviceAreaSchema);

export default ServiceArea;
