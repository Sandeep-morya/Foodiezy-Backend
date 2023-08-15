import type { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";

export default async (context: ExpressContextFunctionArgument) => {
	return context;
};
