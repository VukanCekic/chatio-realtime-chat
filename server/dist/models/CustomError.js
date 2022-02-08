"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, code = 500, additionalInfo = {}) {
        this.message = message;
        this.code = code;
        this.additionalInfo = additionalInfo;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map