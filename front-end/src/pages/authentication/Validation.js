const emailValidatorRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


export function validateUserName(username) {
    if (username === undefined || username.length === 0) {
        return 'Username must not be empty.'
    }
    return undefined;
}

export function validateEmail(email) {
    if (!emailValidatorRegex.test(email)) {
        return 'Email is invalid.';
    }
    return undefined;
}

export function validatePassword(password) {
    if (password === undefined || password.length < 8) {
        return 'Password must not be less than 8 characters.'
    }
    return undefined;
}

export function validateRePassword(password, rePassword) {
    if (password !== rePassword) {
        return 'Confirmation password doesn\'t match the password.'
    }
    return undefined;
}

