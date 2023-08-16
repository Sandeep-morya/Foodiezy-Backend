import "dotenv/config";
import { expressMiddleware } from "@apollo/server/express4";
import app from "./config/app";
import express from "express";
import cors from "cors";
import server from "./config/server";
import context from "./graphQL/context";
import httpServer from "./config/httpServer";
import dbConnect from "./config/dbConnect";

(async () => {
	// Connect to the MongoDB database using the URI from environment variable
	await dbConnect(process.env.MONGO_URI);

	// Set up CORS and JSON parsing for your Express app
	app.use(cors<cors.CorsRequest>(), express.json());

	// Start the Apollo Server
	await server.start();

	// Add Apollo Server middleware to the "/foodiezy" endpoint
	app.use("/foodiezy", expressMiddleware(server, { context }));

	// Start the HTTP server
	httpServer.listen(process.env.PORT, () => {
		console.log("Server is up and running");
	});
})();
