import { getCollections } from "../../controllers/collection";
import { getRestaurant, getRestaurants } from "../../controllers/restaurants";
import { getServiceAreaData } from "../../controllers/serviceArea";

const Query = {
	getServiceAreaData,
	getRestaurants,
	getCollections,
	getRestaurant,
};

export default Query;
