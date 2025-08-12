import { readAppConfiguration, } from "./models/ConfigurationModel.js";
import createApp from "./server.js";
const configurationFile = "./config.json"; //Konfigurationsdatei
const configuration = readAppConfiguration(configurationFile);
const server = createApp(configuration).app.listen(configuration.port, () => {
    console.log({ description: "START" });
});
server.keepAliveTimeout = configuration.expressServerOptions.keepAliveTimeout;
server.maxHeadersCount = configuration.expressServerOptions.maxHeadersCount;
server.maxConnections = configuration.expressServerOptions.maxConnections;
server.headersTimeout = configuration.expressServerOptions.headersTimeout;
server.requestTimeout = configuration.expressServerOptions.requestTimeout;
server.timeout = configuration.expressServerOptions.timeout;
//# sourceMappingURL=app.js.map