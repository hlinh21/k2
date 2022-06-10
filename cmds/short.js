"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
const fs = require("fs")
const axios = require("axios")
const path = require('path')
exports.name = 'short';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, botData, api, getThread, threadAdmins }) {
    if (event.args[0] == 'del') {
        event.args = event.args.slice(1);
        if (event.args[0] == 'all') {
            getThread.shortcut = [];
            api.sendMessage('Đã xóa toàn bộ shortcut.', event.threadID, event.messageID);
        }
        else {
            if (isNaN(event.args[0]))
                return api.sendMessage('Hãy nhập số thứ tự của shortcut cần xóa.', event.threadID, event.messageID);
            let getShortcut = getThread.shortcut[parseInt(event.args[0]) - 1];
            if (!getShortcut)
                return api.sendMessage(`Không có shortcut mang số thứ tự ${event.args[0]}.`, event.threadID, event.messageID);
            getThread.shortcut.splice(getThread.shortcut.indexOf(getShortcut), 1);
            api.sendMessage(`Đã xóa: ${getShortcut.sI}.`, event.threadID, event.messageID);
        }
    }
    else if (event.args[0] == 'list') {
        if (getThread.shortcut.length == 0)
            return api.sendMessage('Không có shortcut.', event.threadID, event.messageID);
        let msg = '', num = 0;
        for (let i in getThread.shortcut)
            msg += `\n${num += 1}. ${getThread.shortcut[i].sI} -> ${ (getThread.shortcut[i].mode == 'normal') ? 'Tệp đính kèm' : (getThread.shortcut[i].sO.indexOf('mid.$') == 0) ? 'Phản hồi một tin nhắn' : (getThread.shortcut[i].sO.length > 20) ? 'Một đoạn tin nhắn' : getThread.shortcut[i].sO}.`;
        return api.sendMessage(`Shortcut của nhóm là:${msg}`, event.threadID, event.messageID);
    }
    else if (event.args[0] == 'edit') {
        event.args = event.args.slice(1);
        let short = event.args.join(' '), narrow = short.indexOf(' -> ');
        if (narrow == -1)
            return api.sendMessage('Sai format.', event.threadID, event.messageID);
        let sI = short.slice(0, narrow).toLowerCase(), sO = short.slice(narrow + 4, short.length);
        if (sI == sO)
            return api.sendMessage('Input và output giống nhau.', event.threadID, event.messageID);
        if (!sI || !sO)
            return api.sendMessage(`Chưa nhập ${!sI ? 'input' : 'output'}.`, event.threadID, event.messageID);
        if (!getThread.shortcut.some(item => item.sI == sI))
            return api.sendMessage('Shortcut này không tồn tại.', event.threadID, event.messageID);
        let index = getThread.shortcut.indexOf(getThread.shortcut.find(item => item.sI == sI));
        if (Object.keys(event.mentions).length > 0) {
            let mention = [];
            Object.keys(event.mentions).forEach(id => mention.push({ tag: event.mentions[id], id }));
            getThread.shortcut[index].mention = mention;
        }
        getThread.shortcut[index].sO = sO;
        api.sendMessage(`Đã đổi thành: ${sO}.`, event.threadID, event.messageID);
    }
    else if (event.type == 'message_reply' && event.messageReply.attachments.length == 0) {
        if (!event.contentMsg)
            return api.sendMessage('Chưa nhập input.', event.threadID, event.messageID);
        let sI = event.contentMsg.toLowerCase(), sO = event.messageReply.messageID;
        if (getThread.shortcut.some(item => item.sI == sI))
            return api.sendMessage('Shortcut này đã tồn tại.', event.threadID, event.messageID);
        var mode = 'special'
        getThread.shortcut.push({ sI, sO, mode });
        api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID);
    
    }
    
     else if (event.type == 'message_reply' && event.messageReply.attachments.length > 0) {
        if (!event.contentMsg) return api.sendMessage('Chưa nhập input.', event.threadID, event.messageID);
          var mode = 'normal' 
          var sI = event.contentMsg.trim()
          if (Object.keys(event.mentions).length){
           sI = (event.contentMsg.replace(new RegExp(Object.values(event.mentions).join("|"), "g"), "").replace(/\s+/g, " ")).trim();
           if(sI.length == 0) return api.sendMessage('Chưa nhập nội dung.', event.threadID, event.messageID);
         }
       
        console.log(sI)
       
        if (getThread.shortcut.some(item => item.sI.toLowerCase() == sI.toLowerCase())) return api.sendMessage('Shortcut này đã tồn tại.', event.threadID, event.messageID);
        let { threadName: nameT } = await api.getThreadInfo(event.threadID);
        let arrUrl = []
        for(let i = 0; i < event.messageReply.attachments.length; i++){ arrUrl.push( {url:event.messageReply.attachments[i].url, type: event.messageReply.attachments[i].type} ) };
        console.log(arrUrl)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
        var arrPath = [];
        for(let z = 0; z < arrUrl.length; z++ ){
        var path_1 = path.join(__dirname + "../../declare/eventHandler/data/"); 
       
        var end = '';
        var random = Math.floor(Math.random() * 999999999.6 - 1 * z);  
        
        (arrUrl.map(i =>(i.type))) == "photo" ? end = "jpg" : (arrUrl.map(i =>(i.type))) == "audio" ? end = "m4a" : (arrUrl.map(i =>(i.type))) == "video" ? end = "mp4" : end = "jpg"
        
        const download = (await axios.get(arrUrl.map(i =>(i.url))[z], { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path_1 +`${nameT}${random}.${end}`,Buffer.from(download, "utf-8"));
        var newImg = `${nameT}${random}.${end}`
        arrPath.push(newImg)
       }
        var sO = arrPath;
       // photo/video
        
       if (Object.keys(event.mentions).length > 0) {
            let mention = [];
            for (let id of Object.keys(event.mentions))
                mention.push({ tag: event.mentions[id], id });
            getThread.shortcut.push({ sI, sO, mention, mode });
        }
        else getThread.shortcut.push({ sI, sO, mode });
        (sI.length == 0) ? api.sendMessage(`Đã thêm list tag.`, event.threadID, event.messageID) : api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID)
    }

    else {
        let short = event.args.join(' '), narrow = short.indexOf(' -> ');
        if (narrow == -1)
            return api.sendMessage('Sai format.', event.threadID, event.messageID);
        let sI = short.slice(0, narrow).toLowerCase(), sO = short.slice(narrow + 4, short.length);
        if (sI.indexOf(botData.prefix) == 0 && !threadAdmins.includes(event.senderID))
            return api.sendMessage('Quyền lồn biên giới.', event.threadID, event.messageID);
        if (sI == sO)
            return api.sendMessage('Input và output giống nhau.', event.threadID, event.messageID);
        if (!sI || !sO)
            return api.sendMessage(`Chưa nhập ${!sI ? 'input' : 'output'}.`, event.threadID, event.messageID);
        if (getThread.shortcut.some(item => item.sI == sI))
            return api.sendMessage('Shortcut này đã tồn tại.', event.threadID, event.messageID);
        var mode = 'special'
        if (Object.keys(event.mentions).length > 0) {
            let mention = [];
            for (let id of Object.keys(event.mentions))
                mention.push({ tag: event.mentions[id], id });
            getThread.shortcut.push({ sI, sO, mention, mode });
        }
        else
            getThread.shortcut.push({ sI, sO });
        api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID);
    }
    return fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
}
exports.default = default_1;
