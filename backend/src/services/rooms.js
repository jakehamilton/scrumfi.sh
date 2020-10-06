const { Service } = require("@leverage/core");

class RoomsService extends Service {
    name = "rooms";
    config = {
        dependencies: {
            plugins: ["websocket"],
        },
    };

    rooms = new Map();

    join(id, socket) {
        if (!this.rooms.has(id)) {
            this.rooms.set(id, {
                id,
                owner: socket,
                state: {
                    guessing: false,
                    guesses: new Map(),
                },
                users: new Set(),
            });
        }

        const room = this.rooms.get(id);

        room.users.add(socket);

        socket.join(id);
        socket.room = id;
        this.update(id);
    }

    leave(id, socket) {
        socket.leave(id);

        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        room.users.delete(socket);

        if (room.users.size === 0) {
            this.rooms.delete(id);
        }

        if (room.owner === socket) {
            const [newOwner] = room.users;
            room.owner = newOwner;
        }
    }

    start(id, socket) {
        const room = this.rooms.get(id);

        if (!room || room.owner !== socket) {
            return;
        }

        room.state.guessing = true;
        room.state.guesses = new Map();
        this.update(id);
    }

    end(id, socket) {
        const room = this.rooms.get(id);

        if (!room || room.owner !== socket) {
            return;
        }

        room.state.guessing = false;
        this.update(id);
    }

    guess(id, socket, value) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (!room.users.has(socket)) {
            return;
        }

        if (!room.state.guessing) {
            return;
        }

        room.state.guesses.set(socket.id, value);

        this.update(id);
    }

    update(id) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        this.plugins.websocket.io.to(id).emit("room:update", {
            id,
            owner: room.owner.id,
            state: {
                guessing: room.state.guessing,
                guesses: Object.fromEntries(room.state.guesses),
            },
            users: [...room.users].map((socket) => {
                return {
                    name: socket.user.name,
                    id: socket.id,
                };
            }),
        });
    }
}

module.exports = RoomsService;
