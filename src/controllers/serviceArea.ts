import { GraphQLError } from "graphql";
import ServiceArea from "../model/serviceAera";
import type {
	AddServiceAreaParams,
	Parent,
	GetServiceAreaDataParams,
} from "../types";

const addServiceArea = async (
	_: Parent,
	{ name, lat, lng }: AddServiceAreaParams,
) => {
	const area = await ServiceArea.findOne({
		$or: [{ name }, { $and: [{ lat }, { lng }] }],
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

const getServiceAreaData = async (
	_: Parent,
	{ serviceAreaName }: GetServiceAreaDataParams,
) => {
	const data = await ServiceArea.findOne({ name: serviceAreaName });
	if (!data) throw new GraphQLError("Services are not yet active in this area");
	return data;
};

export { addServiceArea, getServiceAreaData };
