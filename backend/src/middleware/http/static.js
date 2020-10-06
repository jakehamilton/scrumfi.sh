const fs = require("fs");
const path = require("path");
const express = require("express");
const { Middleware } = require("@leverage/core");

const STATIC_DIR =
    process.env.STATIC_DIR || path.resolve("/var/www/localhost/htdocs");

class HTTPMiddleware extends Middleware {
    type = "http";

    http({ app }) {
        if (STATIC_DIR !== "false" && fs.existsSync(path.resolve(STATIC_DIR))) {
            app.use(
                express.static(STATIC_DIR, {
                    setHeaders: (res, file, stat) => {
                        const extension = path.extname(file);

                        if (extension === "mjs") {
                            res.set("Content-Type", "text/javascript");
                        }
                    },
                })
            );
        }
    }
}

module.exports = HTTPMiddleware;
