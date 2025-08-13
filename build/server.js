import express, { json } from "express";
import responseTime from "response-time";
import Helmet from "helmet";
import vatRouter from "./routers/vatRouter.js"; // TO_CHANGE: naming
export default function createApp(configuration) {
    const app = express();
    app.use(Helmet());
    app.use(json());
    app.use(responseTime({ suffix: true }));
    const router = vatRouter(configuration);
    app.use("/", router);
    return { app, router };
}
//# sourceMappingURL=server.js.map