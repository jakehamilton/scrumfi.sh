const { Manager } = require("@leverage/core");
const { HTTP } = require("@leverage/plugin-http");
const { WebSocket } = require("@leverage/plugin-websocket");

const log = require("./util/log");

const main = async () => {
    const PORT = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3001;

    const http = new HTTP();
    const websocket = new WebSocket({
        serveClient: true,
    });

    const manager = new Manager();

    manager.add(http, websocket);

    manager.add(require("./middleware/http/static"));

    manager.add(require("./services/names"), require("./services/rooms"));

    manager.add(
        require("./components/http/api/name/get"),
        require("./components/websocket/connection"),
        require("./components/websocket/disconnect"),
        require("./components/websocket/room/create"),
        require("./components/websocket/room/join"),
        require("./components/websocket/room/start"),
        require("./components/websocket/room/guess"),
        require("./components/websocket/room/end")
    );

    http.listen(PORT);

    log.info(`Started HTTP server on port "${PORT}".`);

    const cleanup = () => {
        log.info("Closing HTTP server...");
        http.server.close((error) => {
            if (error) {
                log.error("Error closing HTTP server:");
                console.error(error);
                process.exit(1);
            }
            process.exit(0);
        });
        setTimeout(() => {
            log.error("Could not close server gracefully.");
            log.error("Killing process.");
            process.exit(1);
        }, 3000);
    };

    process.on("SIGINT", cleanup);
};

main().catch((error) => {
    log.error("An unexpected error occurred:");
    console.error(error);
});
