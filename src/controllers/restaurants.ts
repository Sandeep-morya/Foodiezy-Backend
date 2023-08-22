import { GraphQLError } from "graphql";
import Restaurant from "../model/restaurant";
import type {
	AddRestarantsParams,
	GetRestaurantsParams,
	IRestaurant,
	Parent,
} from "../types";
import getDynamicOptions from "./filteration";
import getSortingOrder from "./sorting";

const addRestaurants = async (
	_: Parent,
	{ restaurantsInput }: AddRestarantsParams,
) => {
	await Restaurant.create(restaurantsInput);
	return {
		status: true,
		message: "Restaurants Added Successfully",
	};
};

const getRestaurants = async (
	parent: IRestaurant | Parent,
	{ serviceAreaId, queryParams, page, limit }: GetRestaurantsParams,
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	page = page || 0;
	limit = limit || 20;

	const url = new URL(`https://example.com/path?${queryParams || ""}`)
		.searchParams;
	console.log(queryParams);

	const options =
		limit === 30
			? { name: new RegExp(queryParams, "i"), serviceAreaId }
			: getDynamicOptions(url, { serviceAreaId });

	let order = getSortingOrder(url);
	const totalCount = await Restaurant.countDocuments(options);

	const documents = await Restaurant.find(options)
		.sort(order as any)
		.skip(page * limit)
		.limit(limit);

	return {
		serviceAreaId,
		page,
		limit,
		count: documents.length,
		totalCount,
		documents,
		modified: JSON.stringify({ serviceAreaId }) !== JSON.stringify(options),
	};
};

const getRestaurant = async (_: Parent, { id }: { id: string }) => {
	return await Restaurant.findById(id);
};

export { addRestaurants, getRestaurants, getRestaurant };
