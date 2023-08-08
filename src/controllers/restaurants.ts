import { GraphQLError } from "graphql";
import Restaurant from "../model/restaurant";
import type {
	AddRestarantsParams,
	Context,
	GetRestaurantsParams,
	IRestaurant,
	Parent,
} from "../types";

const addRestaurants = async (
	_: Parent,
	{ restaurantsInput }: AddRestarantsParams,
	conext: Context,
) => {
	await Restaurant.create(restaurantsInput);
	return {
		status: true,
		message: "Restaurants Added Successfully",
	};
};

const getRestaurants = async (
	parent: IRestaurant | Parent,
	{ serviceAreaId, page, limit }: GetRestaurantsParams,
	conext: Context,
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	page = page || 0;
	limit = limit || 20;
	const totalCount = await Restaurant.countDocuments({ serviceAreaId });
	const documents = await Restaurant.find({ serviceAreaId })
		.skip(page * limit)
		.limit(limit);

	return {
		serviceAreaId,
		page,
		limit,
		count: documents.length,
		totalCount,
		documents,
	};
};

export { addRestaurants, getRestaurants };
