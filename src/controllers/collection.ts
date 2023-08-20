import { GraphQLError } from "graphql";
import Collection from "../model/collection";
import type {
	AddCollectionsParams,
	GetCollectionParams,
	ICollection,
	Parent,
} from "../types";

const addCollections = async (
	_: Parent,
	{ collectionsInput }: AddCollectionsParams,
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
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	return await Collection.find({ serviceAreaId });
};

export { addCollections, getCollections };
