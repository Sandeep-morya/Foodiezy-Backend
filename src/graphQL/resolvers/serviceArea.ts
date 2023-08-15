import { getCollections } from "../../controllers/collection";
import { getRestaurants } from "../../controllers/restaurants";

const ServiceArea = {
	collections: getCollections,
};

export default ServiceArea;
