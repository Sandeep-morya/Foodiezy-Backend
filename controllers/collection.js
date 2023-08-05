import { GraphQLError } from "graphql";
import Collection from "../model/collection.js";

const addCollections = async (_, { collectionsInput }, { admin }) => {
	console.log({ admin });
	if (!admin) throw new GraphQLError("You are not allowed to Mutate DB");

	const data = await Collection.create(collectionsInput);

	return {
		status: true,
		message: "Collections Added Successfully",
		keys: data.map((e) => e._id),
		count: data.length,
	};
};

const getCollections = async (parent, { serviceAreaId }) => {
	serviceAreaId = parent?._id || serviceAreaId;
	return await Collection.find({ serviceAreaId });
};

export { addCollections, getCollections };
