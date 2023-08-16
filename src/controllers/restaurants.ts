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

	const totalCount = await Restaurant.countDocuments(options);

	const sortParams = url.get("sortby");

	let order: any = { createdAt: 1 };
	switch (sortParams) {
		case "rating":
			order = { rating: -1 };
			break;
		case "title":
			order = { name: 1 };
			break;
		case "h2l":
			order = { costForTwo: 1 };
			break;
		case "l2h":
			order = { costForTwo: -1 };
			break;
		case "delivery":
			order = { "delivery.time": -1 };
			break;
		default:
			order = { createdAt: 1 };
			break;
	}
	const documents = await Restaurant.find(options)
		.sort(order)
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
