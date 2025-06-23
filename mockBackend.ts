import {SignUpForm, SignInForm} from "./types.js";
const mockDB: SignUpForm[] = [];

export async function mockSignUp(data: SignUpForm): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockDB.some((user) => user.email === data.email);
      if (exists) {
        reject("Email already exists.");
      } else {
        mockDB.push(data);
        resolve();
      }
    }, 500);
  });
}

export async function mockSignIn(data: SignInForm): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const validUser = mockDB.find((user) => user.email === data.email);
      if (!validUser || validUser.password !== data.password) {
        reject("Invalid email or password.");
      } else {
        resolve();
      }
    }, 500);
  });
}
