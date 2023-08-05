import { Schema, model } from "mongoose";

const collectionSchema = new Schema(
	{
		area_id: {
			type: Schema.Types.ObjectId,
			ref: "ServiceArea",
			required: true,
		},
		type: { type: String, required: true },
		collection_id: { type: String, required: true },
		imageId: { type: String, required: true },
		text: { type: String, required: true },
		altText: { type: String, required: true },
	},
	{ timestamps: true },
);

const Collection = model("Collection", collectionSchema);

export default Collection;
