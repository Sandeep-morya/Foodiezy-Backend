import { getCollections } from "../../controllers/collection";
import { getRestaurants } from "../../controllers/restaurants";
import { getServiceAreaData } from "../../controllers/serviceArea";

const Query = {
	getServiceAreaData,
	getRestaurants,
	getCollections,
};

export default Query;
