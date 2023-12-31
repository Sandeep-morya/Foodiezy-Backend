﻿import { mutateCart } from "../../controllers/cart";
import { addCollections } from "../../controllers/collection";
import { addRestaurants } from "../../controllers/restaurants";
import { addServiceArea } from "../../controllers/serviceArea";
import { registerUser } from "../../controllers/user";

const Mutation = {
	addServiceArea,
	addCollections,
	addRestaurants,
	registerUser,
	mutateCart,
};

export default Mutation;
