import { createSchema } from "graphql-yoga";
import typeDefs from "./typeDefs.js";
import Query from "./resolvers/query.js";
import Mutation from "./resolvers/mutation.js";

export default createSchema({
	typeDefs,
	resolvers: { Query, Mutation },
});
