"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "run";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, botID, getThread, botData, getUser }) {
  const { VM } = require("vm2");
  var out = async a => api.sendMessage(`${a}`, event.threadID, event.messageID);
  const vm = new VM({
    eval: false,
    wasm: false,
    timeout: 100,
    console: "inherit",
    sandbox: {
      process,
      out,
      api,
      event,
      getThread,
      getUser,
      botData,
      botID
      
      
    }
  });
  vm.run(event.args.join(" "), vm.js);
}
exports.default = default_1;
