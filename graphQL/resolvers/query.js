import { getCollections } from "../../controllers/collection.js";
import { getRestaurants } from "../../controllers/restaurants.js";
import { getServiceAreaData } from "../../controllers/serviceArea.js";

const Query = {
	getServiceAreaData,
	getRestaurants,
	getCollections,
};

export default Query;
