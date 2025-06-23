export function validateEmail(email) {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
}
export function validatePassword(password) {
    return password.length >= 8;
}
export function validateSignUp(data) {
    const errors = {};
    if (!data.fullName.trim())
        errors.fullName = "Full name is required.";
    if (!validateEmail(data.email))
        errors.email = "Invalid email address.";
    if (!validatePassword(data.password))
        errors.password = "Password must be at least 8 characters.";
    if (data.confirmPassword !== data.password)
        errors.confirmPassword = "Passwords do not match.";
    return errors;
}
export function validateSignIn(data) {
    const errors = {};
    if (!validateEmail(data.email))
        errors.email = "Invalid email address.";
    if (!data.password.trim())
        errors.password = "Password is required.";
    return errors;
}
