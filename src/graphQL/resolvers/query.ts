import { getCollections } from "../../controllers/collection";
import { getRestaurant, getRestaurants } from "../../controllers/restaurants";
import { getServiceAreaData } from "../../controllers/serviceArea";
import { getUser } from "../../controllers/user";

const Query = {
	getServiceAreaData,
	getRestaurants,
	getCollections,
	getRestaurant,
	getUser,
};

export default Query;
