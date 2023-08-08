import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import typeDefs from "../graphQL/typeDefs";
import Query from "../graphQL/resolvers/query";
import Mutation from "../graphQL/resolvers/mutation";
import ServiceArea from "../graphQL/resolvers/serviceArea";
import httpServer from "./httpServer";
import type { Context } from "../types";

const server = new ApolloServer<Context>({
	typeDefs: typeDefs,
	resolvers: {
		Query,
		Mutation,
		ServiceArea,
	},
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export default server;
