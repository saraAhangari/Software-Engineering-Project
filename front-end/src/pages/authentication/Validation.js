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
