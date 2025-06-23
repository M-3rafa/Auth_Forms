"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSignUp = mockSignUp;
exports.mockSignIn = mockSignIn;
const mockDB = [];
function mockSignUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exists = mockDB.some((user) => user.email === data.email);
                if (exists) {
                    reject("Email already exists.");
                }
                else {
                    mockDB.push(data);
                    resolve();
                }
            }, 500);
        });
    });
}
function mockSignIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const validUser = mockDB.find((user) => user.email === data.email);
                if (!validUser || validUser.password !== data.password) {
                    reject("Invalid email or password.");
                }
                else {
                    resolve();
                }
            }, 500);
        });
    });
}
