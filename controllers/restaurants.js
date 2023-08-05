import { GraphQLError } from "graphql";
import Restaurant from "../model/restaurant.js";

const addRestaurants = async (_, { restaurantsInput }, { admin }) => {
	console.log({ admin });
	if (!admin) throw new GraphQLError("You are not allowed to Mutate DB");

	const data = await Restaurant.create(restaurantsInput);

	return {
		status: true,
		message: "Restaurants Added Successfully",
		keys: data.map((e) => e._id),
		count: data.length,
	};
};

const getRestaurants = async (parent, { serviceAreaId, page, limit }) => {
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
