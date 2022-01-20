import { Express } from "express";
import { gitHubUsersSearchHandler } from "./controllers/users.controller";

function routes(app: Express) {
	app.get("/users/:lang", gitHubUsersSearchHandler);
}

export default routes;
