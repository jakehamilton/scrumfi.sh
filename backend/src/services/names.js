const { Service } = require("@leverage/core");
const {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} = require("unique-names-generator");

const idConfig = {
    dictionaries: [adjectives, colors, animals],
    separator: "-",
};

const userConfig = {
    dictionaries: [adjectives, animals],
    separator: " ",
};

class NamesService extends Service {
    name = "names";

    ids = new Set();
    users = new Set();

    freeId(id) {
        if (this.ids.has(id)) {
            this.ids.delete(id);
        }
    }

    id() {
        let id;

        do {
            id = uniqueNamesGenerator(idConfig);
        } while (!id || this.ids.has(id));

        this.ids.add(id);

        return id;
    }

    freeUser(id) {
        if (this.users.has(id)) {
            this.users.delete(id);
        }
    }

    user() {
        let id;

        do {
            id = uniqueNamesGenerator(userConfig);
        } while (!id || this.users.has(id));

        const name = id
            .split(userConfig.separator)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(userConfig.separator);

        this.users.add(name);

        return name;
    }
}

module.exports = NamesService;
