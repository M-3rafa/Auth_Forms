import { validateSignUp } from "./validators.js";
import { mockSignUp } from "./mockBackend.js";
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
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    signupErrorsDiv.innerHTML = "";
    const formData = new FormData(signupForm);
    const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };
    const errors = validateSignUp(data);
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
        await mockSignUp(data);
        alert("Sign up successful! Redirecting to dashboard...");
    }
    catch (err) {
        const p = document.createElement("p");
        p.textContent = err;
        p.className = "error";
        signupErrorsDiv.appendChild(p);
    }
});
