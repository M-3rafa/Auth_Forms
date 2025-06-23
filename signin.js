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
const validators_1 = require("./validators");
const mockBackend_1 = require("./mockBackend");
const signinForm = document.getElementById("signin-form");
const signinErrorsDiv = document.getElementById("signin-errors");
const signupSection2 = document.getElementById("signup-section");
const signinSection2 = document.getElementById("signin-section");
const toSignupBtn = document.getElementById("to-signup-btn");
if (toSignupBtn) {
    toSignupBtn.addEventListener("click", () => {
        signinSection2.style.display = "none";
        signupSection2.style.display = "block";
    });
}
signinForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    signinErrorsDiv.innerHTML = "";
    const formData = new FormData(signinForm);
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const errors = (0, validators_1.validateSignIn)(data);
    if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => {
            const p = document.createElement("p");
            p.textContent = msg;
            p.className = "error";
            signinErrorsDiv.appendChild(p);
        });
        return;
    }
    try {
        yield (0, mockBackend_1.mockSignIn)(data);
        alert("Sign in successful! Redirecting to dashboard...");
    }
    catch (err) {
        const p = document.createElement("p");
        p.textContent = err;
        p.className = "error";
        signinErrorsDiv.appendChild(p);
    }
}));
