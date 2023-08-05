import { getCollections } from "../../controllers/collection.js";
import { getRestaurants } from "../../controllers/restaurants.js";

const ServiceArea = {
	collections: getCollections,
	restaurants: getRestaurants,
};

export default ServiceArea;
