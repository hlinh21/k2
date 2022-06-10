"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'uid';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, getUserByLink}) {
       if(event.contentMsg.indexOf("@") !== -1) {
      	 let mentionIDs = Object.keys(event.mentions);
            return api.sendMessage(mentionIDs[0], event.threadID, event.messageID);
      }
       else if(event.contentMsg){
        var uid = await getUserByLink(event.contentMsg);
          api.sendMessage(uid, event.threadID, event.messageID)
       }
       else api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
     
}
exports.default = default_1;
