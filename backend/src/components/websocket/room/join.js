const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:join",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.join(data.id, socket);
    }
}

module.exports = WebSocketComponent;
