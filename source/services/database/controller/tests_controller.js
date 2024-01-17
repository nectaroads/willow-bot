const Tests = require("../../../models/Tests");

module.exports = {
    async readTests() {
        const object = await Tests.findByPk(1);
        if (!object) return null;
        if (!object.array) return null;
        const value = object?.array.split(";") ?? null;
        return value;
    },

    async createTests() {
        const object = await Tests.findByPk(1);
        if (object) return null;
        return await Tests.create({});
    },

    async updateTests(value) {
        const object = await Tests.findByPk(1);
        if (!object) return null;
        const array = value.join(";");
        return await Tests.update({ array }, { where: { index: 1 } });
    },

    async listTests() {
        const objects = await Tests.findAll({
            limit: 3,
            order: [["array", "DESC"]],
            raw: true,
        });
        if (!objects) return null;
        return objects;
    },

    async addValue(index) {
        const object = await Tests.findByPk(1);
        if (!object) return null;
        if (!object.array) return null;
        let temp = object.array.split(";");
        temp[index] += 1;
        const array = temp.join(";");
        return await Tests.update({ array }, { where: { index: 1 } });
    },

}