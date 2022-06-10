"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "adduser";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, botID, getThread, getUserByLink }) {
  let { threadID, messageID, senderID } = event;
  var threadInfo = await api.getThreadInfo(threadID);
  var msg = event.contentMsg;
  if (!msg) return api.sendMessage("Vui lòng nhập url người cần thêm vào nhóm !", threadID, messageID);
  if (msg.startsWith('https'))var id = await getUserByLink(msg)
  else id = msg;
  if (getThread.ban.users.some(e => e.id == id)) return api.sendMessage("Không thể thêm người dùng này vì đã bị cấm.", threadID, messageID);
  if (threadInfo.participantIDs.includes(id)) return api.sendMessage("Người dùng đã ở trong nhóm.", threadID, messageID);
 
  if (threadInfo.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.addUserToGroup(id, threadID);
       
  if (!threadInfo.adminIDs.some(item => item.id == api.getCurrentUserID())) {
   if (threadInfo.approvalMode == true) api.addUserToGroup(id, threadID, () => api.sendMessage("Đã thêm " + id + " vào danh sách phê duyệt !", threadID, messageID));
    else api.addUserToGroup(id, threadID);
      }
   }
  
exports.default = default_1;
