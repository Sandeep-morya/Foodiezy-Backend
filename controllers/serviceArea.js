import { GraphQLError } from "graphql";
import ServiceArea from "../model/serviceAera.js";

const addServiceArea = async (_, { name, lat, lng }, { admin }) => {
	console.log({ admin });
	if (!admin) throw new GraphQLError("You are not allowed to Mutate DB");

	const regexName = new RegExp(name, "i");
	const area = await ServiceArea.findOne({
		$or: [{ name: regexName }, { $and: [{ lat }, { lng }] }],
	});
	if (area)
		throw new GraphQLError(
			`${area.name} Already Exists! \nProvide distinct name or coordinates`,
		);

	const serviceArea = new ServiceArea({ name, lat, lng });
	const data = await serviceArea.save();
	console.log(data);
	return {
		status: true,
		message: "Service Area Added Successfully",
		keys: [data._id],
		count: 1,
	};
};

const getServiceAreaData = async (_, { serviceAreaName }, context) => {
	const name = new RegExp(serviceAreaName, "i");
	const data = await ServiceArea.findOne({ name });
	if (!data) throw new GraphQLError("Services are not yet active in this area");
	return data;
};

export { addServiceArea, getServiceAreaData };
