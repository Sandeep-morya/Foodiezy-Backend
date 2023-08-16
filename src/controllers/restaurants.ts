import { GraphQLError } from "graphql";
import Restaurant from "../model/restaurant";
import type {
	AddRestarantsParams,
	Context,
	GetRestaurantsParams,
	IRestaurant,
	Parent,
} from "../types";
import getDynamicOptions from "./filteration";
import getSortingOrder from "./sorting";

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
	{ serviceAreaId, queryParams, page, limit }: GetRestaurantsParams,
	conext: Context,
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	page = page || 0;
	limit = limit || 20;

	const url = new URL(`https://example.com/path?${queryParams || ""}`)
		.searchParams;
	const options = getDynamicOptions(url, { serviceAreaId });
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
	};
};

const getRestaurant = async (_: Parent, { id }: { id: string }) => {
	return await Restaurant.findById(id);
};

export { addRestaurants, getRestaurants, getRestaurant };
/*
{
  sortParams: null,
  foodTypeParams: [ 'Pure Veg' ],
  cuisineParams: [ 'Bakery', 'Desserts', 'Sweets' ],
  deliveryParams: [],
  ratingParams: [ 'Ratings 4.0+', 'Ratings 4.5+' ],
  expoloreParams: [],
  costForTwoParams: [ '₹300 - ₹500' ]
}
{
  sortParams: 'title',
  foodTypeParams: [ 'Pure Veg' ],
  cuisineParams: [ 'Bakery', 'Desserts', 'Sweets' ],
  deliveryParams: [ 'Fast Delivery' ],
  ratingParams: [ 'Ratings 4.0+', 'Ratings 4.5+' ],
  expoloreParams: [ 'New on Foodiezy' ],
  costForTwoParams: [ '₹300 - ₹500' ]
}

console.log({
		sortParams,
		foodTypeParams,
		cuisineParams,
		deliveryParams,
		ratingParams,
		expoloreParams,
		costForTwoParams,
	});
 */
