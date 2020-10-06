const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "disconnect",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket }) {
        if (socket.room) {
            this.services.rooms.leave(socket.room, socket);
        }
    }
}

module.exports = WebSocketComponent;
