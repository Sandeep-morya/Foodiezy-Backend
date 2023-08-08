import express from "express";
const app = express();

app.get("/", (req, res) => {
	res.send("Server is Running");
});

export default app;
