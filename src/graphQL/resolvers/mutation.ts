import { addCollections } from "../../controllers/collection";
import { addRestaurants } from "../../controllers/restaurants";
import { addServiceArea } from "../../controllers/serviceArea";

const Mutation = {
	addServiceArea,
	addCollections,
	addRestaurants,
};

export default Mutation;
