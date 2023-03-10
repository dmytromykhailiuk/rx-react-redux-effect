"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofType = void 0;
const rxjs_1 = require("rxjs");
const ofType = (typeToCompare) => (source$) => source$.pipe((0, rxjs_1.filter)((action) => {
    if (typeof typeToCompare === 'string') {
        return action.type === typeToCompare;
    }
    if ((typeToCompare === null || typeToCompare === void 0 ? void 0 : typeToCompare.type) || typeof typeToCompare === 'object') {
        return action.type === typeToCompare.type;
    }
    if (typeof typeToCompare === 'function') {
        return action.type === typeToCompare({}).type;
    }
    return false;
}));
exports.ofType = ofType;
//# sourceMappingURL=of-type.js.map