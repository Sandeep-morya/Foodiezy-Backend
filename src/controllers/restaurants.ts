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
	{ serviceAreaId, queryParams, page, limit }: GetRestaurantsParams,
	conext: Context,
) => {
	serviceAreaId = parent?._id || serviceAreaId;
	page = page || 0;
	limit = limit || 20;

	const url = new URL(`https://example.com/path?${queryParams || ""}`)
		.searchParams;

	const sortParams = url.get("sortby");
	const foodTypeParams = url.getAll("foodType");
	const cuisineParams = url.getAll("cuisine");
	const deliveryParams = url.getAll("delivery");
	const ratingParams = url.getAll("rating");
	const expoloreParams = url.getAll("explore");
	const costForTwoParams = url.getAll("costForTwo");

	console.log({
		sortParams,
		foodTypeParams,
		cuisineParams,
		deliveryParams,
		ratingParams,
		expoloreParams,
		costForTwoParams,
	});

	const veg = (() => {
		const paramsLength = foodTypeParams.length;
		if (paramsLength === 1) {
			if (foodTypeParams[0] === "Pure Veg") {
				return 0;
			} else {
				return 1;
			}
		}
		return 2;
	})();

	let options: object = { serviceAreaId };

	if (veg === 0) {
		options = { ...options, veg: true };
	}

	if (veg === 1) {
		options = { ...options, veg: false };
	}

	if (cuisineParams.length > 0) {
		options = { ...options, cuisines: { $all: cuisineParams } };
	}

	const rating = (() => {
		const paramsLength = ratingParams.length;
		if (paramsLength > 0) {
			if (ratingParams.includes("Ratings 3.5+")) {
				return { $gte: 3.5 };
			}
			if (ratingParams.includes("Ratings 4.0+")) {
				return { $gte: 4 };
			}
			if (ratingParams.includes("Ratings 4.5+")) {
				return { $gte: 4.5 };
			}
		}

		return false;
	})();

	if (rating) {
		options = { ...options, rating };
	}

	if (deliveryParams.length > 0) {
		options = { ...options, "delivery.time": { $lte: 20 } };
	}
	// '₹300 - ₹500', 'Greater than ₹500', 'Less than ₹300'

	const totalCount = await Restaurant.countDocuments(options);
	const documents = await Restaurant.find(options)
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
