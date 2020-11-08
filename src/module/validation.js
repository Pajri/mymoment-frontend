export function validatePassword(password) {
    let isValid = true;
    let message = [];

    if (password.length < 10) {
        isValid = false;
        message.push("Password length minimum 10 characters.");
    }

    return {
        isValid: isValid,
        message: message,
    };
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
    let isValid = true;
    let message = [];

    if (
        password.password !=
        passwordConfirmation.passwordConfirmation
    ) {
        isValid = false;
        message.push("Password confirmation does not match.");
    }

    return {
        isValid: isValid,
        message: message,
    };
}

export function validateFullName(fullName){
    let isValid = true;
    let message = [];

    let result = fullName.search(/[^a-zA-Z0-9 '.]/);
    if (result != -1) {
        isValid = false;
        message.push("Only alphabet, number, space, and period are allowed.");
    }

    return {
        isValid: isValid,
        message: message,
    };
}

