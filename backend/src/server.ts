import app from ".";

const start = async () => {
	try {
		await app.listen({ port: 3000, host: "0.0.0.0" });
		console.log("Server listening on port 3000");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
