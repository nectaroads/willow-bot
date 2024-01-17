const { EmbedBuilder } = require("discord.js");
const config = require('../../../config.json');
const { spawn } = require("child_process");
const { readCluster } = require('../database/controller/cluster_controller');
const { createDontstarveUser, updateDontstarveUserAddPoints, updateDontstarveUserAddTime, updateDontstarveUserAddDeath } = require('../database/controller/dontstarve_user_controller');
const { wrapOnShardAnnouncementEmbed, wrapOnSendSimpleEmbed, wrapOnUserAnnouncementEmbed, wrapOnSimpleEmbed2 } = require('../../utils/embeds');
const { listStarveData } = require("../database/controller/dontstarve_data_controller");
const path = require("path");
require("dotenv").config();

const file = config.DST_SH;
let status = false;
let server;

let guests = [{}];
let online = [{}];

let cluster;
let channel;

let bosses;
let cryptids;
let recipes;
let crops;
let treasures;
let fishes;

let timerFishes = [];
let timerBosses = [];

module.exports = {
    async spawnDontstarveServer(interaction) {
        if (status == true) return;

        channel = await interaction.client.channels.fetch(config.DONTSTARVECHAT);
        bosses = await listStarveData("bosses");
        cryptids = await listStarveData("cryptids");
        recipes = await listStarveData("recipes");
        crops = await listStarveData("crops");
        treasures = await listStarveData("treasures");
        fishes = await listStarveData("fishes");

        onServerStart(channel);
        sendAnnouncements(channel);
        countDays(channel);

        server = spawn("stdbuf", ["-oL", file], {
            stdio: ["pipe", "pipe", "pipe", "pipe", "pipe"],
        });

        server.stdout.on("data", async (data) => {
            const cut = data.toString().replace("\n", " ");
            const log = cut.split(" ");
            console.log(log);
            onServerEventsOverworld(interaction, log);
            onServerEventsCaves(interaction, log);
        });

        server.stdout.on("exit", (data) => { });
        server.stdin.setEncoding("utf-8");
    },

    getServer() {
        return server;
    },

    getGuests() {
        return guests;
    },

    getOnline() {
        return online;
    },

    getStatus() {
        return status;
    },

    getCluster() {
        return cluster;
    },
}

async function onServerStart() {
    status = true;
    console.log("[LOG] Inicializando Don't Starve.");
    cluster = await readCluster();
}

async function onServerEventsOverworld(interaction, log) {
    if (log[0] == "Master:") {
        switch (log[2]) {
            case "LOG": {
                switch (log[3]) {
                    case "COOK": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[7 + length.length - 1].replace('\t', '');

                        const search = recipes.find((recipe) => recipe.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} cozinhou ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Culinária", player, "cozinhando", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1147833275688173618/image.png");
                        }
                    } break;
                    case "KILL": {
                        const name = getName(log, 5).slice(0, -1);
                        const prefab = log[4];
                        const length = name.split(" ");
                        const player = getName(log, 8 + length.length - 2).slice(0, -1);

                        const boss = bosses.find((target) => target.prefab == prefab);
                        const cryptid = cryptids.find((target) => target.prefab == prefab);

                        if (boss) {
                            if (boss.prefab == "shadow_rook" && timerBosses[boss.index] > 0) return;
                            if (boss.prefab == "shadow_bishop" && timerBosses[boss.index] > 0) return;
                            if (boss.prefab == "shadow_knight" && timerBosses[boss.index] > 0) return;
                            server.stdin.write(`c_announce('${player} derrubou ${boss.name}, todos ganharam ${boss.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Chefe", player, "derrubando", boss.name, boss.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146338711978659901/image.png");
                            givePoints(online, boss);
                            if (boss.prefab == "shadow_rook") timerBosses[boss.index] = 112;
                            if (boss.prefab == "shadow_bishop") timerBosses[boss.index] = 112;
                            if (boss.prefab == "shadow_knight") timerBosses[boss.index] = 112;
                        } else if (cryptid) {
                            server.stdin.write(`c_announce('${player} caçou ${cryptid.name}, todos ganharam ${cryptid.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Criatura", player, "caçando", cryptid.name, cryptid.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146338492180340786/image.png");
                            givePoints(online, cryptid);
                        }
                    } break;
                    case "HAMMER": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 2];
                        const name = getName(log, 9 + length.length - 2).slice(0, -1);

                        const search = crops.find((crop) => crop.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} colheu ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Colheita", player, "colhendo", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146379364863320186/image.png");
                        } else {
                            server.stdin.write(`c_announce('${player} martelou ${name}.')\n`);
                            wrapOnSimpleEmbed2(channel, `**Martelada**\n${player} está destruindo ${name}.\nAquilo era importante?`, "https://cdn.discordapp.com/attachments/1143675145043587123/1146379383699939358/image.png");
                        }
                    } break;
                    case "LIGHT": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 2];
                        const name = getName(log, 9 + length.length - 2).slice(0, -1);

                        server.stdin.write(`c_announce('${player} está queimando ${name}...')\n`);
                        wrapOnSimpleEmbed2(channel, `**Queimada**\n${player} está queimando ${name}.\nEstou orgulhosa e preocupada!`, "https://cdn.discordapp.com/attachments/1143675145043587123/1146385634261479494/image.png");
                    } break;
                    case "OCEAN": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 2];
                        const name = getName(log, 9 + length.length - 2).slice(0, -1);

                        const search = fishes.find((fish) => fish.prefab == prefab);

                        if (search && (timerFishes[search.index] <= 0 || !timerFishes[search.index])) {
                            timerFishes[search.index] = 112;
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} pescou ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Pesca", player, "pescando", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146338753309310986/image.png");
                        }
                    } break;
                    case "DIG": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[7 + length.length - 1];
                        const name = getName(log, 8 + length.length - 1).slice(0, -1);

                        const search = treasures.find((treasure) => treasure.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} cavou ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Tesouro", player, "cavando", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146386886680645734/image.png");
                        }
                    } break;
                    case "DEATH": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[7 + length.length - 2];
                        const name = getName(log, 8 + length.length - 2).slice(0, -1);

                        updateDontstarveUserAddDeath(userid);
                        wrapOnSimpleEmbed2(channel, `**Morte**\n${player} foi morto por ${name}.\nNossa, que perigo!`, "https://cdn.discordapp.com/attachments/1143675145043587123/1143931330334298112/image.png");
                    } break;
                    case "REVIVE": {
                        const userid = log[4].slice(0, -1);
                        const player = getName(log, 5).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[7 + length.length - 2];
                        const name = getName(log, 8 + length.length - 2).slice(0, -1);

                        wrapOnSimpleEmbed2(channel, `**Renascimento**\n${player} reviveu usando ${name}.\nTome mais cuidado da próxima vez.`, "https://cdn.discordapp.com/attachments/1143675145043587123/1143931215062237244/image.png");
                    } break;
                }
            } break;
            case "Server": {
                if (log[3] == "registered") {
                    wrapOnShardAnnouncementEmbed(interaction, "Server Online", "Você pode jogar agora.", "Melhor se comportar.", "https://cdn.discordapp.com/attachments/1143675145043587123/1143930505788653628/image.png");
                    console.log("[LOG] Server Don't Starve inicializado.");
                }
            } break;
            case "Client": {
                if (log[3] == "authenticated:") {
                    if (log[4] == "host") return;
                    const username = getName(log, 5);
                    if (await guests.find(element => element.ku == log[4].replace("(", "").replace(")", ""))) return;
                    await guests.push({ ku: log[4].replace("(", "").replace(")", ""), name: username });
                    createDontstarveUser(log[4].replace("(", "").replace(")", ""), username);
                }
            } break;
            case "[Join": {
                const username = getName(log, 4);
                const index = await guests.findIndex(item => item.name == username);
                if(guests[index.ku]){
                    await online.push({ ku: guests[index].ku, name: guests[index].name });
                    wrapOnShardAnnouncementEmbed(interaction, "Entrada", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` entrou!`, "Você vem sempre por aqui?", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926731590352896/image.png");
                }
                else {
                    wrapOnShardAnnouncementEmbed(interaction, "Entrada???", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` entrou!`, "Você vem sempre por aqui?", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926731590352896/image.png");
                }
            } break;
            case "[Leave": {
                var username = getName(log, 4);
                const index = guests.findIndex(item => item.name == username);
                online = online.filter(person => person.name != username);
                if (!index) return;
                wrapOnShardAnnouncementEmbed(interaction, "Saída", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` saiu.`, "Nós vamos sentir a sua falta...", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926771817906206/image.png");
            } break;
            case "Shutting": {
                if (log[3] == "down") {
                    status = false;
                    console.log("[LOG] Server Don't Starve desligado.");
                    wrapOnShardAnnouncementEmbed(interaction, "Offline", `Tente mais tarde...`, "Pois estou a mimir.", "https://cdn.discordapp.com/attachments/1143675145043587123/1143930742624223262/image.png");
                }
            } break;
            case "[Say]": {
                let message = "";
                let cut = log;
                cut[0] = "";
                cut[1] = "";
                cut[2] = "";
                cut[3] = "";
                message = cut.join(" ");

                const embed = new EmbedBuilder()
                    .setFooter({
                        text: message,
                        iconURL: "https://cdn.discordapp.com/attachments/1143675145043587123/1143932732737597491/image.png",
                    })
                    .setColor(0x2b2d31);

                channel.send({ embeds: [embed] });
            } break;
        }
    }
}

async function onServerEventsCaves(interaction, log) {
    if (log[0] == "Caves:") {
        switch (log[3]) {
            case "LOG": {
                switch (log[4]) {
                    case "COOK": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 1].replace('\t', '');

                        const search = recipes.find((recipe) => recipe.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} cozinhou ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Culinária", player, "cozinhando", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1147833275688173618/image.png");
                        }
                    } break;
                    case "KILL": {
                        const name = getName(log, 6).slice(0, -1);
                        const prefab = log[5];
                        const length = name.split(" ");
                        const player = getName(log, 9 + length.length - 2).slice(0, -1);

                        const boss = bosses.find((target) => target.prefab == prefab);
                        const cryptid = cryptids.find((target) => target.prefab == prefab);

                        if (boss) {
                            if (boss.prefab == "shadow_rook" && timerBosses[boss.index] > 0) return;
                            if (boss.prefab == "shadow_bishop" && timerBosses[boss.index] > 0) return;
                            if (boss.prefab == "shadow_knight" && timerBosses[boss.index] > 0) return;
                            server.stdin.write(`c_announce('${player} derrubou ${boss.name}, todos ganharam ${boss.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Chefe", player, "derrubando", boss.name, boss.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146338711978659901/image.png");
                            givePoints(online, boss);
                            if (boss.prefab == "shadow_rook") timerBosses[boss.index] = 112;
                            if (boss.prefab == "shadow_bishop") timerBosses[boss.index] = 112;
                            if (boss.prefab == "shadow_knight") timerBosses[boss.index] = 112;
                        } else if (cryptid) {
                            server.stdin.write(`c_announce('${player} caçou ${cryptid.name}, todos ganharam ${cryptid.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Criatura", player, "caçando", cryptid.name, cryptid.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146338492180340786/image.png");
                            givePoints(online, cryptid);
                        }
                    } break;
                    case "HAMMER": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[9 + length.length - 2];
                        const name = getName(log, 10 + length.length - 2).slice(0, -1);

                        const search = crops.find((crop) => crop.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} colheu ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Colheita", player, "colhendo", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146379364863320186/image.png");
                        } else {
                            server.stdin.write(`c_announce('${player} martelou ${name}.')\n`);
                            wrapOnSimpleEmbed2(channel, `**Martelada**\n${player} está destruindo ${name}.\nAquilo era importante?`, "https://cdn.discordapp.com/attachments/1143675145043587123/1146379383699939358/image.png");
                        }
                    } break;
                    case "LIGHT": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[9 + length.length - 2];
                        const name = getName(log, 10 + length.length - 2).slice(0, -1);

                        server.stdin.write(`c_announce('${player} está queimando ${name}...')\n`);
                        wrapOnSimpleEmbed2(channel, `**Queimada**\n${player} está queimando ${name}.\nEstou orgulhosa e preocupada!`, "https://cdn.discordapp.com/attachments/1143675145043587123/1146385634261479494/image.png");
                    } break;
                    case "DIG": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 1];
                        const name = getName(log, 9 + length.length - 1).slice(0, -1);

                        const search = treasures.find((treasure) => treasure.prefab == prefab);

                        if (search) {
                            givePoints(online, search);
                            server.stdin.write(`c_announce('${player} cavou ${search.name}, todos ganharam ${search.points} pontos!')\n`);
                            wrapOnUserAnnouncementEmbed(channel, "Tesouro", player, "cavando", search.name, search.points, "https://cdn.discordapp.com/attachments/1143675145043587123/1146386886680645734/image.png");
                        }
                    } break;
                    case "DEATH": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 2];
                        const name = getName(log, 9 + length.length - 2).slice(0, -1);

                        updateDontstarveUserAddDeath(userid);
                        wrapOnSimpleEmbed2(channel, `**Morte**\n${player} foi morto por ${name}.\nNossa, que perigo!`, "https://cdn.discordapp.com/attachments/1143675145043587123/1143931330334298112/image.png");
                    } break;
                    case "REVIVE": {
                        const userid = log[5].slice(0, -1);
                        const player = getName(log, 6).slice(0, -1);
                        const length = player.split(" ");
                        const prefab = log[8 + length.length - 2];
                        const name = getName(log, 9 + length.length - 2).slice(0, -1);

                        wrapOnSimpleEmbed2(channel, `**Renascimento**\n${player} reviveu usando ${name}.\nTome mais cuidado da próxima vez.`, "https://cdn.discordapp.com/attachments/1143675145043587123/1143931215062237244/image.png");
                    } break;
                }
            } break;
            case "Client": {
                if (log[4] == "authenticated:") {
                    if (log[5] == "host") return;
                    const username = getName(log, 6);
                    if (await guests.find(element => element.ku == log[5].replace("(", "").replace(")", ""))) return;
                    await guests.push({ ku: log[5].replace("(", "").replace(")", ""), name: username });
                    createDontstarveUser(log[5].replace("(", "").replace(")", ""), username);
                }
            } break;
            case "[Join": {
                const username = getName(log, 5);
                const index = await guests.findIndex(item => item.name == username);
                if(guests[index.ku]){
                    await online.push({ ku: guests[index].ku, name: guests[index].name });
                    wrapOnShardAnnouncementEmbed(interaction, "Entrada", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` entrou!`, "Você vem sempre por aqui?", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926731590352896/image.png");
                }
                else {
                    wrapOnShardAnnouncementEmbed(interaction, "Entrada???", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` entrou!`, "Você vem sempre por aqui?", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926731590352896/image.png");
                }
            } break;
            case "[Leave": {
                var username = getName(log, 5);
                const index = guests.findIndex(item => item.name == username);
                online = online.filter(person => person.name != username);
                if (!index) return;
                wrapOnShardAnnouncementEmbed(interaction, "Saída", `\`${guests[index].ku}\` \`${guests[index].name.slice(0, -1)}\` saiu.`, "Nós vamos sentir a sua falta...", "https://cdn.discordapp.com/attachments/1143675145043587123/1143926771817906206/image.png");
            } break;
            case "[Say]": {
                let message = "";
                let cut = log;
                cut[0] = "";
                cut[1] = "";
                cut[2] = "";
                cut[3] = "";
                message = cut.join(" ");

                const embed = new EmbedBuilder()
                    .setFooter({
                        text: message,
                        iconURL: "https://cdn.discordapp.com/attachments/1143675145043587123/1143932732737597491/image.png",
                    })
                    .setColor(0x2b2d31);

                channel.send({ embeds: [embed] });
            } break;
        }
    }
}

async function countDays(channel) {
    setInterval(async () => {
        for (i = 0; i < timerFishes.length; i++) {
            if (timerFishes[i]) timerFishes[i] -= 1;
        }
        for (i = 0; i < timerBosses.length; i++) {
            if (timerBosses[i]) timerBosses[i] -= 1;
        }
        for (i = 1; i < online.length; i++) {
            await updateDontstarveUserAddTime(online[i].ku);
        }
    }, 60000);
}

function sendAnnouncements(channel) {
    setInterval(async () => {
        if (online.length > 1) {
            let message;

            switch (Math.floor(Math.random() * 7)) {
                case 0: message = "Registre-se para ganhar a conquista 'Tester'!"; break;
                case 1: message = "A liderança dessa temporada vai ganhar 20,00R$, se esforce!"; break;
                case 2: message = `Junte-se a nós! discord.gg/qqQdQqCnxJ`; break;
                case 3: message = `Já experimentou nosso servidor de Minecraft?`; break;
                case 4: message = `Alcance o nível 5 para ganhar Prestígio!`; break;
                case 5: message = `Sabia que os 3 melhores irão para o Hall da Fama?`; break;
                case 6: message = `Queimaram sua base? Denuncie em nosso Discord!`; break;
            }

            server.stdin.write(`c_announce('${message}')\n`);
            wrapOnSendSimpleEmbed(channel, message, "https://cdn.discordapp.com/attachments/1143675145043587123/1143926840432545862/image.png");
        }
    }, 1200000);
}

function getName(log, index) {
    var name = "";
    for (i = index; i < log.length; i++) {
        name += log[i] + (i == log.length - 1 ? "" : " ");
        name = name.replace('\t', '');
        if (log[i + 1] == "B@*8") return name;
    }
    return name;
}

async function givePoints(online, search) {
    for (i = 1; i < online.length; i++) {
        await updateDontstarveUserAddPoints(online[i].ku, search.points);
    }
}