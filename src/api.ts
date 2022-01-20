import express from "express";
import { PORT, CORS_ORIGINS } from "./envConfig";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, async () => {
	console.log(`✅  Ready on port http://localhost:${PORT}`);

	routes(app);
});

export default app;
