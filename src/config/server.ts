import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import typeDefs from "../graphQL/typeDefs";
import httpServer from "./httpServer";
import type { Context } from "../types";
import Query from "../graphQL/resolvers/query";
import Mutation from "../graphQL/resolvers/mutation";
import ServiceArea from "../graphQL/resolvers/serviceArea";
import User from "../graphQL/resolvers/user";

const server = new ApolloServer<Context>({
	typeDefs: typeDefs,
	resolvers: {
		Query,
		Mutation,
		ServiceArea,
		User,
	},
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export default server;
