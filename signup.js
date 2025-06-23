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
const signupForm = document.getElementById("signup-form");
const signupErrorsDiv = document.getElementById("signup-errors");
const signupSection = document.getElementById("signup-section");
const signinSection = document.getElementById("signin-section");
const toSigninBtn = document.getElementById("to-signin-btn");
// Hide signup by default
if (signupSection)
    signupSection.style.display = "none";
if (toSigninBtn) {
    toSigninBtn.addEventListener("click", () => {
        signupSection.style.display = "none";
        signinSection.style.display = "block";
    });
}
signupForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    signupErrorsDiv.innerHTML = "";
    const formData = new FormData(signupForm);
    const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };
    const errors = (0, validators_1.validateSignUp)(data);
    if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => {
            const p = document.createElement("p");
            p.textContent = msg;
            p.className = "error";
            signupErrorsDiv.appendChild(p);
        });
        return;
    }
    try {
        yield (0, mockBackend_1.mockSignUp)(data);
        alert("Sign up successful! Redirecting to dashboard...");
    }
    catch (err) {
        const p = document.createElement("p");
        p.textContent = err;
        p.className = "error";
        signupErrorsDiv.appendChild(p);
    }
}));
