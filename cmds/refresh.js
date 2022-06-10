"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'refresh';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, botID, botData, refresh }) {
   for (let i of botData.threads) {
        
        refresh(i.id)
        }
    return api.sendMessage('Done', event.threadID, event.messageID);

}
exports.default = default_1;
