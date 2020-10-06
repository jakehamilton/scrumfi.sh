const { Component } = require("@leverage/core");

class HTTPComponent extends Component {
    type = "http";
    config = {
        http: {
            path: "/api/name",
            method: "get",
        },
        dependencies: {
            services: ["names"],
        },
    };

    http(req, res) {
        res.json({
            name: this.services.names.user(),
        });
    }
}

module.exports = HTTPComponent;
