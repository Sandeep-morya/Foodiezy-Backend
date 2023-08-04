import "dotenv/config";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import schema from "./graphQL/schema.js";
import { Server } from "socket.io";

const server = createServer(createYoga({ schema }));

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log(socket.id);
});

server.listen(process.env.PORT, () => {
	console.log(
		`Server is Running on http://localhost:${process.env.PORT}/graphql`,
	);
});
