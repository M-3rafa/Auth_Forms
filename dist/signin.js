import { validateSignIn } from "./validators.js";
import { mockSignIn } from "./mockBackend.js";
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
signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    signinErrorsDiv.innerHTML = "";
    const formData = new FormData(signinForm);
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const errors = validateSignIn(data);
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
        await mockSignIn(data);
        alert("Sign in successful! Redirecting to dashboard...");
    }
    catch (err) {
        const p = document.createElement("p");
        p.textContent = err;
        p.className = "error";
        signinErrorsDiv.appendChild(p);
    }
});
