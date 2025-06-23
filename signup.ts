import {SignUpForm} from "./types";
import {validateSignUp} from "./validators.js";
import {mockSignUp} from "./mockBackend.js";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;
const signupErrorsDiv = document.getElementById(
  "signup-errors"
) as HTMLDivElement;
const signupSection = document.getElementById("signup-section") as HTMLElement;
const signinSection = document.getElementById("signin-section") as HTMLElement;
const toSigninBtn = document.getElementById(
  "to-signin-btn"
) as HTMLButtonElement;

// Hide signup by default
if (signupSection) signupSection.style.display = "none";

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
  const data: SignUpForm = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const errors = validateSignUp(data);
  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((msg: string) => {
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
  } catch (err) {
    const p = document.createElement("p");
    p.textContent = err as string;
    p.className = "error";
    signupErrorsDiv.appendChild(p);
  }
});
