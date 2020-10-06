const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:end",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.end(data.id, socket);
    }
}

module.exports = WebSocketComponent;
