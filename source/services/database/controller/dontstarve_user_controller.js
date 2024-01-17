const DontstarveUser = require("../../../models/DontstarveUser");

module.exports = {
    async createDontstarveUser(dontstarveid, username) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (!object) DontstarveUser.create({ dontstarveid, username });
        else DontstarveUser.update({ username }, { where: { dontstarveid } });
    },

    async createDontstarveUserOnDiscord(dontstarveid, discordid) {
        const firstGate = await DontstarveUser.findOne({ where: { dontstarveid } });
        const secondGate = await DontstarveUser.findOne({ where: { discordid } });
        if (firstGate) {
            if (firstGate.discordid) return;
            await DontstarveUser.update({ discordid }, { where: { dontstarveid } });
            return;
        }
        if (secondGate) {
            await DontstarveUser.update({ discordid: "ID" }, { where: { discordid } });
        }
        DontstarveUser.create({ dontstarveid, discordid });
    },

    async listAndRankDontstarveUsers() {
        const object = await DontstarveUser.findAll({
            limit: 10,
            order: [["points", "DESC"]],
            raw: true,
        });
        return object;
    },

    async readDontstarveUserByDiscord(discordid) {
        const object = await DontstarveUser.findOne({ where: { discordid } });
        if (object) return object;
    },

    async readDontstarveUserByDontstarve(dontstarveid) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (object) return object;
    },

    async updateDontstarveUserAddPoints(dontstarveid, points) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (!object) return;
        await DontstarveUser.update({ points: object.points + points, coins: object.coins + points }, { where: { dontstarveid } });
    },

    async updateDontstarveUserChangeSurvivor(dontstarveid, character) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (!object) return;
        await DontstarveUser.update({ character }, { where: { dontstarveid } });
    },

    async updateDontstarveUserAddTime(dontstarveid) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (!object) return;
        await DontstarveUser.update({ time: object.time + 1 }, { where: { dontstarveid } });
    },

    async updateDontstarveUserAddDeath(dontstarveid) {
        const object = await DontstarveUser.findOne({ where: { dontstarveid } });
        if (!object) return;
        await DontstarveUser.update({ deaths: object.deaths + 1 }, { where: { dontstarveid } });
    },
}
