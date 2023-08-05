import { Schema, model } from "mongoose";

const collectionSchema = new Schema(
	{
		serviceAreaId: {
			type: Schema.Types.ObjectId,
			ref: "ServiceArea",
			required: true,
		},
		type: { type: String, required: true },
		collectionId: { type: String, required: true },
		imageId: { type: String, required: true },
		text: { type: String, required: true },
		altText: { type: String, required: true },
	},
	{ timestamps: true },
);

const Collection = model("Collection", collectionSchema);

export default Collection;
