const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = {
    email: (email) => {
        return emailRegex.test(email);
    },
    emailRegex: () => {
        return emailRegex;
    },
    password: (password) => {
        return passwordRegex.test(password);
    },
    passwordRegex: () => {
        return passwordRegex;
    }
}