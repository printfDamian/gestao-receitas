const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = {
    email: (email) => {
        return emailRegex.test(email);
    },
    emailRegex: () => {
        return {
            regexStr: emailRegex.source,
            description: "Email must contain a single @, a single . and no spaces."
        };
    },
    password: (password) => {
        return passwordRegex.test(password);
    },
    passwordRegex: () => {
        return {
            regexStr: passwordRegex.source,
            description: "Pssword requirements (at least): \n8 characters; \n1 number; \n1 downcase and uppercase character"
        };
    }
}
