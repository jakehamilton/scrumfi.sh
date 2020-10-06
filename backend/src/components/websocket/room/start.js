const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:start",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.start(data.id, socket);
    }
}

module.exports = WebSocketComponent;
