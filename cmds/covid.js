"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
exports.name = 'covid';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    try {
        let { data } = await axios_1.default.get('https://www.spermlord.ga/covid');
        api.sendMessage('====== Thế Giới ======\n' +
            `😷 Nhiễm: ${data.thegioi.nhiem}\n` +
            `💚 Hồi phục: ${data.thegioi.hoiphuc}\n` +
            `💀 Tử vong: ${data.thegioi.tuvong}\n` +
            '====== Việt Nam ======\n' +
            `😷 Nhiễm: ${data.vietnam.nhiem}\n` +
            `💚 Hồi phục: ${data.vietnam.hoiphuc}\n` +
            `💀 Tử vong: ${data.vietnam.tuvong}\n\n` +
            `📰 Tin tức: ${data.tintuc}.\n` +
            `⌚ Cập nhật: ${data.updatedAt}.`, event.threadID, event.messageID);
    }
    catch {
        return api.sendMessage('Đã có lỗi xảy ra.', event.threadID, event.messageID);
    }
}
exports.default = default_1;
