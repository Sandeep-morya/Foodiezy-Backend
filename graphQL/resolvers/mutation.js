import { addCollections } from "../../controllers/collection.js";
import { addServiceArea } from "../../controllers/serviceArea.js";
import { addRestaurants } from "../../controllers/restaurants.js";

const Mutation = {
	addServiceArea,
	addCollections,
	addRestaurants,
};

export default Mutation;
