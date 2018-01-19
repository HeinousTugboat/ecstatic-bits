"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
class EcstaticBits {
    constructor() {
        console.log('ecstaticBits Invoked!');
    }
}
exports.default = EcstaticBits;
__export(require("./entity"));
__export(require("./entity-manager"));
__export(require("./component"));
__export(require("./system"));
__export(require("./assemblage"));
//# sourceMappingURL=ecstatic-bits.js.map