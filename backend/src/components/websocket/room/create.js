const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:create",
        },
        dependencies: {
            services: ["names"],
        },
    };

    websocket({ socket }) {
        socket.emit("room:create", { id: this.services.names.id() });
    }
}

module.exports = WebSocketComponent;
