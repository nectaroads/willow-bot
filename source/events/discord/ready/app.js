const express = require("express");
const config = require("../../../../config.json");

const port = config.DATABASE_PORT;

module.exports = (client) => {
    const app = express();
    require("../../../services/database/init");
    app.use(express.json());
    app.listen(port);
    console.log(`\n[LOG] Cluster ${client.user.tag} está pronta.`);
    console.log("[LOG] Escutando: " + port + ".\n");
};
