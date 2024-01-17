const Cluster = require("../../../models/Cluster");

module.exports = {
    async updateCluster(season, version, event) {
        const cluster = await Cluster.findByPk(1);
        if (!cluster) Cluster.create({ season, version, event });
        else Cluster.update({ season, version, event }, { where: { index: 1, } });
    },

    async readCluster() {
        const cluster = await Cluster.findByPk(1);
        if (!cluster) return;
        return cluster;
    }
}