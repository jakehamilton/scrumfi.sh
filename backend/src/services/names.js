const { Service } = require("@leverage/core");
const {
    uniqueNamesGenerator,
    Config,
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

    ids = new Map();
    users = new Map();

    id() {
        let id;

        do {
            id = uniqueNamesGenerator(idConfig);
        } while (!id || this.ids.has(id));

        this.ids.set(id);

        return id;
    }

    user() {
        let user;

        do {
            user = uniqueNamesGenerator(userConfig);
        } while (!user || this.users.has(user));

        this.users.set(user);

        return user
            .split(userConfig.separator)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(userConfig.separator);
    }
}

module.exports = NamesService;
