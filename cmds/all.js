"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'all';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, botID }) {
    let { participantIDs: allMembers } = await api.getThreadInfo(event.threadID);
    allMembers.splice(allMembers.indexOf(botID), 1);
    allMembers.splice(allMembers.indexOf(event.senderID.toString()), 1);
    var tags = '‎', mentions = [];
    for (let i = 0; i < allMembers.length; i++) {
        if (i == tags.length)
            tags += tags.charAt(tags.length - 1);
        mentions.push({
            tag: tags[i],
            id: allMembers[i],
            fromIndex: i + 1
        });
    }
    return api.sendMessage({ body: `‎${tags}${event.contentMsg || '@everyone'}`, mentions }, event.threadID, event.messageID);
}
exports.default = default_1;
