import {SignInForm} from "./types.js";
import {validateSignIn} from "./validators.js";
import {mockSignIn} from "./mockBackend.js";

const signinForm = document.getElementById("signin-form") as HTMLFormElement;
const signinErrorsDiv = document.getElementById(
  "signin-errors"
) as HTMLDivElement;
const signupSection2 = document.getElementById("signup-section") as HTMLElement;
const signinSection2 = document.getElementById("signin-section") as HTMLElement;
const toSignupBtn = document.getElementById(
  "to-signup-btn"
) as HTMLButtonElement;

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
  const data: SignInForm = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const errors = validateSignIn(data);
  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((msg: string) => {
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
  } catch (err) {
    const p = document.createElement("p");
    p.textContent = err as string;
    p.className = "error";
    signinErrorsDiv.appendChild(p);
  }
});
