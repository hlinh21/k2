"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'warns';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, getThread, threadAdmins, getUserByLink }) {
     if (!threadAdmins.includes(event.senderID)) {
        let getUser = getThread.warns.find(i => i.id == event.senderID);
        if (getUser)
            if (getUser.reasons.length > 0)
                return api.sendMessage(`Bạn còn ${3 - getUser.count} lần bị cảnh cáo và ${getUser.reasons.length} lời cảnh báo:\n${getUser.reasons.join('\n')}`, event.threadID, event.messageID);
        return api.sendMessage('Bạn chưa có lời cảnh báo nào.', event.threadID, event.messageID);
    }
    else {
        if(event.args.length > 0) {
        let id = ''
        if (event.contentMsg.startsWith('https')) id = await getUserByLink(event.contentMsg)
        else id = Object.keys(event.mentions);
        let getWarn = getThread.warns.find(item => item.id == id);
        if(getThread.warns.some(item => item.id == id) == false) return api.sendMessage('Hiện chưa người dùng này chưa bị cảnh báo.',event.threadID, event.messageID);
        let msg = `${(await api.getUserInfo(id))[id].name} có ${getWarn.count} lần cảnh báo\nLí do:`
        let num = 0;
        for(let i in getWarn.reasons){
        msg += `\n${num +=1}/ ${getWarn.reasons[i]}${getWarn.reasons[i].endsWith('.') ? '' : '.'}`
        }
        return api.sendMessage(msg, event.threadID, event.messageID);
    }
        
        let users = '';
        if (getThread.warns.length == 0)
            return api.sendMessage('Hiện chưa có người dùng nào bị cảnh cáo.', event.threadID, event.messageID);
        let num = 0;
        for (const i of getThread.warns)
            users += `\n${num +=1}/ ${(await api.getUserInfo(i.id))[i.id].name} còn lại ${3 - i.count} lần cảnh báo.`;
        return api.sendMessage(`Hiện có ${getThread.warns.length} người dùng đang bị cảnh báo:${users}`, event.threadID, event.messageID);
        
    }
    

}
exports.default = default_1;
