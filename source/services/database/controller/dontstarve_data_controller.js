const Bosses = require("../../../models/Bosses");
const Crops = require("../../../models/Crops");
const Cryptids = require("../../../models/Cryptids");
const Fishes = require("../../../models/Fishes");
const Recipes = require("../../../models/Recipes");
const Treasures = require("../../../models/Treasures");

module.exports = {
    async createStarveData(type, name, prefab, points) {
        switch (type) {
            case "recipes": {
                const target = await Recipes.findOne({ where: { prefab } });
                if (!target) await Recipes.create({ name, prefab, points });
                else Recipes.update({ name, prefab, points }, { where: { prefab } });
            } break;
            case "cryptids": {
                const target = await Cryptids.findOne({ where: { prefab } });
                if (!target) await Cryptids.create({ name, prefab, points });
                else Cryptids.update({ name, prefab, points }, { where: { prefab } });
            } break;
            case "bosses": {
                const target = await Bosses.findOne({ where: { prefab } });
                if (!target) await Bosses.create({ name, prefab, points });
                else Bosses.update({ name, prefab, points }, { where: { prefab } });
            } break;
            case "fishes": {
                const target = await Fishes.findOne({ where: { prefab } });
                if (!target) await Fishes.create({ name, prefab, points });
                else Fishes.update({ name, prefab, points }, { where: { prefab } });
            } break;
            case "treasures": {
                const target = await Treasures.findOne({ where: { prefab } });
                if (!target) await Treasures.create({ name, prefab, points });
                else Treasures.update({ name, prefab, points }, { where: { prefab } });
            } break;
            case "crops": {
                const target = await Crops.findOne({ where: { prefab } });
                if (!target) await Crops.create({ name, prefab, points });
                else Crops.update({ name, prefab, points }, { where: { prefab } });
            } break;
        }
    },

    async listStarveData(type) {
        switch (type) {
            case "recipes": {
                const target = await Recipes.findAll({ raw: true })
                return target;
            } break;
            case "cryptids": {
                const target = await Cryptids.findAll({ raw: true })
                return target;
            } break;
            case "bosses": {
                const target = await Bosses.findAll({ raw: true })
                return target;
            } break;
            case "fishes": {
                const target = await Fishes.findAll({ raw: true })
                return target;
            } break;
            case "treasures": {
                const target = await Treasures.findAll({ raw: true })
                return target;
            } break;
            case "crops": {
                const target = await Crops.findAll({ raw: true })
                return target;
            } break;
        }
    },

    async findStarveData(type, prefab) {
        switch (type) {
            case "recipes": {
                const target = await Recipes.findOne({ where: { prefab } })
                return target;
            } break;
            case "cryptids": {
                const target = await Cryptids.findOne({ where: { prefab } })
                return target;
            } break;
            case "bosses": {
                const target = await Bosses.findOne({ where: { prefab } })
                return target;
            } break;
            case "fishes": {
                const target = await Fishes.findOne({ where: { prefab } })
                return target;
            } break;
            case "treasures": {
                const target = await Treasures.findOne({ where: { prefab } })
                return target;
            } break;
            case "crops": {
                const target = await Crops.findOne({ where: { prefab } })
                return target;
            } break;
        }
    }
}