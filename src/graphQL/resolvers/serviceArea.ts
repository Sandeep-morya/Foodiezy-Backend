import { getCollections } from "../../controllers/collection";
import { getRestaurants } from "../../controllers/restaurants";

const ServiceArea = {
	collections: getCollections,
	restaurants: getRestaurants,
};

export default ServiceArea;
