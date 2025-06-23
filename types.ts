export interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}
