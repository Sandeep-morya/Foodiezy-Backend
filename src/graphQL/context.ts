import type { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Context } from "../types";

export default async ({ req }: ExpressContextFunctionArgument) => {
	const token = req.headers.authorization;
	const context = { token: undefined };
	if (token) {
		const parsedToken = token.replace("Bearer ", "");
		return { token: parsedToken };
	}
	return context;
};
