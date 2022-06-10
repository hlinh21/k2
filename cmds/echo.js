"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'echo';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api }) {
    return api.sendMessage(event.contentMsg || '?', event.threadID);
}
exports.default = default_1;
