import "dotenv/config";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import schema from "./graphQL/schema.js";
import { Server } from "socket.io";
import connectDB from "./config/connection.js";
import context from "./graphQL/context.js";

// :: Connecting with MongoDB ::
(async () => {
	const { connection } = await connectDB(process.env.MONGO_URI);
	console.log(`Connected with the database of ${connection.name}`);
})();

const server = createServer(
	createYoga({
		schema,
		context: async ({ request }) => {
			return { admin: true };
		},
	}),
);

const io = new Server(server, { cors: { origin: "*" } });

server.listen(process.env.PORT, () => {
	console.log(
		`Server is Running on http://localhost:${process.env.PORT}/graphql`,
	);
});

// Listeng socket server events
io.on("connection", (socket) => {
	console.log(socket.id);
});
