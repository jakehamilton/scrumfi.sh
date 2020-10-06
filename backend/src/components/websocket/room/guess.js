const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:guess",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.guess(data.id, socket, data.value);
    }
}

module.exports = WebSocketComponent;
