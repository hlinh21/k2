"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'user';
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api }) {
    var users = Object.keys(event.mentions);
    if (users.length == 0)
        return api.sendMessage('Chưa chỉ định người cần chặn.', event.threadID, event.messageID);
    users.forEach(id => {
        var getVictim = botData.users.find(item => item.id == id);
        var name = event.mentions[id];
        getVictim.ban.use ? getVictim.ban.use = false : getVictim.ban.use = true;
        api.sendMessage({
            body: `Đã ${!getVictim.ban.use ? 'bỏ ' : ''}chặn: ${name}.`,
            mentions: [{ tag: name, id }]
        }, event.threadID, event.messageID);
    });
    return fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
}
exports.default = default_1;
