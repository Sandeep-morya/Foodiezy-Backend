﻿import { createSchema } from "graphql-yoga";
import typeDefs from "./typeDefs.js";
import Query from "./resolvers/query.js";
import Mutation from "./resolvers/mutation.js";
import ServiceArea from "./resolvers/serviceArea.js";

export default createSchema({
	typeDefs,
	resolvers: { Query, ServiceArea, Mutation },
});
