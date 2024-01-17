const Sequelize = require("sequelize");
const configDB = require("./database.js");

const Tests = require("../../models/Tests.js");
const Cluster = require("../../models/Cluster.js");
const DiscordUser = require("../../models/DiscordUser.js");
const DontstarveUser = require("../../models/DontstarveUser.js");

const Bosses = require("../../models/Bosses.js");
const Recipes = require("../../models/Recipes.js");
const Cryptids = require("../../models/Cryptids.js");
const Crops = require("../../models/Crops.js");
const Treasures = require("../../models/Treasures.js");
const Fishes = require("../../models/Fishes.js");

const connection = new Sequelize(configDB);

Tests.init(connection);
Cluster.init(connection);
DiscordUser.init(connection);
DontstarveUser.init(connection);

Bosses.init(connection);
Recipes.init(connection);
Cryptids.init(connection);
Crops.init(connection);
Treasures.init(connection);
Fishes.init(connection);

module.exports = connection;
