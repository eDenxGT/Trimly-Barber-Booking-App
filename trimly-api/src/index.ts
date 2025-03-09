//* ====== Node module-alias Imports ====== *//
import 'module-alias/register';

//* ====== DI Imports ====== *//
import "reflect-metadata";
import "./frameworks/di/resolver";

//* ====== Module Imports ====== *//
import { Server } from "./frameworks/http/server";
import { config } from "./shared/config";
import { MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";

//* ====== Instance Creation ====== *//
const server = new Server();
const mongoConnect = new MongoConnect();

//* ====== Database Connection ====== *//
mongoConnect.connectDB();

//* ====== Server Startup ====== *//
server.getApp().listen(config.server.PORT, () => {
	console.log(`\n\t-------------------------------------------------------`);
	console.log(`\t|                                                     |`);
	console.log(
		`\t|        🌐 Server is running on Port =>` +
			` ${config.server.PORT}` +
			`         |`
	);
	// console.log(`Server is running on port ${config.server.PORT} ⚡`);
});
