"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'thread';
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api, }) {
  
if(event.args[0]){
var id = event.args[0]
}
else id = event.threadID;

let getThread = botData.threads.find(item => item.id == id);
getThread.ban.use ? getThread.ban.use = false : getThread.ban.use = true;
    fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
     api.sendMessage(`Đã ${getThread.ban.use ? 'tắt' : 'bật'} bot ở group này.`, event.threadID, event.messageID);
     
api.sendMessage(`Đã ${getThread.ban.use ? 'tắt' : 'bật'} bot tại `+ id + ".", botData.admins[0]);



}
exports.default = default_1;
