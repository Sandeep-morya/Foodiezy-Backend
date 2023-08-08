import { GraphQLError } from "graphql";
import Collection from "../model/collection";
import type {
	AddCollectionsParams,
	Context,
	GetCollectionParams,
	ICollection,
	Parent,
} from "../types";

const addCollections = async (
	_: Parent,
	{ collectionsInput }: AddCollectionsParams,
	conext: Context,
) => {
	await Collection.create(collectionsInput);
	return {
		status: true,
		message: "Collections Added Successfully",
	};
};

const getCollections = async (
	parent: ICollection | Parent,
	{ serviceAreaId }: GetCollectionParams,
	conext: Context,
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	return await Collection.find({ serviceAreaId });
};

export { addCollections, getCollections };
